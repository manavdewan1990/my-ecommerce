// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test'); // connect to our database
var Product     = require('./app/models/product');

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
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /products
// ----------------------------------------------------
router.route('/products')
// create a product (accessed at POST http://localhost:8080/products)
	.post(function(req, res) {
		
		var product = new Product();		// create a new instance of the Bear model
		product.name= req.body.name;  // set the products name (comes from the request)

		product.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Product created!' });
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


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
