/**
 * Created by Cengkuru on 8/29/2016.
 */

// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan'); //log requests to the console so we can see what is happening
var methodOverride = require('method-override');
var port = process.env.PORT || 3000;
var configDB = require('./config/database.js');
var path = require('path');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');





// Initialize mongoose schemas
require('./models/models');
var index = require('./routes/index');
var api = require('./routes/api');
var authenticate = require('./routes/authenticate')(passport);

// Connect to MongoDB
var mongoose = require('mongoose'); //wrapper around mongo
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);


// Express
app = express();

// View engine setup


app.use(session({
    secret: '<super-squirrel-and-morocco-mole>',
    saveUninitialized: true,
    resave: true
}));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(morgan('dev'));
app.use(cookieParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname + '/public')));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//initialize passport
var initPassport = require('./passport-init')
initPassport(passport);

// Routes
app.use('/', index )
app.use('/api', api);
app.use('/auth', authenticate);



// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});




// Start server
app.listen(port);
console.log('The magic happens on port ' + port);
