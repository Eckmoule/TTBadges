var DAO = require("../DataAccess/ClubDAO.js")

module.exports.GetClub = function(clubId, callback){
	DAO.GetClub(clubId, function(club){
		callback(club);
	});
}
	