#!/bin/sh

echo "1- Test du service liste_parkings\n--------------------\n\n"

curl -XGET http://localhost:7777/liste_parkings

echo "1- Test du service utilisateur (POST)\n--------------------\n\n"

curl -H "Content-Type: application/json" -XPOST -d '{"nom":"Smith","prenom":"John","mail":"john.smith@something.com"}' http://localhost:7777/utilisateur
