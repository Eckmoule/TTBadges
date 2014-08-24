module.exports.set = function(app){
	app.get('/', function(req, res){
		res.setHeader('Content-Type', 'text/html');
    	res.render('Index.ejs');
	});

	app.get('/Player/:PlayerId', function(req, res) {
		res.setHeader('Content-Type', 'text/html');
    	res.render('Player.ejs');
	});

	app.use(function(req, res, next){
    	res.setHeader('Content-Type', 'text/plain');
    	res.status(404).send('Page introuvable !');
	});
}