var express = require('express');
var router = express.Router();
var userService = require('../service/userService')
var commonUtil = require('../util/commonUtil')

/* GET home page. */
router.get('/', function (req, res, next) {
    var session = req.session
    var time = session.time
    session.time = new Date()
    res.render('index', {time: time});
});


router.post('/register', function (req, res, next) {
    var username = req.body.username
    var password = req.body.password
    if (commonUtil.NOTNULL(username) && commonUtil.NOTNULL(password)) {
        userService.register(username, password, function (err) {
            if (err) {
                err.status = 286
                next(err)
                return
            }
            res.end()
        })
        return
    }
    var err = new Error('params is not lawful ');
    err.status = 462
    next(err)
})


router.get('/login', function (req, res, next) {
    res.render('login', {});
})


router.post('/login', function (req, res, next) {
    var username = req.body.username
    var password = req.body.password
    var session = req.session
    if (commonUtil.NOTNULL(username) && commonUtil.NOTNULL(password)) {
        userService.loginUser(username, password, function (err, user) {
            if (user != null) {
                session.principle = user.id
                session.user = user
                res.redirect('/')
                return
            }
            res.redirect('/login?error=2')
            return
        })
    } else {
        res.redirect('/login?error=1')
    }

})


module.exports = router;

