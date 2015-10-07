// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({
	extended : true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database
var Product = require('./app/models/product');
var User = require('./app/models/user');
var Order = require('./app/models/Order');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Request Recieved.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({
		message : 'hooray! welcome to our api!'
	});
});

// on routes that end in /products
// ----------------------------------------------------
router.route('/products')
// create a product (accessed at POST http://localhost:8080/products)
.post(function(req, res) {

	var product = new Product(req.body); // create a new instance of the Product model
	
	product.save(function(err) {
		if (err)
			res.send(err);

		res.json({
			message : 'Product created!'
		});
	});

})

// get all the products (accessed at GET http://localhost:8080/api/products)
.get(function(req, res) {
	Product.find(function(err, products) {
		if (err)
			res.send(err);

		res.json(products);
	});
});

/*-------------------------------------------------------------------------------------------*/
router.route('/users')
//create a user (accessed at POST http://localhost:8080/users)
.post(function(req, res) {

	var user = new User(req.body); // create a new instance of the User model
	
	user.save(function(err) {
		if (err)
			res.send(err);

		res.json({
			message : 'User created!'
		});
	});

})

// get all the products (accessed at GET http://localhost:8080/api/users)
.get(function(req, res) {
	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
});

/*-------------------------------------------------------------------------------------------*/

router.route('/orders')
//create a Order (accessed at POST http://localhost:8080/users)
.post(function(req, res) {

	var order = new Order(); // create a new instance of the User model
	var json = req.body;
	extend(json, Order);
	if (!validate(order))
		{
		res.json({
			message : 'Error creating Order: Data Invalid!'
		});
		}
	order.save(function(err) {
		if (err)
			res.send(err);

		res.json({
			message : 'Order created!'
		});
	});

})

// get all the products (accessed at GET http://localhost:8080/api/users)
.get(function(req, res) {
	User.find(function(err, users) {
		if (err)
			res.send(err);

		res.json(users);
	});
});

/*--------------------------------------------------------------------------------------------
*/
function extend(Child, ParentClass) {
	Child.prototype= new ParentClass();
}


function validate(order)
{
	var isValidUser=true;
	
	User.find({email : order.user_email},function(err,dbOrder)
	{
		if (dbOrder)
		{
			isValidUser= true;
		}else
		{
			isValidUser= false;
		}
	});
	return isValidUser;

}

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
