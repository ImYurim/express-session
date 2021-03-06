var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var flash = require('connect-flash');
var db = require('./db');
var bodyparser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { RequestHeaderFieldsTooLarge } = require('http-errors');

var app = express();


//session
app.use(session({
  cookie:{
    secure:false
  },
  secret: 'asdfaewfwe1231rsadf',
  resave: false,
  saveUninitialized: true,
  store: new FileStore()
}))


var passport = require('./passport')(app);
//flash도 반드시 session 밑에 작성
app.use(flash());


//사용자가 보낸 post 데이터를 request.body안으로 가져옴
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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
