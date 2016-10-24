/**
 * Created by Tristan on 16/8/27.
 */
var TopClient = require('../libs/aliMes/topClient').TopClient;
var redisClient=require('../catch/redisclient')
var commonUtil=require('../util/commonUtil')

var client = new TopClient({
    'appkey': '23317414',
    'appsecret': '4cf3a1bc2c5174753a8bf28ddf095010',
    'REST_URL': 'https://eco.taobao.com/router/rest'
});


function send(phone,callback) {
    var code=commonUtil.RADOMCODE(6)
    client.execute('alibaba.aliqin.fc.sms.num.send',
        {
            'sms_type': 'normal',
            'sms_free_sign_name': '网站插画分享服务',
            'sms_param': '{\"code\":\"'+code+'\"}',
            'rec_num': phone,
            'sms_template_code': 'SMS_12961487'
        },
        function () {
            console.log('---------------send   '+code)
        })
}

exports.sendAndSave=send

