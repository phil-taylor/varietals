console.log('passport init...');

var secret = 'BF91CE656CAEA97A2B871E68698B9325';

var passport = require('passport'),
    async = require('async'),
    jwt = require('jwt-simple'),
    LocalStrategy = require('passport-local').Strategy,
    //FacebookTokenStrategy = require('passport-facebook-token').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    //BearerStrategy = require('passport-http-bearer').Strategy,
    bcrypt = require('bcrypt');


passport.serializeUser(function(token, done) {
    console.log('Passport: serializeUser');
    console.log('token - ' + JSON.stringify(token));
    done(null, token);
});

passport.deserializeUser(function(token, done) {
    console.log('Passport: deserializeUser');
    console.log('token - ' + JSON.stringify(token));

    var data = passport.decodeToken(token);

    console.log('decoded token - ' + JSON.stringify(data));

    User.findById(data.user.id, function(err,user){
        if(err) done(err);

        if (data.fb)
            FB.setAccessToken(data.fb);

        done(null,user);
    });
});

passport.createToken = function(user, fbToken) {
    var token = jwt.encode({ user: { id: user.id, name: user.name }, fb: fbToken } , secret);
    return token;
};

passport.decodeToken = function(token) {
    return jwt.decode(token, secret);
}

passport.use(new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    function(username, password, done) {
        console.log('LocalStrategy: authenticate');

        User.findByEmail(username).exec(function(err, user) {
            if (err) { return done(null, err); }
            if (!user || user.length < 1) { return done(null, false, { message: 'Incorrect User'}); }
            bcrypt.compare(password, user[0].password, function(err, res) {
                if (!res) return done(null, false, { message: 'Invalid Password'});

                var accessToken = passport.createToken(user[0], null);
                return done(null, accessToken);

            });
        });
    })
);

console.log('passport init strategies...');

var twitterCredentials = sails.config.twitter;

/*
passport.use(new BearerStrategy({},
    function(token, done) {
        console.log('BearerStrategy: authenticate');
        console.log('accessToken - ' + token);

        if (!token) return done(null, false);

        try {
            var data = passport.decodeToken(token);
            // validate

            if (!data) return done(null, false);

            console.log('token data:');
            console.log(data);

            if (data.socialToken)
                FB.setAccessToken(data.fb);

            return done(null, token);

        } catch(err) {
            console.error(err);
            return done(null, false);
        }

    }));
*/

/*
passport.use(new FacebookTokenStrategy({
        clientID: fbCredentials.appId,
        clientSecret: fbCredentials.appSecret,
        profileFields: fbCredentials.profileFields
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('FacebookTokenStrategy: authenticate');
        console.log('accessToken - ' + accessToken);
        console.log('refreshToken - ' + refreshToken);
        console.log('profile - ');
        console.log(profile);

        Account.authenticateOrCreate(profile, accessToken, done);

    }));
*/

passport.use(new TwitterStrategy({
        consumerKey: twitterCredentials.consumerKey,
        consumerSecret: twitterCredentials.consumerSecret,
        callbackURL: twitterCredentials.callbackUrl
    },

    function(token, tokenSecret, profile, done) {
        console.log('TwitterStrategy: authenticate');
        console.log('accessToken - ' + accessToken);
        console.log('refreshToken - ' + refreshToken);
        console.log('profile - ');
        console.log(profile);

        Account.authenticateOrCreate(profile, token, done);

    }));