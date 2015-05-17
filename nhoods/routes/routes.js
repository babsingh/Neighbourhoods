var express = require('express');
var router = express.Router();

module.exports = function (app) {

	app.use('/static', express.static( './static'));

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('index');
	});
}
