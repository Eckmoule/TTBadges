var DAO = require("../DataAccess/PlayerDAO.js")

module.exports.GetPlayer = function(playerId, callback){
	DAO.GetPlayer(playerId, function(player){
		callback(player);
	});
	
}