var express = require('express')
	config = require('./lib/config.js')
	router = require('./lib/Router/router.js')

console.log('Creating Express server ...');
var app = express();
console.log('Declaring public path ...');
app.use(express.static(__dirname + '/public'));

console.log('Setting up routes ...');
router.set(app);

app.listen(config.LISTENNING_PORT);
console.log('Express server is listenning on port: %d', config.LISTENNING_PORT);