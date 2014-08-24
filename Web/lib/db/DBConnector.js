var mysql = require('mysql');
	config = require('../config.js');
	debug = require('debug')('DBConnector');

Module.exports.GetConnection = function(){
	
	var connection = mysql.createConnection({
	  host     : config.CONNECTION_STRING.host,
	  user     : config.CONNECTION_STRING.user,
	  password : config.CONNECTION_STRING.password,
	  database : config.CONNECTION_STRING.database,
	});
	
	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    Debug('ERROR connecting: %s', err.stack);
	    return;
	  }
	  Debug('connected as id %d', connection.threadId);
	});

	return connection;
}

Module.exports.CloseConnection = function(connection){
	Debug("Closing connection id %d ...", connection.threadId);
	connection.end();
	Debug("Closed");
}