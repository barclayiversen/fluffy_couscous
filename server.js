//SOMETHING ABOUT THE ORDER OF DEPENDENCIES BEING LOADED EFFECTS WHEN THE MIDDLEWARE IS AVAILABLE TO THE REST OF THE APP.
//DO NOT MESS WITH THE ORDER THE DEPENDENCIES ARE LOADED, IT COULD BREAK THE WHOLE APP.
var express = require('express'),
    expressValidator = require('express-validator'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser')
require('dotenv').config();
var index = require('./routes/index');
var cors = require('cors');
var util = require('util');


var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(session({
//   secret: 'asuperdupersecret',
//   resave: false,
//   saveUninitialized: true
// }));
/** GET route to test that the server is working */
app.get('/', function(req, res, next) {
  res.status(200).json({
    message: 'it works'
  })
});

app.use('/api/v1/', index);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
if (process.env.env == 'dev') {
  app.use(function(err, req, res, next) {
    console.log('We made it to app.js', err);
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
} else {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}


// }

// production error handler
// no stacktraces leaked to user



module.exports = app;
