/**
 * Winery.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: {
            type: 'string',
            unique: true
        },
        website: 'string',
        logo: 'string',
        social: 'json', // { facebook: '', twitter: '' }
        photos: 'array', // array of json objects { caption: '', url: '' }
        rating: 'integer',
        likes: 'integer',
        dislikes: 'integer',
        description: 'text',
        types: 'array',
        varietals: 'array',
        region: 'string',
        ava: 'array',
        phone: 'string',
        email: 'string',
        address: 'json', // { street: '', city: '', stateOrProvince: '', postalCode: '', country: '' }
        visible: 'boolean',
        status: 'string',
        hours: 'string',
        location: 'json',
        owners: 'array' // array of user identifiers
    }
};