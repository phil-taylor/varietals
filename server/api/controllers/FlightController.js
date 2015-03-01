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

    flights: function flights(req,res){
        res.view('flights', {
            partials: {
                links: 'partials/links'
            }
        });
    }
}
