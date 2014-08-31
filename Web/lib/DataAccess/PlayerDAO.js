var DBConnector = require('./DBConnector.js')
	
var getPlayerSQL = "SELECT p.LastName, p.FirstName, p.LicenseNumber, p.Gender, c.Name as CategoryName, cl.Name as ClubName " +
					"FROM Player p " +
					"JOIN Category c on p.CategoryId = c.CategoryId " +
					"JOIN Club cl on p.ClubId = cl.ClubId " +
					"WHERE p.PlayerId = ?"

function Player(sqlLine) {
	this.LastName = sqlLine.LastName;
	this.FirstName = sqlLine.FirstName;
	this.LicenseNumber = sqlLine.LicenseNumber;
	this.Gender = sqlLine.Gender;
	this.Category = sqlLine.CategoryName;
	this.Club = sqlLine.ClubName;

	this.FullName = this.LastName + " " + this.FirstName;
}

module.exports.GetPlayer = function(playerId, callback){
	DBConnector.Connection.query(getPlayerSQL, [playerId], function(err, rows, fields) {
	  	if (err) { console.error("Error requesting database " +  err); }
		else if(rows.length == 1) { callback(new Player(rows[0])); }	
		callback(null);
	});
	
}