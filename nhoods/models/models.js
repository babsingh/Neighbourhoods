var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Element = new Schema({
	location: String,
	indicator: String,
	value: String
});

mongoose.model('Element', Element);