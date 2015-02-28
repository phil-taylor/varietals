var fs = require('fs');

var loadJson = function(path) {
    var data = fs.readFileSync(path);
    return JSON.parse(data);
};

module.exports = {

    appelations: function(req,res){
        var json = loadJson('./assets/lookup/appelations.json');
        res.send(200, json);
    },

    countries: function(req,res){
        var json = loadJson('./assets/lookup/countries.json');
        res.send(200, json);
    },

    regions: function(req,res){
        var json = loadJson('./assets/lookup/regions.json');
        res.send(200, json);
    },

    states: function(req,res){
        var json = loadJson('./assets/lookup/us_states.json');
        res.send(200, json);
    },

    types: function(req,res){
        var json = loadJson('./assets/lookup/wine_types.json');
        res.send(200, json);
    },

    varietals: function(req,res){
        var json = loadJson('./assets/lookup/varietals.json');
        res.send(200, json);
    }

};

