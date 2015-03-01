/**
* Itinerary.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    user: { model: 'User', required: true },
    legs: 'array', // { date: '', time: '', winery: '1' }
    friends: 'array' // ['1','2'] -- user identifiers

  }
};

