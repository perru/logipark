// NPM modules
var express = require('express'),
	http = require('http'),
	tls = require('tls'),
	path = require('path'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	dateFormat = require('dateformat'),
	now = new Date();


// Application modules
var config = require('./config');
var logger = require('./logger');
var auth = require("./auth");
var bdd = require("./model/bddconfig");
var routespages = require("./routes/pages");
var routesservices = require("./routes/services");

// Init BDD connection

bdd.init();

// Init passport configuration
passport.use(new LocalStrategy({
	usernameField: 'mail',
	passwordField: 'pass'
}, auth.authenticate));
  
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	done(null, obj);
});


// Init WEB Server

var web = express();

// Configuration
web.configure(function() {
	// General configuration :
	web.set('port', 5000);
	web.set('views', __dirname + '/views');
	web.set('view engine', 'jade');
	web.use(express.favicon());
	web.use(express.logger('dev'));
	web.use(express.bodyParser());
	if ('development' == web.get('env')) {
		web.use(express.errorHandler());
	}

	// Static routes :
	//web.use(express.methodOverride());
	//web.use(web.router);
	web.use(express.static(path.join(__dirname, 'public')));

	// Security :
	web.use(express.cookieParser());
	web.use(express.session({ secret: 'les parkings prives' }));
	web.use(passport.initialize());
	web.use(passport.session());
	
	// Middleware in order to use the session & redirection :
	web.use(function(req, res, next) {
		res.locals.user = req.user;
		res.locals.redirect = req.query.r;
		next();
	});
});

// Authentication : (with redirection)
// old : (TODO remove)
// web.post('/loginval', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));
web.post('/loginval', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) return res.redirect('/login');
		if (!user) return res.redirect('/login');
		req.login(user, function(err) {
			if (err) return res.redirect('/login');
			if (req.query.r) return res.redirect(req.query.r);
			return res.redirect('/');
		});
	})(req,res,next);
});

// Logout :
web.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

// Init routes :
routespages.init(web);

// Create Server :
http.createServer(web).listen(process.env.PORT || web.get('port'), function() {
	logger.info('Serveur web en écoute sur le port : ' + web.get('port'));
});


// Init SERVICE Server

/*
var services = express();

// Configuration
services.set('port', 7777);
services.use(express.logger('dev'));
services.use(express.bodyParser());

// Routes
if ('development' == services.get('env')) {
	services.use(express.errorHandler());
}

// Public routes :
services.get('/liste_parkings', routesservices.parkings);
services.post('/utilisateur', routesservices.utilisateur);

// Create Server :
http.createServer(services).listen(services.get('port'), function(){
	logger.info('Serveur services en écoute sur le port : ' + services.get('port'));
});

*/
