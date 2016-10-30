/**
 * Created by Tristan on 16/10/15.
 */
var redis = require('redis')
var config = require('../config')
var redisClient = redis.createClient(config.redis.port, config.redis.url, {})
redisClient.on('ready', function () {
    console.log('redis connect success')
})


redisClient.on('error', function () {
    console.error('redis connect error')
})

module.exports = redisClient