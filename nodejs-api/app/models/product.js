var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ProductSchema   = new Schema({
	name: String,
	description: String,
	category: String,
	price:String,
	images:String
});

module.exports = mongoose.model('Product', ProductSchema);