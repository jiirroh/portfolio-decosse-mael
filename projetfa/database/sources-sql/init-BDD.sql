-- script d'initialisation de la base de données pour l'application web avec les droits de l'utilisateur
DROP DATABASE IF EXISTS `projetfa`;

CREATE DATABASE IF NOT EXISTS `projetfa` CHARACTER SET utf8 COLLATE utf8_general_ci;

CREATE DATABASE IF NOT EXISTS `projetfa` CHARACTER SET utf8 COLLATE utf8_general_ci;

DROP USER IF EXISTS 'JI_Dev_Read'@'%';

CREATE USER 'JI_Dev_Read'@'%' IDENTIFIED BY 'pwdJIPourDev_R';

DROP USER IF EXISTS 'JI_Dev_Write'@'%';

CREATE USER 'JI_Dev_Write'@'%' IDENTIFIED BY 'pwdJIPourDev_W';

USE `projetfa`;