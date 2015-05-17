var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Location = new Schema({
	name: String
});

mongoose.model('Location', Location);