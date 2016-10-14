/**
 * Created by tc949 on 2016/10/14.
 */
var express = require('express');
var router = express.Router();
var oauthService=require('../service/oauthService')

/* GET users listing. */
router.post('/token', function (req, res, next) {
    var clientId=req.body.clientId
    var username=req.body.username
    var authType=req.body.authtype
    var state=req.body.state
    if ('password'==authType){
        oauthService.authByPassword(clientId,username)
    }
    res.send('respond with a resource');
});
module.exports = router;
