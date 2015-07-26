var http = require('http');

// Outil pour récupérer du JSON comme un service google directement depuis
// une URL.
// url : URL du service à appeler
// callback(result) : appelé lorsque la requête est terminée, contient le
// résultat en JSON déjà parsé
function getJSON(url, callback)
{
        var result = {};
        result.error = false;

        http.get(url, function(res) {
                res.setEncoding('utf8');
                var body = '';

                res.on('data', function(chunk) {
                        body += chunk;
                });

                res.on('end', function() {
                        result.res = JSON.parse(body);
                        callback(result);
                });
        }).on('error', function(e) {
                console.log("HTTP error : " + e.message);
                result.error = true;
                callback(result);
        });
}

exports.getJSON = getJSON;