var crypto = require('crypto');
var mongoose = require('mongoose'),
	location = mongoose.model('Location');

exports.evaluateLocation = function(req, res) {

};

function encryptPassword(password){
	//algorithm - sha256
	return crypto.createHash('sha256').update(password).digest('base64').toString();
}
