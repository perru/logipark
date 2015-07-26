var connectdb = require('./bddconfig');

function parking(callback) {
    connectdb.query("SELECT * FROM parking;",  function(err, results) {
            if (err) {
                console.log("ERROR: " + err.message);
                throw err;
            }
            console.dir(results);
            callback(results);
        });
}

function getParking(id, callback) {
	connectdb.query("SELECT * FROM parking WHERE id="+id+";", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}

function getNbPlaces(id, callback) {
	connectdb.query("SELECT reservation.id, reservation.id_place, reservation.date_debut, reservation.date_fin, place.id, place.id_parking, place.nom_place, parking.id FROM place, reservation, parking WHERE reservation.date_fin > CURDATE() AND place.id_parking = "+id+" = parking.id AND reservation.id_place = place.id;", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}

function getNbPlacesAll(id, callback) {
	connectdb.query("SELECT place.id, place.id_parking, place.nom_place, parking.id FROM place, parking WHERE place.id_parking = "+id+" = parking.id;", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}

function getReservations(id_utilisateur, callback) {
	connectdb.query("SELECT * FROM reservation, utilisateur, place, parking WHERE utilisateur.id = reservation.id_utilisateur AND place.id = reservation.id_place AND parking.id = place.id_parking AND reservation.id_utilisateur = "+id_utilisateur+";", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}

function postReservations(param, callback) {
	connectdb.query("INSERT INTO reservation (`id`, `id_utilisateur`, `id_place`, `b_reglement`, `date_debut`, `date_fin`) VALUES ('', '"+param.id+"', '"+param.id_place+"', '0', '"+param.from+"', '"+param.to+"');", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}

function placesReservees(id, callback) {
	connectdb.query("SELECT * FROM reservation, place WHERE place.id = reservation.id_place AND place.id_parking = "+id+" AND reservation.date_debut < CURDATE() AND reservation.date_fin > CURDATE();", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}

function nouvellesReservations(id, mois, callback) {
	connectdb.query("SELECT * FROM reservation, place WHERE place.id = reservation.id_place AND place.id_parking = "+id+" AND MONTH(reservation.date_debut) = "+mois+";", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}

function finReservations(id, mois, callback) {
	connectdb.query("SELECT * FROM reservation, place WHERE place.id = reservation.id_place AND place.id_parking = "+id+" AND MONTH(reservation.date_fin) = "+mois+";", function(err, results) {
		if (err) {
			console.log("ERROR: " + err.message);
			throw err;
		}
		console.dir(results);
		callback(results);
	});
}



exports.parking = parking;
exports.getParking = getParking;
exports.getNbPlaces = getNbPlaces;
exports.getNbPlacesAll = getNbPlacesAll;
exports.getReservations = getReservations;
exports.postReservations = postReservations;
exports.placesReservees = placesReservees;
exports.nouvellesReservations = nouvellesReservations;
exports.finReservations = finReservations;

