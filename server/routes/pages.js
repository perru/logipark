//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

var modelutilisateur = require('../model/utilisateur'),
	modelparking = require('../model/parking'),
	dateFormat = require('dateformat'),
	now = new Date();

// Public routes definition
// Route : { method, route, handler }
var publicRoutes = [
	{ method:'get', route:'/', handler:index },
	{ method:'get', route:'/register', handler:register },
	{ method:'post', route:'/registerval', handler:registerval },
	{ method:'get', route:'/login', handler:login },
	{ method:'get', route:'/about', handler:about },
	{ method:'get', route:'/parking/:id', handler:parking }
];

// Private routes definition (must be logged in)
// Route : { method, route, redirection after logged in, handler }
var privateRoutes = [
	{ method:'get', route:'/private/:test', redirect:true, handler:privateTest },
	{ method:'get', route:'/book/:id', redirect:true, handler:book },
	{ method:'post', route:'/confirm/:id', redirect:true, handler:confirm },
	{ method:'get', route:'/profil', redirect:true, handler:profil },
	{ method:'get', route:'/mybooks/:id_utilisateur', redirect:true, handler:mybooks }
];

// Not found pages (404)
// Route : { method, route, handler }
var notFoundRoutes = [
	{ method:'get', route:'*', handler:notFound },
	{ method:'post', route:'*', handler:notFound }
];

function initPublicRoutes(server, routes) {
	routes.forEach(function(rt) {
		if(rt.method == 'get')
			server.get(rt.route, rt.handler);
		else
			server.post(rt.route, rt.handler);
	});
}

// Checks if the user is logged in. If not redirects to the login page.
// redirect : if TRUE, adds ?r=originalURL après /login
function ensureLoggedIn(redirect) {
	var loginRoute = '/login';

	return function(req, res, next) {
		if (!req.isAuthenticated || !req.isAuthenticated()) {
			var url = loginRoute;
			var redirectRoute = req.originalUrl || req.url;
			if(redirect)
				url = url+'?r='+encodeURIComponent(redirectRoute);
			
			return res.redirect(url);
		}
		next();
	}
}

function initPrivateRoutes(server, routes) {
	var loginRoute = '/login';
	
	routes.forEach(function(rt) {
		if(rt.method == 'get')
			server.get(rt.route, ensureLoggedIn(rt.redirect), rt.handler);
		else
			server.post(rt.route, ensureLoggedIn(rt.redirect), rt.handler);
	});
}

function initRoutes(server) {
	initPublicRoutes(server, publicRoutes);
	initPrivateRoutes(server, privateRoutes);
	initPublicRoutes(server, notFoundRoutes);
}

/* -------------
 * PUBLIC ROUTES
 * -------------
 */

function index(req, res) {
	modelparking.parking(function (results) {
			res.render('index', { title: 'Bienvenue', parkingresults: results });
	});
}

// GET register
function register(req, res) {
	res.render('register', { title: 'Inscription' });
}

// POST registerval
function registerval(req, res) {
	if (req.body.nom == '' || req.body.prenom == '' || req.body.mail == '' || req.body.password == '' || req.body.password2 == '') {
			res.send('Au moins un champs est vide.');
	}
	else {
		if (req.body.password === req.body.password2) {
			modelutilisateur.emailAvailable(req.body, function (results) {
				if (results === false) {
					res.send('Cette adresse mail est déjà utilisée.');
				}
				else
				{
					modelutilisateur.register(req.body, function (results) {	
					res.render('registerval', { title: 'Inscription Terminée', nom:req.body.nom, prenom:req.body.prenom, mail:req.body.mail});
					});
				}
			});
		}
		else {
			res.send('Confirmation mot de passe échouée.');
		}
	}
}

// GET login
function login(req, res) {
	res.render('login', { title: 'Connexion', mail:req.body.mail, password:req.body.password });
}

// GET about page
function about(req, res) {
	res.render('about', { title: 'A propos' });
}

// GET parking/:id page
function parking(req, res) {
	modelparking.getParking(req.params.id, function (results) {
		if (results.length < 1) {
			res.render('404', { title: 'Parking non-trouvé'});
		}
		else {
			modelparking.getNbPlacesAll(req.params.id, function (results2) {
				modelparking.getNbPlaces(req.params.id, function (results3) {
					res.render('parking', { title: 'Details du parking', parking: results[0], nbplaces: results2.length });	
				});
			});
		}
	});
}

/* --------------
 * PRIVATE ROUTES
 * --------------
 */

// TODO delete
function privateTest(req, res) {
	res.send('Hello ' + req.params.test);
}

// GET /book/:id
function book(req, res) {
	modelparking.getParking(req.params.id, function (results) {
		if (results.length < 1)
			res.render('404', { title: 'Parking non-trouvé'});
		else { 		
			modelparking.getNbPlacesAll(req.params.id, function (results2) {
				if (results2.length == 0)
				{
					res.render('full', { title: 'Parking complet'});
				}
				else {
					modelparking.placesReservees(req.params.id, function (results3) {
						modelparking.nouvellesReservations(req.params.id, function (results4) {
							modelparking.finReservations(req.params.id, function (results5) {
								
								planning = new Array();
								for (i = 0; i <= results3.length; i++) {
									planning[i] = results3[i].date_debut;
								}
								
								res.render('book', { title: 'Réserver un parking', parking: results[0], nbplaces: results2.length, place: results2, nbplacesreservees: results3.lenght });	
							});
						});
					});
				}
				
			});
		}
	});
}

// GET /book/confirm/:id
function confirm(req, res) {
	modelparking.getParking(req.params.id, function (results) {
		if (results.length < 1)
			res.render('404', { title: 'Parking non-trouvé'});
		else {
			modelparking.getNbPlacesAll(req.params.id, function (results2) {
				if (results2.length == 0)
					res.render('full', { title: 'Parking complet'});
				else {
					modelparking.postReservations(req.body, function (results3) {
						res.render('confirm', { title: 'Confirmation de réservation', parking: results[0], place: results2});
					});
				}
			});
		}
	});
}

// GET profil page
function profil(req, res) {
	res.render('profil', { title: 'Profil'});
};

// GET mybooks page
function mybooks(req, res) {
		modelparking.getReservations(req.params.id_utilisateur, function (results) {
			var date_debut=[];
			var date_fin=[];
			for (var i=0; i<results.length; i++)
			{
				date_debut[i]=dateFormat(results[i].date_debut, "dd/mm/yyyy");
				date_fin[i]=dateFormat(results[i].date_fin, "dd/mm/yyyy");
			}

						res.render('mybooks', { title: 'Mes réservations', reservation: results, nbreservations: results.length, date_debut: date_debut, date_fin: date_fin } );
					});
};

/*
 * ----------
 * 404 ROUTES
 * ----------
 */

// GET *
function notFound(req, res) {
	res.render('404', { title: 'Page introuvable'});
}

exports.init = initRoutes;
