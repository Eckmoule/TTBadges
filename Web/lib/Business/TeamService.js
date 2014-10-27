var DAO = require("../DataAccess/TeamDAO.js")

module.exports.GetTeam = function(TeamId, callback){
	DAO.GetTeam(TeamId, function(team){
		callback(team);
	});
}
	