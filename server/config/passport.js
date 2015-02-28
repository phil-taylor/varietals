var passport = require('passport');

module.exports = {
    express: {
        customMiddleware: function(app){
            console.log('express middleware for passport');
            app.use(passport.initialize());
            app.use(passport.session());
        }
    }
};