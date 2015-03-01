var SabreDevStudio = require('sabre-dev-studio');

var sabre_dev_studio = new SabreDevStudio({
    client_id:     'V1:39ratanmilyx7kfw:DEVCENTER:EXT',
    client_secret: 'le1JxJ4R',
    uri:           'https://api.test.sabre.com'
});

module.exports = {

   getFlights: function getFlights(origin, destination, lengthofstay, callback){
       var options = {origin: origin, destination: destination, lengthofstay: lengthofstay };
       var endpoint = '/v1/shop/flights/fares';

       sabre_dev_studio.get(endpoint, options,
        function(error, data) {
           if (error) {
               console.log(error);
           } else {
               var flights = JSON.parse(data);
               console.log(flights);
               callback(null, flights);
           }
       });
   },

   getAirportGeo: function getAirport(code){
        switch(code) {
            case 'PDX':{
                return {"code": "PDX",
                    "lat": "45.5867",
                    "lon": "-122.587",
                    "name": "Portland International Airport",
                    "city": "Portland",
                    "state": "Oregon",
                    "country": "United States"};
            }
            case 'SFO': {
                return {
                    "code": "SFO",
                    "lat": "37.6148",
                    "lon": "-122.392",
                    "name": "San Francisco International Airport",
                    "city": "San Francisco",
                    "state": "California",
                    "country": "United States"
                };
            }
        }
    }

}