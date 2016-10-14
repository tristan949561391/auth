/**
 * Created by tc949 on 2016/10/14.
 */
var mongoose = require('mongoose')

var clientSchema = mongoose.Schema(
    {
        clientId: String,
        clientName: String,
        secret: String,
        redirectUrl: String,
        scope: String,
        sign: String
    }
)
var clientModel = mongoose.model("client", clientSchema)
module.exports = clientModel