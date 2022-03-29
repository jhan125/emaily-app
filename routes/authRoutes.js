const passport = require('passport');

module.exports = app => {
    app.get( //when someone visits the route on Google
        '/auth/google', //they will be directed into the passport
        passport.authenticate('google', { //will try to find the GoogleStrategy
            scope: ['profile', 'email'] //ask Google to give access to this info
        })
    );
    // add a second route handler to handle the case when user visits the Google search callback
    app.get('/auth/google/callback', passport.authenticate('google'));

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};