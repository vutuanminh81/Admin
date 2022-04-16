var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyPaser= require('body-parser');
const session = require('express-session');
const cors = require("cors");



var app = express();
app.use(
  session({
    secret : "subscripeawdawdadwwfthfh123",
    resave : false,
    saveUninitialized: true,
    cookie:{
      secure: false,
      expires: 30*60*1000,
      httpOnly:false,
    }
  })
);
app.use(bodyPaser.urlencoded({extended : true}));
app.use(cookieParser());

app.get("/test",(req,res)=>{
  //req.session.viewCount? req.session.viewCount++: req.session.viewCount =1 ;
  req.session.viewCount++;
  res.send(req.session);
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var wordRouter = require('./routes/word');
var wordDesRouter = require('./routes/word_description');
var exampleRouter = require('./routes/example');
var adminRouter = require('./routes/admin');
var reportRouter = require('./routes/reports');
var animalsRouter = require('./routes/animals');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header('Access-Control-Allow-Credentials',true);
  res.header('Access-Control-Expose-Headers', 'Set-Cookie');
  next();
});

app.use(cors({
  origin:["http://localhost:3001"],
  methods:["PUT, GET, POST, DELETE, OPTIONS"]
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/word', wordRouter);
app.use('/worddes',wordDesRouter);
app.use('/example',exampleRouter);
app.use('/admin',adminRouter);
app.use('/reports', reportRouter);
app.use('/animals', animalsRouter);


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
