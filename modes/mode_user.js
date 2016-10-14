/**
 * Created by tc949 on 2016/10/14.
 */
var mongoose = require('mongoose')
var userSchema = mongoose.Schema(
    {
        username: String,
        password: String
    }
)
var userModel = mongoose.model("user", userSchema)
module.exports = userModel