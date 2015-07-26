var pass = require('pwd');
var bdd = require('./bddconfig');
var logger = require('../logger');

// Vérifier qu'une adresse E-Mail est disponible
// param.email : Adresse E-Mail
// -> callback(result)
// result : TRUE/FALSE
function emailAvailable(param, callback) {
	bdd.query("SELECT * FROM utilisateur WHERE email='"+param.mail+"';", function(err, results) {
		if (err) {
			logger.error(err.message);
			throw err;
		}
		console.dir(results);

		var res = results.length > 0 ? false : true;
		callback(res);
	});
}

// Inscrire un utilisateur dans la base
// param.nom : Nom
// param.prenom : Prénom
// param.mail : Adresse E-Mail
// param.password : Password (crypté)
// -> callback(result)
// result : { nothing important }
function register(param, callback) {
	// Generate password and salt :
	pass.hash(param.password, function(err, salt, hash) {
		hash = hash.toString('base64');
		bdd.query("INSERT INTO utilisateur VALUES ('', '"+param.nom+"', '"+param.prenom+"', '"+param.mail+"', '"+hash+"', '"+salt+"');",  function(err, results) {
			if (err) {
				logger.error(err.message);
				throw err;
			}
			console.dir(results);
			callback(results);
		});
	});
}

// Récupérer un utilisateur stocké dans la BDD
// email : email de l'utilisateur à rechercher
// -> callback(result)
// result : [{'password' : 'fzjiofjeiozjf', 'salt' : 'dqsdklmsqk' ..}]
function getUser(email, callback) {
	bdd.query("SELECT * FROM utilisateur WHERE email='"+email+"';", function(err, results) {
		if (err) {
			logger.error(err.message);
			throw err;
		}
		console.dir(results);
		
		callback(results);
	});
}

exports.emailAvailable = emailAvailable;
exports.register = register;
exports.getUser = getUser;
