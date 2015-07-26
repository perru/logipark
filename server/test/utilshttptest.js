var should = require("should");
var utilshttp = require("../utils/utilshttp");

describe("utilshttp", function() {
	describe("#getJSON", function() {
		var url = "http://maps.googleapis.com/maps/api/geocode/json?address=20 av albert einstein, villeurbanne&sensor=false";
		
		it("should get some results", function(done) {
			utilshttp.getJSON(url, function(result) {
				result.error.should.be.false;
				result.res.results.length.should.be.above(0);
				result.res.results[0].should.be.a("object");
				
				done();
			});
		});
	});
});
