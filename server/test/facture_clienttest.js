var should = require("should");
var facture_client = require("../model/facture_client");
var connectdb = require('../model/bddconfig');

describe("facture_client", function() {
	before(function(done) {
		connectdb.init(done);
	});
	
	after(function() {
		connectdb.end();
	});
	
	describe("#getFacture()", function() {
		var id_facture = 0;
		
		before(function(done) {
			connectdb.query("insert into facture_client values('', 1, '2013-07-04', 55, 12);", function(err, results) {
				id_facture = results.insertId;
				done();
			});
		});
		
		after(function(done) {
			connectdb.query("delete from facture_client where id = "+id_facture+";", function(err, results) {
				done();
			});
		});
		
		it("Should fail if the invoice can't be found", function(done) {
			facture_client.getFacture(-1, function(err, result) {
				should.exist(err);
				should.not.exist(result);
				done();
			});
		});
		
		it("Should return a valid invoice object", function(done) {
			facture_client.getFacture(id_facture, function(err, result) {
				should.not.exist(err);
				should.exist(result);
				result.should.be.a("object");
				done();
			});
		});
	});
	
	describe("#listeFactures()", function() {
		var id_facture = 0;
		var id_reservation = 0;
		
		before(function(done) {
			connectdb.query("insert into reservation values('', 0, 0, 0, '2013-07-04', '2013-08-04');", function(err, results) {
				id_reservation = results.insertId;
				connectdb.query("insert into facture_client values('', "+id_reservation+", '2013-07-04', 55, 12);", function(err, results) {
					id_facture = results.insertId;
					done();
				});
			});
		});
		
		after(function(done) {
			connectdb.query("delete from facture_client where id = "+id_facture+";", function(err, results) {
				connectdb.query("delete from reservation where id = "+id_reservation+";", function(err, results) {
					done();
				});
			});
		});
		
		it("Should be empty if the user can't be found", function(done) {
			facture_client.listeFactures(-1, function(err, result) {
				should.not.exist(err);
				should.exist(result);
				result.should.be.empty;
				done();
			});
		});
		
		it("Should return a list of invoice objects", function(done) {
			facture_client.listeFactures(0, function(err, result) {
				should.not.exist(err);
				should.exist(result);
				result.length.should.be.above(0);
				done();
			});
		});
	});
	
	describe("#creerFacture()", function() {
		var id_parking = 0;
		var id_place = 0;
		var id_reservation = 0;
		
		before(function(done) {
			connectdb.query("insert into parking values('', 0, '', '', '', '', '', 12, 0, 0, 0, 0, 0, '', 0, 0);", function(err, results) {
				id_parking = results.insertId;
				connectdb.query("insert into place values('', "+id_parking+", '');", function(err, results) {
					id_place = results.insertId;
					connectdb.query("insert into reservation values('', 0, "+id_place+", 0, '2013-07-04', '2013-08-04');", function(err, results) {
						id_reservation = results.insertId;
						done();
					});
				});
			});
			
		});
		
		after(function(done) {
			connectdb.query("delete from reservation where id = "+id_reservation+";", function(err, results) {
				connectdb.query("delete from place where id = "+id_place+";", function(err, results) {
					connectdb.query("delete from parking where id = "+id_parking+";", function(err, results) {
						done();
					});
				});
			});
		});
		
		it("Should fail if the reservation doesn't exist", function(done) {
			facture_client.creerFacture(id_reservation, function(err, result) {
				console.dir(result);
				done();
			});
		});
		
		it("Should return a successful result");
		
		it("Should create a valid invoice in the db");
	});
});
