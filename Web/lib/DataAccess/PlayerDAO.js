var DBConnector = require('./DBConnector.js')
	
var getPlayerSQL = "SELECT p.LastName, p.FirstName, p.LicenseNumber, p.Gender, " +
					"c.Name AS CategoryName, cl.Name AS ClubName, ofr.Code AS OfficialRank, pr.Point, r.Code AS Rank " +
					"FROM Player p " +
					"JOIN Category c ON p.CategoryId = c.CategoryId " +
					"JOIN Club cl ON p.ClubId = cl.ClubId " +
					"JOIN PlayerRank pr ON p.PlayerId = pr.PlayerId " +
					"JOIN Season s ON pr.SeasonId = s.SeasonId " +
					"JOIN Rank ofr ON pr.RankId = ofr.RankId " +
					"JOIN Rank r ON pr.Point BETWEEN r.MinimumPoint AND r.MaximumPoint " +
					"WHERE p.PlayerId = ? AND s.IsCurrent = 1"

function Player(sqlLine) {
	this.LastName = sqlLine.LastName;
	this.FirstName = sqlLine.FirstName;
	this.LicenseNumber = sqlLine.LicenseNumber;
	this.Gender = sqlLine.Gender;
	this.Category = sqlLine.CategoryName;
	this.Club = sqlLine.ClubName;
	this.OfficialRank = sqlLine.OfficialRank;
	this.Rank = sqlLine.Rank;
	this.Point = sqlLine.Point;

	this.FullName = this.LastName + " " + this.FirstName;
}

module.exports.GetPlayer = function(playerId, callback){
	DBConnector.Connection.query(getPlayerSQL, [playerId], function(err, rows, fields) {
	  	if (err) { console.error("Error requesting database " +  err); }
		else if(rows.length == 1) { callback(new Player(rows[0])); }	
		else { callback(null); } //Return null to show an page (There is probably a better way to do)
	});
}