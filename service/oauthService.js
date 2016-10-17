/**
 * Created by tc949 on 2016/10/14.
 */
var userModel = require('../modes/mode_user')
var clientModel = require('../modes/mode_client')
var redisClient = require('../catch/redisclient')
var commonUtil = require('../util/commonUtil')
var uuid = require('node-uuid')
var crypto = require('crypto')

function authByPassword(clientId, username, scope, callback) {
    clientModel.findOne({clientId: clientId}, function (err, client) {
        if (err || client == null) {
            err = new Error('get client falure')
            err.status = 534
            callback(err)
            return
        }

        if (scope != client.scope) {
            err = new Error('scope not supporse')
            err.status = 537
            callback(err)
            return
        }

        userModel.findOne({username: username}, function (err, user) {
            if (err || user == null) {
                err = new Error('no such user')
                err.status = 535
                callback(err)
                return
            }

            var md5 = crypto.createHash('md5');
            md5.update(uuid.v4() + client.clientId + user.username);
            var code = md5.digest('hex');   //sign是传入的密码的MD5

            var authcode = {
                clientId: client.clientId,
                clientSecret: client.secret,
                username: user.username,
                password: user.password,
                scope: scope
            }
            var key = 'oauth:password:' + code
            var expire = 60
            redisClient.multi().select(0).set(key, JSON.stringify(authcode), require('redis').print).expire(key, expire).exec()
            callback(null, code, expire)
        })
    })
}


module.exports.authByPassword = authByPassword


function grantByPassword(clientSecret, code, password, callback) {
    var key = 'oauth:password:' + code
    redisClient.get(key, function (err, data) {
        if (err || data == null) {
            err = new Error('code no use or timeout')
            err.status = 897
            callback(err)
            return
        }
        var authcode = JSON.parse(data)
        if (clientSecret != authcode.clientSecret || password != authcode.password) {
            err = new Error('sercret err or password error')
            err.status = 889
            callback(err)
            return
        }
        var access_token_expire = 60
        var refresh_token_expire = 3600

        var token = {
            access_token: uuid.v4(),
            refresh_token: uuid.v1(),
            expire: access_token_expire * 1000
        }

        var access_token = {
            username: authcode.username,
            clientId: authcode.clientId,
            scope: authcode.scope,
            expire: access_token_expire * 1000
        }

        var refresh_token = {
            access_token: token.access_token,
            username: authcode.username,
            clientId: authcode.clientId,
            scope: authcode.scope,
            expire: refresh_token_expire * 1000
        }

        redisClient.multi()
            .select(1)
            .set('access_token:' + token.access_token, JSON.stringify(access_token))
            .set('refresh_token:' + token.refresh_token, JSON.stringify(refresh_token))
            .expire('access_token:' + token.access_token, access_token_expire)
            .expire('refresh_token:' + token.refresh_token, refresh_token_expire)
            .exec()
        callback(null, token)
    })
}

module.exports.grantByPassword = grantByPassword

function checkLogin(req, res, next) {
    //先验证session
    var session = req.session
    if (session != null && session.principle != null && session.principle != '') {
        //验证session通过
        next()
        return
    }
    //没有session
    var token = req.headers['sign'] || req.query.access_token || req.body.access_token
    if (token == null || token == '') {
        doForAuthError(req, res, next)
        return
    }
    redisClient.select(1, function () {
        redisClient.get('access_token:' + token, function (err, data) {
            if (data != null) {
                next()
                return
            }
            doForAuthError(req, res, next)
            return
        })
    })
}

module.exports.checkLogin = checkLogin


function doForAuthError(req, res, next) {
    if (require('../util/commonUtil').NOTNULL(req.headers["content-type"]) && req.headers["content-type"].indexOf('application/json') == 0) {
        var err = new Error('auth error')
        err.status = 578
        next(err)
        return
    }
    res.redirect('/login')
}

