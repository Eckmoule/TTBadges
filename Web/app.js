var express = require('express');
	debug = require('debug')('app');
	config = require('./lib/config.js');
	router = require('./lib/router/router.js');

debug('Creating Express server ...');
var app = express();
debug('Declaring public path ...');
app.use(express.static(__dirname + '/public'));

debug('Setting up routes ...');
router.set(app);

app.listen(config.LISTENNING_PORT);
debug('Express server is listenning on port: %d', config.LISTENNING_PORT);