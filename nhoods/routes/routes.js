var request = require('request');
var express = require('express');
var async = require('async');

var router = express.Router();

module.exports = function (app) {
	var mongoSetup = require('../mongo_setup/get_data');
	var controller1 = require('../controllers/controller1');

	app.use('/static', express.static( './static'));

	/* GET home page. */
	app.get('/', function(req, res, next) {
	  res.render('index');
	});

	app.get('/city/:id', controller1.getIndicators);

	app.get('/indicator/:id', controller1.getIndicatorForAllCities);

	app.get('/city/indicator/:id', controller1.getIndicatorForCity);

	//Temporary link for user to update database
	app.get('/update/database', mongoSetup.getData);

	app.get('/get/cities', mongoSetup.cities);

	app.get('/get/indicators', mongoSetup.indicators);
}

