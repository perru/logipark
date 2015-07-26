var should = require("should");
var fs = require("fs");
var latex = require("../utils/latex");

describe("latex", function() {
	describe("#prepare()", function() {
		it("should replace '#WHAT# #WHO#' by 'Hello World'", function() {
			var s1 = "#WHAT# #WHO#";
			var s2 = "Hello World";
			latex.prepare(s1, {"#WHAT#": "Hello", "#WHO#": "World"})
				.should.equal(s2);
		});
		
		it("should replace '#WHAT# #WHAT#' by 'Hello #WHAT#'", function() {
			var s1 = "#WHAT# #WHAT#";
			var s2 = "Hello #WHAT#";
			latex.prepare(s1, {"#WHAT#": "Hello", "#WHO#": "World"})
				.should.equal(s2);
		});
	});
	
	describe("#get_template()", function() {
		it("should read the contents of the file test.tex", function(done) {
			var file = "test/fixtures/test.tex";
			var expected_data = "#WHAT# #WHO#";
			latex.get_template(file, {}, function(err, data) {
				should.not.exist(err);
				data.should.include(expected_data);
				done();
			});
		});
		
		it("should replace the original contents to get 'Hello World'", function(done) {
			var file = "test/fixtures/test.tex";
			var expected_data = "Hello World";
			latex.get_template(file, {"#WHAT#": "Hello", "#WHO#": "World"}, function(err, data) {
				should.not.exist(err);
				data.should.include(expected_data);
				done();
			});
		});
		
		it("should fail if the file doesn't exist", function(done) {
			var file = "test/fixtures/404notfound.tex";
			latex.get_template(file, {}, function(err, data) {
				should.exist(err);
				should.not.exist(data);
				done();
			});
		});
	});
	
	describe("#generate()", function() {
		var input = "\\documentclass{article}\n\\begin{document}\nHello.\n\\end{document}";
		var cwd = "test/fixtures";
		var out_name = "out";
		var out_path = cwd + "/out.pdf";
		// void generate(string input, string working_dir, string output_dir,
		// string output_name, function callback)
		
		afterEach(function() {
			fs.unlink(out_path, function(err) {});
		});
		
		it("should fail if working_dir doesn't exist", function(done) {
			latex.generate(input, "test/404notfound", cwd, out_name, function(err) {
				should.exist(err);
				done();
			});
		});
		
		it("should not fail if everything is ok", function(done) {
			latex.generate(input, cwd, cwd, out_name, function(err) {
				should.not.exist(err);
				done();
			});
		});
		
		it("should fail if output_dir doesn't exist", function(done) {
			latex.generate(input, cwd, "test/404notfound", out_name, function(err) {
				should.exist(err);
				done();
			});
		});
		
		it("should fail if the latex syntax is wrong", function(done) {
			latex.generate("\\documentclass{arti", cwd, cwd, out_name, function(err) {
				should.exist(err);
				done();
			});
		});
	});
});
