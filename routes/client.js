/**
 * Created by tc949 on 2016/10/14.
 */
var express = require('express');
var router = express.Router();
var clientService = require('../service/clientService')
var commonUtil = require('../util/commonUtil')

router.post('/register', function (req, res, next) {
    var clientName = req.body.clientName
    var sign = req.body.sign;
    clientService.register(clientName, sign, function () {
        res.end()
    })
})

module.exports = router;

