var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expresshbs = require('express-handlebars');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var passport = require('passport');
var validator = require('express-validator');
require('./config/passport');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/shopping', {
  useMongoClient: true
});

var db = mongoose.connection;

//db.on('error', console.log('Connection Error'));
db.once('open', function() {
  console.log('we are connected');
});

var index = require('./routes/index');
var users = require('./routes/user');

var app = express();

// view engine setup
app.engine('.hbs', expresshbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'asecretsession',
    resave: false,
    saveUninitialized: false,
    store: new mongoStore({mongooseConnection: db}),
    cookie: {maxAge: 180 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(validator());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
   res.locals.login = req.isAuthenticated();
   res.locals.session = req.session;
   next();
});

app.use('/', index);
app.use('/user', users);

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
