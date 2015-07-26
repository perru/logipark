#!/bin/sh

echo "Drop tables..."

#mysql -h us-cdbr-east-04.cleardb.com -ubaff8a7934acb4 -p4d7287b1 heroku_4bfb4a9e15f74ed < droptable.sql
mysql -h localhost -upma -ppwd logipark < droptable.sql

echo "Create tables..."

#mysql -h us-cdbr-east-04.cleardb.com -ubaff8a7934acb4 -p4d7287b1 heroku_4bfb4a9e15f74ed < createtable.sql
mysql -h localhost -upma -ppwd logipark < createtable.sql

echo "Données test..."

#mysql -h us-cdbr-east-04.cleardb.com -ubaff8a7934acb4 -p4d7287b1 heroku_4bfb4a9e15f74ed < donneestest.sql
mysql -h localhost -upma -ppwd logipark < donneestest.sql
