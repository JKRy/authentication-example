const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

// For signin
const localOptions = { usernameField: 'email' };
const loginLogin = new LocalStrategy(localOptions, function(email, password, done) {
    // verify email and password
    User.findOne({ email: email }, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        
        user.comparePassword(password, function(err, isMatch) {
            if (err) { return done(err); }
            if(!isMatch) { return done(null, false); }

            return done(null, user);
        });
    });
});

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy - for routes that require authentication
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
    // See if user id in payload exists in DB if true then call done with user.
    User.findById(payload.sub, function(err, user) {
        if (err) { return done(err, false); }

        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    })
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(loginLogin);