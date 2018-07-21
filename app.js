var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var flash = require('connect-flash');

// Database
const { Client } = require('pg');
var db = new Client({
  //connectionString: process.env.DATABASE_URL,
  connectionString: "postgres://postgres:asd123@localhost:5432/boba_development",
  //ssl:true,
});
db.connect();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reviewsRouter = require('./routes/reviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.cookieParser());
app.use(flash());

// creating app session

app.use(session({secret:"abc"}));

// Make DB accessible
app.use(function(req,res,next){
  req.db = db;
  next();
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reviews',reviewsRouter);

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
