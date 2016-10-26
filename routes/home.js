var express = require('express');
var router = express.Router();
var userService = require('../service/userService')
var commonUtil = require('../util/commonUtil')
var validateService = require('../service/valdateService')
/* GET home page. */
router.get('/', function (req, res, next) {
    var session = req.session
    var time = session.time
    session.time = new Date()
    res.render('index', {module: 'index'});
});


router.post('/sendVcode', function (req, res, next) {
    var mobile = req.body.mobile
    if (commonUtil.ISMOBILE(mobile)) {
        validateService.sendAndSave(mobile, function (err, data) {
            if (err) {
                next(err)
                return
            }
            res.send('send vcode success')
            return
        })
    } else {
        var err = new Error('not mobile format')
        err.status = 462
        next(err)
    }
})

router.post('/register', function (req, res, next) {
    var username = req.body.username
    var vcode = req.body.vcode
    var password = req.body.password
    var session=req.session
    if (commonUtil.NOTNULL(username) && commonUtil.NOTNULL(password) && commonUtil.NOTNULL(vcode)) {
        validateService.checkVcode(username, vcode, function (error) {
            if (error) {
                next(error)
                return
            }
            userService.register(username, password, function (err) {
                if (err) {
                    next(err)
                    return
                }
                userService.loginUser(username,password,function (err,user) {
                    if (user != null) {
                        session.principle = user.id
                        session.user = user
                        res.send("register success")
                        return
                    }
                    next(err)
                    return
                })
                return
            })
        })
        return
    }
    var err = new Error('param error ');
    err.status = 589
    next(err)
})


router.get('/login', function (req, res, next) {
    res.render('index', {module: 'login'});
})


router.post('/login', function (req, res, next) {
    var username = req.body.username
    var password = req.body.password
    var toUrl = req.body.toUrl
    var session = req.session
    if (commonUtil.NOTNULL(username) && commonUtil.NOTNULL(password)) {
        userService.loginUser(username, password, function (err, user) {
            if (user != null) {
                session.principle = user.id
                session.user = user
                var resJson = {
                    toUrl: toUrl,
                    username: username
                }
                res.send(resJson)
                return
            }
            next(err)
            return
        })
    } else {
        var err = new Error('参数不合法')
        err.status = 589
        next(err)
        return
    }

})


module.exports = router;

