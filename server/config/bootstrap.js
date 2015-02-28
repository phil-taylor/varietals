/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var async = require('async');
var fs = require('fs');
var path = require('path');

module.exports.bootstrap = function(done) {

    Winery.count({}, function(err, count){

        if (err) {
            console.error('ERROR: unable to seed database');
            console.error(err);
            done(err);
        } else {
            console.log(count);
            if (count > 0) {

                console.log('Skipping database seed');
                done(null);
            } else {
                console.log('Seeding database...');
                loadWinerySeeds(done);
            }
        }
    });



    function loadWinerySeeds(callback) {
        var max = 20000;
        var min = 0;

        var addType = function addType(source) {

                var reds = [
                    "Barbera",
                    "Cabernet Sauvignon",
                    "Grenache",
                    "Malbec",
                    "Merlot",
                    "Nebbiolo",
                    "Petite Sirah",
                    "Pinot Noir",
                    "Rhone Blends",
                    "Sangiovese",
                    "Syrah / Shiraz",
                    "Tempranillo",
                    "Zinfandel"
                ];

                var whites = [
                    "Chardonnay",
                    "Gewürztraminer",
                    "Pinot Grigio / Pinot Gris",
                    "Riesling",
                    "Sauvignon Blanc",
                    "Verdejo",
                    "Viognier"
                ];

                var types = [];

                source.varietals.forEach(function(item){
                    if (item.match(/[Ss]parkling/)) {

                        if (types.indexOf('Sparkling') == -1)
                            types.push('Sparkling');
                    }

                    if (item.match(/[Rr]ose/) || item.match(/[Rr]osé/)){
                        if (types.indexOf('Rosé / Blush Wine') == -1)
                            types.push('Rosé / Blush Wine');
                    }

                    if (reds.filter(function(element){
                        return (element.toLowerCase() == item.toLowerCase());
                    })) {

                        if (types.indexOf('Red') == -1)
                            types.push('Red');
                    }

                    if (whites.filter(function(element){
                        return (element.toLowerCase() == item.toLowerCase());
                    })) {

                        if (types.indexOf('White') == -1)
                            types.push('White');
                    }
                });

                source.types = types;

            return source;
        };

        /*
                new JsonMap()

            .field('*', 'likes', function(source){
                return Math.floor(Math.random() * (max - min)) + min;
            })

            .field('*', 'dislikes', function(source){
                return Math.floor(Math.random() * (max - min)) + min;
            })
        */


        var folder = './assets/seeds/napa/';

        fs.readdir(folder, function(err, files){
            if (err) {
                console.log('ERROR: unable to read seeds');
                callback(err);
            } else {
                async.each(files, function(file, processed) {
                    console.log('processing seed: ' + file);

                    var seed = fs.readFileSync(folder + file);
                    var source = JSON.parse(seed);

                    var dest = addType(source);

                    // dest.rating = Math.floor((dest.likes / (dest.likes + dest.dislikes)) * 100);
                    dest.likes = 0;
                    dest.dislikes = 0;
                    dest.rating = 0;

                    Winery.create(dest, function(err,winery){

                        if (err) {
                            console.log('----> ERROR: unable to create winery');
                            processed(err);
                        } else {
                            console.log('----> SUCCESS: winery created');
                            processed();
                        }

                    });
                }, function(err){
                    if (err) {
                        callback(err);
                    } else {
                        callback();
                    }
                });
            }
        });
    }

};
