var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	user_name: String,
	email: String,
	age: Number,
	country: String,
	gender: String
	
});

module.exports = mongoose.model('User', UserSchema);