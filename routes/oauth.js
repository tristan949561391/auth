/**
 * Created by tc949 on 2016/10/14.
 */
var express = require('express');
var router = express.Router();
var oauthService = require('../service/oauthService')
var commonUtil = require('../util/commonUtil')

/* GET users listing. */
router.post('/token', function (req, res, next) {
    var clientId = req.body.clientId
    var username = req.body.username
    var authType = req.body.authtype
    var scope = req.body.scope
    var state = req.body.state
    if ('password' == authType && commonUtil.NOTNULL(clientId) && commonUtil.NOTNULL(username)) {
        oauthService.authByPassword(clientId, username, scope, function (err, code, expire) {
            if (err) {
                next(err)
                return
            }
            var oauthCode = {
                code: code,
                state: state || '',
                expire: expire * 1000
            }
            res.send(oauthCode)
            return
        })
    } else {
        var err = new Error('not support this authtype')
        err.status = 342
        next(err)
    }
});


router.post('/grant', function (req, res, next) {
    var authType = req.body.authtype
    var clientSecret = req.body.secret
    var password = req.body.password
    var code = req.body.code
    var state = req.body.state
    if ('password' == authType && commonUtil.NOTNULL(clientSecret) && commonUtil.NOTNULL(code)) {
        oauthService.grantByPassword(clientSecret, code, password, function (err, token) {
            if (err) {
                next(err)
                return
            }
            token.state = state
            res.send(token)
        })
    } else {
        var err = new Error('not support this authtype')
        err.status = 342
        next(err)
    }


})


module.exports = router;
