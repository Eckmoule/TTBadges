var DBConnector = require('./DBConnector.js')

var getClubSQL = 'SELECT c.Name, co.PhoneNumber, co.ContactName, ' +
				 'co.Email, co.Street, co.StreetNumber, co.PostalCode, co.City, co.WebSite, ' +
				 '(SELECT count(PlayerId) FROM Player where ClubId = ?) as NbPlayer, ' +
				 '(SELECT count(TeamId) FROM Team where ClubId = ?) as NbTeam ' +
				 'FROM Club c ' +
				 'JOIN Contact co ON c.ContactId = co.ContactId ' +
				 'WHERE c.ClubId = ?';

var getPlayerNumber = 'SELECT count(PlayerId) as NbPlayer FROM Player where ClubId = ?';

var getTeamNumber = 'SELECT count(TeamId) as NbTeam FROM Team where ClubId = ?';

function Club(sqlLine) {
	this.Name = sqlLine.Name;
	this.ContactName = sqlLine.ContactName;
	this.PhoneNumber = sqlLine.PhoneNumber;
	this.Email = sqlLine.Email;
	this.Street = sqlLine.Street;
	this.StreetNumber = sqlLine.StreetNumber;
	this.PostalCode = sqlLine.PostalCode;
	this.City = sqlLine.City;
	this.WebSite = sqlLine.WebSite;
	this.NbPlayer = sqlLine.NbPlayer;
	this.NbTeam = sqlLine.NbTeam;

	this.Address = this.Street + " ," + this.StreetNumber;
}

module.exports.GetClub = function(clubId, callback){
	DBConnector.Connection.query(getClubSQL, [clubId, clubId, clubId], function(err, rows, fields) {
	  	if (err) { console.error("Error requesting database " +  err); }
		if(typeof rows != 'undefined' && rows.length == 1) { 
			callback(new Club(rows[0]));
		}	
		else { callback(null); } //Return null to show an page (There is probably a better way to do)
	});
}