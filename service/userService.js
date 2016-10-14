/**
 * Created by tc949 on 2016/10/14.
 */
var userModel = require('../modes/mongoose').userModel

function register(username, password, callback) {

    userModel.findOne({username: username}, function (err, data) {
        if (data != null) {
            callback(new Error('username has already register'))
            return
        }
        var user = new userModel(
            {
                username: username,
                password: password
            }
        )
        user.save(callback)
    })
}
module.exports.register = register