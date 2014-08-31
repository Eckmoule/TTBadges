var mysql = require('mysql')
	config = require('../config.js')

var connection = mysql.createConnection({
	  host     : config.CONNECTION_STRING.host,
	  user     : config.CONNECTION_STRING.user,
	  password : config.CONNECTION_STRING.password,
	  database : config.CONNECTION_STRING.database,
	});

connection.connect(function(err) {
	  if (err) {
	    console.error('Error connecting: ' + err.stack);
	    return;
	  }
	  console.log('Connected as id %d', connection.threadId);
	});

module.exports.Connection = connection;

