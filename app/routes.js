module.exports = function(app, passport) {
    
// HOME PAGE -----------------------------------------------------------------------

    app.get('/', (req, res) => {
        res.render('index.ejs'); //renders the home page
    });

// LOGIN PAGE ----------------------------------------------------------------------

    app.get('/login', (req, res) => {
        res.render('login.ejs', {message: req.flash('loginMessage')});
    });

    //process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    }));

// SIGN UP -------------------------------------------------------------------------
    app.get('/signup', (req, res) => {
        //renders the sign up page and pass in any flash data if it exist
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    //process the sign up form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))

//PROFILE SECTION ------------------------------------------------------------------
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {message: req.flash('signupMessage')})
    })

//LOGOUT ---------------------------------------------------------------------------
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    })
//AUTHENTICATION--------------------------------------------------------------------
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

     // process the login form
     app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
};

//route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    //if a user is authenticated in this session, go next
    if(req.isAuthenticated) {
        return next();
    }

    //if not, redirect them to the home page
    res.redirect('/');
}