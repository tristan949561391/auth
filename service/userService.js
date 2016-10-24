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


function loginUser(username, password, callback) {
    userModel.findOne({username: username}, function (err,user) {
        if(err){
            callback(err)
            return
        }
        if(user==null){
            err=new Error('no such user')
            err.status=463
            callback(err)
            return
        }

        if (password!=user.password){
            err=new Error('password not match')
            err.status=464
            callback(err)
            return
        }
        callback(null,user)
    })
}
module.exports.loginUser=loginUser