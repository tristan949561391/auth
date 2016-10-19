var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var compass = require('node-compass')

var home = require('./routes/home');
var users = require('./routes/users');
var client = require('./routes/client');
var oauth = require('./routes/oauth');
var config = require('./config')
var checkLogin = require('./service/oauthService').checkLogin

var app = express();


// app的配置 －－－start

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
// redis  session
app.use(session({
    store: new RedisStore(config.session),
    secret: 'hasdoiasuierpklnmdsdfzxcdf',
    resave: false,
    rolling: false,
    saveUninitialized: false,
    cookie: config.cookie
}));

app.use('/resource', express.static(path.join(__dirname, 'resource')));//process
app.use('/process', express.static(path.join(__dirname, 'node_modules')));//process

app.use(compass({project: path.join(__dirname, '/resource'), css: '', sass: '', mode: 'compact'}))

// app的配置 －－－end


//app内置对象－－－－start
app.locals.title = 'Moondust'


//app内置对象－－－－end


app.use(function (req, res, next) {
    res.locals.session = req.session;
    res.locals.cookies = req.cookies
    next();
});

app.use('/', home);
app.use('/users', checkLogin, users);
app.use('/client', checkLogin, client);
app.use('/oauth', oauth);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('resource not found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.statusCode = err.status || 500
    if (require('./util/commonUtil').NOTNULL(req.headers["content-type"]) && req.headers["content-type"].startsWith('application/json')) {
        res.send(err.message || 'unKnow Error')
        return
    }

    res.render('error/error', {
        message: err.message,
        error: err
    });
});
module.exports = app;
