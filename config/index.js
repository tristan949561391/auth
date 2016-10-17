/**
 * Created by Tristan on 16/10/15.
 */
var fs = require('fs')
var path = require('path')
var config
if (fs.existsSync(path.join(path.resolve(), 'config/resource.dev.json'))) {
    config = require('./resource.dev.json')
} else {
    config = require('./resource.json')
}
module.exports = config

