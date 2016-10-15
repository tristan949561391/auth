/**
 * Created by tc949 on 2016/10/14.
 */
var mongoose = require('mongoose')
var config = require('../config')
mongoose.connect(config.mongo.url+":"+config.mongo.port+"/"+config.mongo.db);
var mongo = mongoose.connection
mongo.once('open', function () {
    console.log('mongo connection success')
});
mongo.on('error', function () {
    console.error('mongo connection error')
})
module.exports.userModel = require('./mode_user')
module.exports.clientModel = require('./mode_client')