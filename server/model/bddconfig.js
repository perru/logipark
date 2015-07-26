var mysql = require('mysql');
var config = require('../config');
var logger = require('../logger');

var connection;

function init(done) {
	/*connection = mysql.createConnection({
		host     : 'us-cdbr-east-04.cleardb.com',
		user     : 'baff8a7934acb4',
		password : '4d7287b1',
		database : 'heroku_4bfb4a9e15f74ed'
	});*/
	connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'pma',
		password : 'pwd',
		database : 'logipark'
	});
	
	logger.info("Connexion DB...");
	connection.connect(function(err, results) {
		if (err) {
			logger.error(err.message);
			throw err;
		}
		logger.info("Connexion DB réussie");
		
		if(done) done();
	});
	
	handleDisconnect(connection);
}

function end() {
	connection.destroy();
	logger.info("Déconnexion DB");
}

function handleDisconnect(connection) {
  connection.on('error', function(err) {
    if (!err.fatal) {
      return;
    }

    if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
      throw err;
    }

    console.log('Re-connecting lost connection...');

    init();;
  });
}

function requeteQuery(query, callback) {
	connection.query(query, callback);
}

exports.init = init;
exports.end = end;
exports.query = requeteQuery;

