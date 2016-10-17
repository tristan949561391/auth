var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var session = req.session
    var time = session.time
    session.time = new Date()
    res.render('index', {time: time});
});

module.exports=router
