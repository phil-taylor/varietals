var us_states = require('../../assets/lookup/us_states');
var appelations = require('../../assets/lookup/appelations');
var regions = require('../../assets/lookup/regions');
var varietals = require('../../assets/lookup/varietals');
var wine_types = require('../../assets/lookup/wine_types');

module.exports = {

    analyze: function analyze(user) {

        var preferences = {
            states: [],
            appelations: [],
            regions: [],
            varietals: [],
            types: []
        };

        if (user.preferences) {
          // update existing from feed

        } else {
            // build from Twitter
            Winery.find({where: {'social.twitter.id' : { '>' : 0 }}}, function(err, wineries){

                if (err) {
                    console.error('ERROR: Unable to fetch wineries for user preferences');
                    console.error(err);
                } else {

                   var ids = wineries.map(function(item){
                        return item.social.twitter.id;
                    });

                    TwitterService.getFriendIds(user.username).spread(function(friends, response){

                        var matches = friends.ids.filter(function(){
                           return ids.indexOf(this) > -1;
                        });
                        console.log(matches);
                    });

                }

            });

            // winery follows


            // winery interactions

            // wine posts


        }
    }
}
