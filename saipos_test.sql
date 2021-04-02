# Host: localhost  (Version 5.5.5-10.4.14-MariaDB)
# Date: 2021-04-01 20:19:51
# Generator: MySQL-Front 6.0  (Build 2.20)


#
# Structure for table "tasks"
#

DROP TABLE IF EXISTS `tasks`;
CREATE TABLE `tasks` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text NOT NULL,
  `owner` varchar(100) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL DEFAULT '',
  `completed` int(11) DEFAULT 0,
  `done` datetime DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

#
# Data for table "tasks"
#

INSERT INTO `tasks` VALUES (1,'Fazer café','Flávio','flavioh825@gmail.com',1,'2021-04-01 20:17:58'),(2,'Abrir o VS Code','Flávio','flavioh825@gmail.com',0,NULL),(3,'Selecionar o projeto','Flávio','flavioh825@gmail.com',0,NULL),(4,'Programar','Flávio','flavioh825@gmail.com',0,NULL);
