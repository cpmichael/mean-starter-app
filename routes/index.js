/**
 * Created by Cengkuru on 8/29/2016.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index.html');
});

module.exports = router;