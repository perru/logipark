var connectdb = require('./bddconfig');
var squel = require('squel');

function getFacture(idFacture, cb) {
	var q = squel.select()
		.from("facture_client")
		.where("id = ?", idFacture)
		.toString();
	
	connectdb.query(q, function(err, results) {
		if(err) return cb(err);
		if(results.length < 1) return cb(true);
		
		return cb(null, results[0]);
	});
}

function listeFactures(idUtilisateur, cb) {
	var q = squel.select()
		.field("f.*")
		.from("facture_client", "f")
		.from("reservation", "r")
		.where("f.id_reservation = r.id")
		.where("r.id_utilisateur = ?", idUtilisateur)
		.toString();
	
	connectdb.query(q, function(err, results) {
		if(err) return cb(err);
		
		return cb(null, results);
	});
}

function creerFacture(idReservation, cb) {
	var q = squel.select()
		.field("pa.tarifmensuel")
		.field("r.date_debut")
		.field("r.date_fin")
		.from("reservation", "r")
		.from("place", "pl")
		.from("parking", "pa")
		.where("pa.id = pl.id_parking")
		.where("pl.id = r.id_place")
		.where("r.id = ?", idReservation)
		.toString();
		
	connectdb.query(q, function(err, results) {
		if(err) return cb(err);
		
		return cb(null, results);
	});
}

function editerFacture(idReservation, cb) {
	
}

exports.getFacture = getFacture;
exports.listeFactures = listeFactures;
exports.creerFacture = creerFacture;
exports.editerFacture = editerFacture;
