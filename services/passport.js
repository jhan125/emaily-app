const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys'); //go up one directory into the server folder, then into the config folder, and then find the keys as file inside of their.

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id); //automatically generated by Mongo
});

passport.deserializeUser((id, done) => {//turn into Mongoose model instance
    User.findById(id).then(user => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
        }, 
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}).then(existingUser => {
                if (existingUser) {
                    //we already have a record with the given profile ID
                    done(null, existingUser);
                } else {
                    //we don't have a user record with this ID, make a new record
                    new User({googleId: profile.id})
                        .save()
                        .then(user => done(null. user));
                }
            });
        }
    )
); //Generic register