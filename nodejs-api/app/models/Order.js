var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var OrderSchema   = new Schema({
	product_id: String,
	user_email: String,
	
});

module.exports = mongoose.model('Order', OrderSchema);