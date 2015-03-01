/**
* Activity.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    user: { model: 'User', required: true },
    itinerary: { model: 'Itinerary', required: false },
    winery: { model: 'Winery', required: true },
    wine: { model: 'Wine', required: true },
    rating : 'float',
    comment : 'string',
    photos : 'array' // array of json objects { caption: '', url: '' }

  }
};

