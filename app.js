var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

var FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID;
var FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;
var access_token = '';
var scopes = 'data:read data:write';
const querystring = require('querystring');

app.get('/api/forge/oauth', function (req, res) {
  Axios({
      method: 'POST',
      url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
      headers: {
          'content-type': 'application/x-www-form-urlencoded',
      },
      data: querystring.stringify({
          client_id: FORGE_CLIENT_ID,
          client_secret: FORGE_CLIENT_SECRET,
          grant_type: 'client_credentials',
          scope: scopes
      })
  })
      .then(function (response) {
          // Success
          access_token = response.data.access_token;
          console.log(response);
          res.send('<p>Authentication success!</p>');
      })
      .catch(function (error) {
          // Failed
          console.log(error);
          res.send('Failed to authenticate');
      });
});