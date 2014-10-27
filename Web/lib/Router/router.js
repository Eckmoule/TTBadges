var PlayerService = require('../Business/PlayerService.js');
	ClubService = require('../Business/ClubService.js');
	TeamService = require('../Business/TeamService.js');

module.exports.set = function(app){
	app.get('/', function(req, res){
		res.setHeader('Content-Type', 'text/html');
    	res.render('Index.ejs', {Menu: 'Home'});
	});

	app.get('/Player/:PlayerId', function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		PlayerService.GetPlayer(req.params.PlayerId, 
			function(player)
			{
				if(player != null) {  res.status(200).render('Player.ejs', {Player: player, Menu: 'Player'});  } 
				else { res.status(404).render('Lost.ejs', {Menu: 'Home'}); }
			});
	});

	app.get('/Club/:ClubId', function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		ClubService.GetClub(req.params.ClubId, 
			function(club)
			{
				if(club != null) {  res.status(200).render('Club.ejs', {Club: club, Menu: 'Club'});  } 
				else { res.status(404).render('Lost.ejs', {Menu: 'Home'}); }
			});
	});

	app.get('/Team/:TeamId', function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		TeamService.GetTeam(req.params.TeamId, 
			function(team)
			{
				if(team != null) {  res.status(200).render('Team.ejs', {Team: team, Menu: 'Team'});  } 
				else { res.status(404).render('Lost.ejs', {Menu: 'Home'}); }
			});
	});

	app.use(function(req, res, next){
    	res.setHeader('Content-Type', 'text/html');
    	res.status(404).render('Lost.ejs', {Menu: 'Home'});
	});
}