/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    suggestions: function(req,res){

        console.log(req.body);

        var preferences = req.body; // { types: [], varietals: [] }
        // where: { types: preferences.types, varietals: preferences.varietals }
        Winery.find({ where: { types: preferences.types, varietals: preferences.varietals }}, function(err, wineries){
            console.log('suggestions');

            console.log(wineries);
            if (err) {
                console.error('ERROR: failed to load suggestions for user');
                console.error(err);
                res.send(500, err);
            } else {
                res.json(wineries);
            }
        })
    }

};

