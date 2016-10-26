/**
 * Created by Tristan on 16/8/27.
 */
var TopClient = require('../libs/aliMes/topClient').TopClient;
var redisClient = require('../catch/redisclient')
var commonUtil = require('../util/commonUtil')

var client = new TopClient({
    'appkey': '23317414',
    'appsecret': '4cf3a1bc2c5174753a8bf28ddf095010',
    'REST_URL': 'https://eco.taobao.com/router/rest'
});


function send(phone, callback) {
    checkResend(phone, function (error) {
        if (error) {
            callback(error)
            return
        }
        var code = commonUtil.RADOMCODE(6)
        client.execute('alibaba.aliqin.fc.sms.num.send',
            {
                'sms_type': 'normal',
                'sms_free_sign_name': '网站插画分享服务',
                'sms_param': '{\"code\":\"' + code + '\"}',
                'rec_num': phone,
                'sms_template_code': 'SMS_12961487'
            },
            function () {
                save(code, phone, callback)
            })
    })
}

function save(code, mobile, callback) {
    var vcode = {
        code: code,
        method: 'register',
        mobile: mobile,
        date: Date.now()
    }
    redisClient.multi().select(0).set('validatecode:' + mobile, JSON.stringify(vcode))
        .expire('validatecode:' + mobile, 60 * 10)
        .exec()
    callback(null)
}


function checkResend(mobile, callback) {
    redisClient.multi().select(0).get("validatecode:" + mobile, function (err, data) {
        if (err) {
            callback(err)
            return
        }
        if (data == null || Date.now() - JSON.parse(data).date >= 60000) {
            callback()
            return
        }
        err = new Error('send code too quick')
        err.status = 465
        callback(err)
    }).exec()
}

exports.sendAndSave = send


function checkVcode(mobile, vcode, callback) {
    redisClient.multi().select(0).get("validatecode:" + mobile, function (err, data) {
        if (err || data == null || JSON.parse(data).code != vcode) {
            err = new Error('vcode error')
            err.status = 466
            callback(err)
            return
        }
        callback()
    }).exec()
}


exports.checkVcode = checkVcode


