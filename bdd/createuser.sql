-- Create user pma
-- usage :
-- $ mysql -u root -p < createuser.sql

grant all privileges on *.* to 'pma'@'localhost' identified by 'pwd' with grant option;

grant all privileges on *.* to 'pma'@'%' identified by 'pwd' with grant option;
