/**
 * Created by tc949 on 2016/10/14.
 */
var mongoose = require('mongoose')
mongoose.connect("mongodb://172.82.183.154:57471/moondust");
var mongo = mongoose.connection
mongo.once('open', function () {
    console.log('connection success')
});
mongo.on('error', function () {
    console.error('connection error')
})
module.exports.userModel = require('./mode_user')
module.exports.clientModel = require('./mode_client')