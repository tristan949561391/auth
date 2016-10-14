var express = require('express');
var router = express.Router();
var userService = require('../service/userService')
var commonUtil = require('../util/commonUtil')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
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

module.exports = router;

