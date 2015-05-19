var crypto = require('crypto');
var mongoose = require('mongoose'),
	Element = mongoose.model('Element');

/* Send indicators corresponding to a city [JSON] */
exports.getIndicators = function(req, res) {
	var city = req.params.id;
	Element.find({
		location: city
	}).exec(function (err, elements) {
		if (err) {
			throw err;
		} else {
			var output = [];
			for (var i in elements) {
				output[i] = {
					ind: elements[i].indicator,
					val: elements[i].value
				};
			}
			res.json(output);
		}
	});
};

/* Send specific indicator info for all cities [JSON] */
exports.getIndicatorForAllCities = function(req, res) {
	var indicator = req.params.id;
	Element.find({
		indicator: indicator
	}).exec(function (err, elements) {
		if (err) {
			throw err;
		} else {
			var output = [];
			for (var i in elements) {
				output[i] = {
					cit: elements[i].location,
					val: elements[i].value
				};
			}
			res.json(output);
		}
	});
};

/* Send specific indicator for a specific city [JSON] */
exports.getIndicatorForCity = function(req, res) {
	var inputs = req.params.id.split("++");
	var city = inputs[0];
	var indicator = inputs[1];
	Element.find({
		location: city,
		indicator: indicator
	}).exec(function (err, elements) {
		if (err) {
			throw err;
		} else {
			var output = [];
			for (var i in elements) {
				output[i] = {
					val: elements[i].value
				};
			}
			res.json(output);
		}
	});
};

function encryptPassword(password){
	//algorithm - sha256
	return crypto.createHash('sha256').update(password).digest('base64').toString();
}
