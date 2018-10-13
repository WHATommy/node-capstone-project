module.exports = function(app, passport) {
    
// HOME PAGE -----------------------------------------------------------------------

    app.get('/', (req, res) => {
        res.render('index.ejs'); //Load in index page
    })

// LOGIN PAGE ----------------------------------------------------------------------

    //show login form
    app.get('/login', (req, res) => {
        //renders the page and pass in any flash data if it exist
        res.render('login.ejs', { message: req.flash('loginMessage')});

    });

    //process the login form
    //app.post('/login', passport stuff here);

// SIGN UP -------------------------------------------------------------------------
    app.get('/signup', (req, res) => {
        //renders the sign up page and pass in any flash data if it exist
        res.render('signup.ejs', {message: req.flash('signupMessage')});
    });

    //process the sign up form
    //app.post('/signup', passport stuff here

//PROFILE SECTION ------------------------------------------------------------------
    app.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile.ejs', {
            user: req.user
        });
    });

//LOGOUT ---------------------------------------------------------------------------
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
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