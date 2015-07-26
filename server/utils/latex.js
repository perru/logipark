var fs = require('fs');
var spawn = require("child_process").spawn;

// void get_template(string file_path, Object replaces, function callback)
//		Gets a formatted templated from the 'file_path' input file and prepared
//		by replacing occurences in the 'replaces' object. Calls 'callback' on
//		exit.
// string file_path
//		input template file
// Object replaces
//		{ '%KEY1%': 'replacement1', '%KEY2%': 'replacement2', ... }
// function callback
//		Called on exit with the result in parameters : callback(err, string data)
function get_template(file_path, replaces, callback) {
	fs.readFile(file_path, 'utf8', function (err, data) {
		if (err) return callback(err);
		
		var data = prepare(data, replaces);
		
		callback(null, data);
	});
}


// string prepare(string input, Object replaces)
// 		Replaces occurences in the 'replaces' object in order to prepare a
// 		latex input stream
// string input
//		latex template
// Object replaces
//		{ '%KEY1%': 'replacement1', '%KEY2%': 'replacement2', ... }
function prepare(input, replaces) {
	var res = input;
	for(var key in replaces) {
		res = res.replace(key, replaces[key]);
	}
	
	return res;
}

// void generate(string input, string working_dir, string output_dir,
// string output_name, function callback)
//		Takes the 'input' stream and generates a pdf latex file to the
//		'output_dir'/'output_name' path. Calls 'callback' on exit.
// string input
//		Some latex input stream
// string working_dir
//		Specifies on which directory the process should be instanciated in
// string output_dir
//		The result directory
// string output_name
//		Name of the pdf file (without ".pdf")
// function callback
//		Called when the proccess exits : callback(err)
function generate(input, working_dir, output_dir, output_name, callback) {
	var progname = "pdflatex";
	var texfile_name = output_name + ".tex";
	var texfile_path = working_dir + "/" + texfile_name;
	var pdffile_name = output_name + ".pdf";
	var pdffile_path = working_dir + "/" + pdffile_name;
	var output_path = output_dir + "/" + pdffile_name;
	
	// Write a temporary tex file
	fs.writeFile(texfile_path, input, function(err) {
		if(err) return callback(err);
		
		// Spawn a pdflatex process
		var latex = spawn(progname, [
			"-interaction=nonstopmode",
			texfile_name
		], {
			cwd: working_dir,
			env: process.env
		});
		
		// Catch the exit event of this process
		latex.on("exit", function(code, signal) {
			// Remove all temp files
			fs.unlink(working_dir + "/" + output_name + ".tex", function(err) {});
			fs.unlink(working_dir + "/" + output_name + ".aux", function(err) {});
			fs.unlink(working_dir + "/" + output_name + ".log", function(err) {});
			
			// Check if the output file exists
			fs.exists(pdffile_path, function(exists) {
				if(!exists)  return callback(true);
				
				// Move the file to output_path
				fs.rename(pdffile_path, output_path, function(err) {
					if(err) return callback(err);
					
					// End process
					callback();
				});
			});
		});
	});
}

exports.prepare = prepare;
exports.get_template = get_template;
exports.generate = generate;
