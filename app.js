var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const flash = require('express-flash-notification');
const validator = require('validator');
var passport = require('passport');
var LocalStrategy = require('passport-local');

var expressLayouts = require('express-ejs-layouts');
var mongoose = require("mongoose");

var indexRouter = require('./routes/index');

var app = express();

app.post(function(req, res, next){
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

// notification
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true}));
app.use(flash(app));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

app.use('/', require('./routes/auth'));
app.all('*', (req, res, next) => {
  if (req.isUnauthenticated()) res.redirect('/login');
  else next();
}, require('./routes/auth'));
app.use('/', require('./routes/auth'));
app.use('/', indexRouter);

//------------------connect database----------------

// mongoose.connect("mongodb+srv://admin:7ShptBbFwUdu0ePm@thegioididong.dl2z4nn.mongodb.net/thegioididong?retryWrites=true&w=majority", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });

mongoose.connect("mongodb+srv://admin:TR0d2RABQN7JoLVK@dashboardcoderkul.pjtfbkl.mongodb.net/dashboardcoderkul?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

  var db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));

  db.once("open", function() {
    console.log("Connection Successful!");
  })

// global variables
global.link_base = 'http://localhost:3000';
global.path_public = __dirname + '\\public';
global.path_base = __dirname;


//---------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
