module.exports = {
    // Render Index View
    homepage: function(req, res) {
        res.view('homepage', {
            partials: {
                links: 'partials/links'
            }
        });
    }
};