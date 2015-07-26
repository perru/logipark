var modelparking = require('../model/parking');
var modelutilisateur = require('../model/utilisateur');

// Objet de réponse pour indiquer au client s'il y a succès
function success(isSuccessful) {
	var res = {};
	res.success = isSuccessful;
	
	return res;
}

// GET liste_parkings
// req : {}
// res : [ { 'P1', lat, lng' }, ... ]
exports.parkings = function(req, res){
	modelparking.parking(function (results) {
		res.send(results);
	});
};

// POST utilisateur
// req :	{ 'id' : id, ... }	-> MODIFIER
//			{ ... }				-> AJOUTER
// Champs : [id,] nom, prenom, mail
// res : { 'success' : true/false }
exports.utilisateur = function(req, res) {
	var params = req.body;
	
	if(!params.id) {
		modelutilisateur.register(req.body, function (results) {
			res.send(success(true));
		});
	} else {
		res.send(success(false));
	}
};
