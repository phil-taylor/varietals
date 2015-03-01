/**
 * WineryController
 *
 * @description :: Server-side logic for managing Wineries
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var url = require('url');
var objects = require('../../lib/objects');

module.exports = {

    rank: function(req,res){

        Winery.find({}, function(err, wineries){

            if (err) {
                console.error('ERROR: failed to load suggestions for user');
                console.error(err);
                res.send(500, err);
            } else {

                wineries.forEach(function(winery){
                    var link = winery.social.twitter;
                    if (link && typeof link != 'object') {
                        var screen_name = url.parse(link).pathname.replace(/[\/@]/, '');
                        winery.social.twitter = { screen_name: screen_name, url: link };
                    }
                });

                var screen_names = wineries.map(function(winery) {

                    if (winery.social && winery.social.twitter) {
                        return winery.social.twitter.screen_name ||null;
                    }
                    else {
                        return null;
                    }
                }).clean();

                TwitterService.getFriendsByScreenName(screen_names).then(function(users){

                    var total_audience = users.reduce(function(sum,item){
                        return sum + item.followers_count;
                    }, 0);

                    users = users.map(function(item){
                        item.rank = RankService.score(item, total_audience, []);
                        return item;
                    });


                    async.each(users, function(user, done){

                        var winery = wineries.filter(
                                function(item) {
                                    if (item && item.social && item.social.twitter) {

                                        return item.social.twitter.screen_name.toLowerCase() == user.screen_name.toLowerCase();
                                    } else {
                                        return false;
                                    }
                                });


                        if (!winery) {
                            done(null);
                        } else {

                            winery = winery.pop();

                            winery.description = winery.description || user.description;
                            winery.social.twitter.id = user.id;
                            objects.merge(winery.social.twitter, user.rank);
                            winery.rating = user.rank.rating;

                            console.log(winery);

                            winery.save(function(err,saved){
                               if (err) {
                                   done(err);
                               } else {
                                   done(null);
                               }
                            });
                        }

                    }, function(err){
                        if (err) {
                            console.error('ERROR: unable to index wineries');
                            console.error(err);
                            res.send(500);
                        } else {
                            res.send(200, 'Index completed');
                        }
                    });


                });

            }

        });

    }


};
