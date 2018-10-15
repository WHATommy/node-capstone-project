let express = require('express');
let app = express();
let port = process.env.PORT || 8080;
let mongoose = require('mongoose');
let passport = require('passport');
let flash = require('connect-flash');
let morgan = require('morgan');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let bodyParser = require('body-parser');

let configDB = require('./config/database.js');

//configurations--------------

mongoose.connect(configDB.url); //connects to database

require('./config/passport')(passport); // pass passport for configuration

//set up our express application---------------

app.use(morgan('dev')); //log every requrest to the console
app.use(cookieParser()); //read cookies (needed for auth)
app.use(bodyParser()); //get information from html forms

app.set('view engine', 'ejs') //set up ejs for templating

//required for passport-----------------

app.use(session({ secret: 'iloveleagueoflegends'})) //session secret
app.use(passport.initialize()); //start passport
app.use(passport.session()); //persistent login session
app.use(flash()); //use connect-flash for flash message stored in session

//routes-----------------

require('./app/routes.js')(app, passport); //load our routes and pass in our app and fully configure passport

//launch------------------

app.listen(port);
console.log(`The magic happens on port ${port}`);

