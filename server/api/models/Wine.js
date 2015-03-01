/**
 * Wine.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */


module.exports = {
    attributes: {
        name: 'string',
        type: 'string',
        ava: 'string',
        varietal: 'string',
        vintage: 'integer',
        description: 'string',
        photos: 'array', // array of json objects { caption: '', url: '' }
        winery: {
            model: 'winery'
        },
        owners: 'array' // array of user identifiers
    }
}
