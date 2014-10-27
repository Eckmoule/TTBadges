var DBConnector = require('./DBConnector.js')

var getTeamSQL = 'SELECT t.ClubId, c.Name AS ClubName, t.Name '+
				 'FROM Team t ' +
				 'JOIN Club c ON c.ClubId = t.ClubId ' +
				 'WHERE t.TeamId = ?';

function Team(sqlLine) {
	this.Name = sqlLine.Name;
	this.ClubId = sqlLine.ClubId;
	this.ClubName = sqlLine.ClubName;
}

module.exports.GetTeam = function(teamId, callback){
	DBConnector.Connection.query(getTeamSQL, [teamId], function(err, rows, fields) {
	  	if (err) { console.error("Error requesting database " +  err); }
		if(typeof rows != 'undefined' && rows.length == 1) { 
			callback(new Team(rows[0]));
		}	
		else { callback(null); } //Return null to show an page (There is probably a better way to do)
	});
}