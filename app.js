var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var routes = require('./routes/index');
var users = require('./routes/users');
var client = require('./routes/client');
var oauth = require('./routes/oauth');
var config = require('./config')

var app = express();


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
app.use(require('node-compass')({mode: 'expanded'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/client', client);
app.use('/oauth', oauth);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('resource not found');
    err.status = 404;
    next(err);
});

// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    if (require('./util/commonUtil').NOTNULL(req.headers["content-type"]) && req.headers["content-type"].indexOf('application/json') == 0) {
        res.statusCode = err.status || 500
        res.send(err.message || 'unKnow Error')
        return
    }
    res.render('error/error', {
        message: err.message,
        error: err
    });
});
module.exports = app;
