var pass = require('pwd');
var modelutilisateur = require('./model/utilisateur');

// Authentification
// email : email demandée
// password : mot de passe fourni
// -> done(err, user, info)
// err : erreur
// user : utilisateur retourné ou false
// info : message à passer si false. Ex : { 'message': 'non trouvé' }
function authenticate(email, password, done) {
	// Get encrypted password & salt from the user
	modelutilisateur.getUser(email, function(result) {
		// Check if the user was found
		if(result.length < 1) {
			return done(null, false, { message: 'Adresse E-Mail incorrecte.'});
		}
		
		var user = result[0];
		
		// compare hash passwords :
		pass.hash(password, user.salt, function(err, hash) {
			hash = hash.toString('base64');
			if(err) return done(err);
			
			if(user.password != hash) {
				return done(null, false, { message: 'Mot de passe incorrect.'});
			}
			
			// success :
			return done(null, user);
		});
	});
}

exports.authenticate = authenticate;
