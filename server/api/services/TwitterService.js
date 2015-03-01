/**
 * Twitter Service
 * @type {exports}
 */
var arrays = require('../../lib/arrays');
var Promise = require('bluebird');
var Twitter = require('twitter');

var client = Promise.promisifyAll(
    new Twitter({
        consumer_key: sails.config.twitter.consumer_key,
        consumer_secret: sails.config.twitter.consumer_secret,

        access_token_key: sails.config.twitter.access_token_key,
        access_token_secret: sails.config.twitter.access_token_secret
    }));

module.exports = {



    /**
     * Download a list of friend identifiers
     * @param screen_name
     * @param max
     * @returns {*|Array|Mixed|promise|String|type[]}
     */
    getFriendIds: function getFriendIds(screen_name, max) {
        var limit = max || 1500;
        console.log('twitter limit = ' + limit);
        return client.getAsync('friends/ids', { screen_name: screen_name, count: limit });
    },

    getFriendsInternal: function getFriendsInternal(friend_list, limit_per_call, byUsername){
        var _this = this;
        var useScreenName = byUsername || false;
        var chunks = friend_list.chunk(limit_per_call);
        var batches = [];

        var getData = function(data) {
            return (useScreenName) ?
            {screen_name: data} :
            {user_id: data};
        };

        for(var i = 0; i < chunks.length; i++){
            batches.push(client.getAsync('users/lookup', getData(chunks[i].join(',')))
                .spread(function(friends, response){
                    return _this.friendsToLimited(friends);
                }));
        }

        return Promise.all(batches).then(function(friends){
            return friends.flatten();
        });
    },

    /**
     * Download a list of friends given the specific friend identifiers list
     * @param friend_list Array of friend identifiers
     * @param max
     * @returns {*|Array|Mixed|promise|String|type[]}
     */
    getFriendsById: function getFriendsById(friend_list, max) {
        var limit = max || 1500;
        var limit_per_call = 100;

        return this.getFriendsInternal(friend_list, limit_per_call, false);
    },

    /**
     * Download a list of friends given the specific friend screen name list
     * @param friend_list Array of friend identifiers
     * @param max
     * @returns {*|Array|Mixed|promise|String|type[]}
     */
    getFriendsByScreenName: function getFriendsByScreenName(friend_list, max) {
        var limit = max || 1500;
        var limit_per_call = 100;

        return this.getFriendsInternal(friend_list, limit_per_call, true);
    },

    /**
     * Directly download a list of friends using only the screen name
     * @param screen_name
     * @param max
     */
    getFriendsList: function getFriendsList(screen_name, max) {
        var limit = max ||  3000;
        var limit_per_call = 200;

    },

    /**
     * Map a list of Twitter friend instances into a limited instance with fields we care about
     * @param friends
     */
    friendsToLimited: function friendsToLimited(friends) {

        return Promise.map(friends, function(item){
            return {
                id: item.id,
                name: item.name,
                screen_name: item.screen_name,
                description: item.description,
                location: item.location,
                followers_count: item.followers_count,
                friends_count: item.friends_count,
                listed_count: item.listed_count,
                url: item.url,
                profile_image_url: item.profile_image_url,
                topics: [],
                score: 0
            };
        });
    },

    getInteractions: function getInteractions(friends) {

    }
}
