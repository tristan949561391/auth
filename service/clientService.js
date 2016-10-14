/**
 * Created by tc949 on 2016/10/14.
 */
var clientModel = require('../modes/mongoose').clientModel
var uuid = require('node-uuid')
var crypto = require('crypto')
function register(clientName, clientSign, callback) {
    var md5 = crypto.createHash('md5');
    md5.update(clientSign);
    var sign = md5.digest('hex');   //sign是传入的密码的MD5

    md5 = crypto.createHash('md5');
    md5.update(uuid.v4() + clientName + clientSign);
    var clientId = md5.digest('hex');  //clientId是uuid+clentName+clientSign+传入的密码的md5

    md5 = crypto.createHash('md5');
    md5.update(clientName + clientSign);
    var clientSecret = md5.digest('hex'); //clientsercret是clientName+clientSign的md5

    var client = new clientModel({
        clientId: clientId,
        clientName: clientName,
        secret: clientSecret,
        scope: 'all',
        sign: sign,
        redirectUrl: 'http://www.moondust.cc'
    })
    client.save(callback)
}

module.exports.register = register