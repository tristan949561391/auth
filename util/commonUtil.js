/**
 * Created by tc949 on 2016/10/14.
 */
var MOBILE_P = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;

function NOTNULL(data) {
    return (data == "" || data == undefined || data == null) ? false : true;
}

module.exports.NOTNULL = NOTNULL

function ISMOBILE(mobile) {
    if (NOTNULL(mobile) && MOBILE_P.test(mobile)) {
        return true
    }
    return false
}

module.exports.ISMOBILE = ISMOBILE

 function ISPASSWORD(password) {
    var passwordP = /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{8,}/
    if (passwordP.test(password))
        return true
    else
        return false
}
exports.ISPASSWORD =ISPASSWORD

function ISEMAIL(email) {
    var emailP=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    if (emailP.test(email))
        return true
    else
        return false
}
exports.ISEMAIL=ISEMAIL

function ISURL(url) {
    var urlP=/^http:///([\w-]+\.)+[\w-]+(/[\w-./?%&=]*)?$/
    if (urlP.test(url))
        return true
    else
        return false

}
exports.ISURL=ISURL

function ISIDCARD(IDCardNum) {
    var cardNumP=/^\d{15}|\d{18}$/
    if (cardNumP.test(IDCardNum))
        return true
    else
        return false
}
exports.ISIDCARD=ISIDCARD

function ISIP(ip) {
    IPStrP=/(\d+)\.(\d+)\.(\d+)\.(\d+)/g
    if (IPStrP.test(ip))
        return true
    else
        return false
}

exports.ISIP=ISIP


function RADOMCODE(leng) {
    var Num = ""
    for (var i = 0; i < leng; i++) {
        Num += Math.floor(Math.random() * 10)
    }
    return Num
}

exports.RADOMCODE=RADOMCODE
