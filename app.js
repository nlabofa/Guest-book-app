var express = require('express');
var path = require('path');
var expressValidator = require('express-validator');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var session = require('express-session');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('./config/passport')(passport); // passport for configuration


var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/guestbook';
mongoose.connect(mongoDB);
//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Global Vars definitions
app.use(function(req, res, next) {
    res.locals.errors = null;
    res.locals.success = undefined;
    res.locals.guest = undefined;
    res.locals.author = undefined;
    res.locals.book = undefined;
    res.locals.bookinstance = undefined;
    res.locals.selected_book = undefined;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(expressValidator());
app.use(cookieParser()); // read cookies (needed for auth)
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'guestbooksessiontest' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var index = require('./routes/index');
var guests = require('./routes/guests');

app.use('/', index);
app.use('/user', guests);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;