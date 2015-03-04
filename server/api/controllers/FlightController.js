module.exports = {

    fares: function fares(req,res){
        console.log(req.query);

        SabreService.getFlights(req.query.origin, req.query.destination, req.query.lengthofstay, function(err, flights){

            if (err) {
                console.error('ERROR: unable to fetch flights from Sabre');
                console.error(err);
                res.send(500, err);
            } else {
                res.send(200, flights);
            }
        });
    },

    airport: function airportCode(){

    },

    lookup: function lookup(req,res){


        SabreService.getFlights(req.query.origin, req.query.destination, req.query.lengthofstay, function(err, flights){

            if (err) {
                console.error('ERROR: unable to fetch flights from Sabre');
                console.error(err);
                res.send(500, err);
            } else {
                res.view('flights', {
                    flights: flights.FareInfo.slice(0, 9),
                    partials: {
                        links: 'partials/links'
                    }
                });
            }
        });

    }
}
