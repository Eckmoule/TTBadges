var PlayerService = require('../Business/PlayerService.js');

module.exports.set = function(app){
	app.get('/', function(req, res){
		res.setHeader('Content-Type', 'text/html');
    	res.render('Index.ejs');
	});

	app.get('/Player/:PlayerId', function(req, res) {
		res.setHeader('Content-Type', 'text/html');
		PlayerService.GetPlayer(req.params.PlayerId, 
			function(player)
			{ 
				if(player != null)
					res.render('Player.ejs', {Player: player}); 
			});
	});

	app.use(function(req, res, next){
    	res.setHeader('Content-Type', 'text/plain');
    	res.status(404).send('Page introuvable !');
	});
}