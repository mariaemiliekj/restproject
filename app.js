// app.js

require('dotenv').config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken')

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// Router
var addRouter = require('./routes/add');
var authRouter = require('./routes/auth');
var previousRouter = require('./routes/previous');
var subtractRouter = require('./routes/subtract');
var multiplyRouter = require('./routes/multiply');
var divideRouter = require('./routes/divide');

var db = require("./models");
db.sequelize.sync({ force: false })
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// Router use
app.use('/add', addRouter);
app.use('/', authRouter);
app.use('/previous', previousRouter);
app.use('/subtract', subtractRouter);
app.use('/multiply', multiplyRouter);
app.use('/divide', divideRouter);

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
