-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: localhost    Database: tourmaline
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `createTime` datetime NOT NULL,
  `lastEditedTime` datetime NOT NULL,
  `song` int NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USER_idx` (`username`),
  KEY `FK_COMMENT_USER_idx` (`username`),
  KEY `FK_CommentSong_SongId_idx` (`song`),
  CONSTRAINT `FK_COMMENT_USER` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_CommentSong_SongId` FOREIGN KEY (`song`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorites`
--

DROP TABLE IF EXISTS `favorites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favorites` (
  `userid` varchar(45) NOT NULL,
  `songid` int NOT NULL,
  `added_date` datetime NOT NULL,
  KEY `FK_FAVORITE_USER_idx` (`userid`),
  KEY `FK_FAVORITE_SONG_idx` (`songid`),
  CONSTRAINT `FK_FAVORITE_SONG` FOREIGN KEY (`songid`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_FAVORITE_USER` FOREIGN KEY (`userid`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorites`
--

LOCK TABLES `favorites` WRITE;
/*!40000 ALTER TABLE `favorites` DISABLE KEYS */;
/*!40000 ALTER TABLE `favorites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `follow`
--

DROP TABLE IF EXISTS `follow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `follow` (
  `username` varchar(45) NOT NULL,
  `following` varchar(45) NOT NULL,
  KEY `FK_FollowUsername_UserUsername_idx` (`username`),
  KEY `FK_FollowFollowing_UserUsername_idx` (`following`),
  CONSTRAINT `FK_FollowFollowing_UserUsername` FOREIGN KEY (`following`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_FollowUsername_UserUsername` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `follow`
--

LOCK TABLES `follow` WRITE;
/*!40000 ALTER TABLE `follow` DISABLE KEYS */;
/*!40000 ALTER TABLE `follow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` varchar(500) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `FK_PLAYLIST_USER_idx` (`user`),
  CONSTRAINT `FK_PLAYLIST_USER` FOREIGN KEY (`user`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1975350825 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `playlistsongs`
--

DROP TABLE IF EXISTS `playlistsongs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlistsongs` (
  `playlistId` int NOT NULL,
  `songId` int NOT NULL,
  `added_date` datetime NOT NULL,
  PRIMARY KEY (`playlistId`,`songId`),
  KEY `FK_PlaylistSongPlaylistId_PlaylistId_idx` (`playlistId`),
  KEY `FK_PlaylistSongsSongId_SongId_idx` (`songId`,`playlistId`),
  CONSTRAINT `FK_PlaylistSongsPlaylistId_PlaylistId` FOREIGN KEY (`playlistId`) REFERENCES `playlist` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_PlaylistSongsSongId_SongId` FOREIGN KEY (`songId`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlistsongs`
--

LOCK TABLES `playlistsongs` WRITE;
/*!40000 ALTER TABLE `playlistsongs` DISABLE KEYS */;
/*!40000 ALTER TABLE `playlistsongs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recents`
--

DROP TABLE IF EXISTS `recents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recents` (
  `username` varchar(45) NOT NULL,
  `song` int NOT NULL,
  `added_date` datetime NOT NULL,
  PRIMARY KEY (`username`,`song`),
  KEY `fk_recents_song_idx` (`song`),
  CONSTRAINT `fk_recents_song` FOREIGN KEY (`song`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_recents_username` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recents`
--

LOCK TABLES `recents` WRITE;
/*!40000 ALTER TABLE `recents` DISABLE KEYS */;
INSERT INTO `recents` VALUES ('potsu',147803313,'2022-12-15 18:04:20'),('potsu',1604340282,'2022-12-15 18:04:07');
/*!40000 ALTER TABLE `recents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `song` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uploadTime` datetime NOT NULL,
  `uploader` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `duration` double DEFAULT '0',
  `listen_times` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_USER_idx` (`uploader`),
  CONSTRAINT `FK_SONG_USER` FOREIGN KEY (`uploader`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2146263886 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (3834553,'2022-12-15 20:42:19','pikaa','sky dance','',64.261,0),(11667243,'2022-12-15 18:02:38','potsu','blue in green','',104.254,0),(11907068,'2022-12-15 20:42:18','pikaa','one lonely night','',174.759,0),(140458887,'2022-12-15 17:39:57','caleb','wasd','',120.058,0),(147803313,'2022-12-15 18:02:39','potsu','sunny','',207.438,6),(172749070,'2022-12-15 17:49:35','lofty','marsha','',374.413,0),(184191044,'2022-12-15 20:42:18','pikaa','never be the same [minitape]','',185.626,0),(213100314,'2022-12-15 18:02:38','potsu','for what','',178.155,0),(233833645,'2022-12-15 20:42:19','pikaa','walking with you','',150.517,0),(296031077,'2022-12-15 20:42:17','pikaa','i like it (flip)','',130.638,0),(300457135,'2022-12-15 20:42:16','pikaa','autumn\'s ballad (on spotify)','',130.638,0),(320094148,'2022-12-15 17:49:36','lofty','masked man & lofty - rotom','',132.048,0),(336610730,'2022-12-15 20:42:16','pikaa','dont run away','',82.155,0),(384614568,'2022-12-15 20:42:20','pikaa','yaiko kaori - maybe im alone (pikaa lofi remix)','',185.103,0),(451046677,'2022-12-15 17:49:34','lofty','〘 E I S U 〙& lofty - take my hand ft. ok2222','',160.731,0),(473996799,'2022-12-15 20:42:19','pikaa','tell me how to forget about you','',142.968,0),(491482820,'2022-12-15 20:42:16','pikaa','dandelions [tape.03]','',582.138,0),(506781510,'2022-12-15 17:49:34','lofty','feel this way (ft. FKnA)','',191.033,0),(561980894,'2022-12-15 20:42:15','pikaa','alone in this world','',137.168,0),(563675606,'2022-12-15 20:42:19','pikaa','somewhere far from you (spotify)','',98.481,0),(596072022,'2022-12-15 17:39:56','caleb','504','',151.222,0),(601216586,'2022-12-15 20:42:17','pikaa','hold onto me','',154.618,0),(607694566,'2022-12-15 18:02:38','potsu','have you heard','',162.351,0),(669439202,'2022-12-15 17:39:57','caleb','889','',118.804,0),(689628595,'2022-12-15 20:42:18','pikaa','remember (ft. farewell)','',128.574,0),(707357179,'2022-12-15 18:02:38','potsu','bossa uh','',210.102,0),(752100451,'2022-12-15 18:02:39','potsu','turtleneck','',110.288,0),(760709158,'2022-12-15 17:49:34','lofty','〘 E I S U 〙& lofty - shallow','',138.031,0),(762987167,'2022-12-15 20:42:15','pikaa','a nice cafe','',67.996,0),(782854270,'2022-12-15 20:42:16','pikaa','clover [tape.01]','',576.992,0),(841524791,'2022-12-15 20:54:28','pikasonic','Break It!','',168.176,0),(841631192,'2022-12-15 20:42:19','pikaa','touch the sky','',174.785,0),(853828103,'2022-12-15 20:54:28','pikasonic','Travel','',224.653,0),(998949295,'2022-12-15 17:39:57','caleb','i endure what has to be','',71.026,0),(1014981968,'2022-12-15 20:42:20','pikaa','we used to talk more [v2] (spotify)','',173.061,0),(1064181298,'2022-12-15 17:39:57','caleb','summer','',143.595,0),(1098175740,'2022-12-15 20:42:20','pikaa','who am i','',195.709,0),(1108661628,'2022-12-15 20:54:28','pikasonic','No Limit','',179.905,0),(1147891123,'2022-12-15 20:42:16','pikaa','bamboo [tape.02]','',593.162,0),(1148157545,'2022-12-15 17:49:35','lofty','junimo','',549.198,0),(1161762152,'2022-12-15 20:42:16','pikaa','evenings','',124.708,0),(1193355903,'2022-12-15 20:42:17','pikaa','i\'ll see you again','',83.513,0),(1265956094,'2022-12-15 20:53:56','pikasonic','Rose Garden','',247.536,0),(1274881397,'2022-12-15 20:54:28','pikasonic','Good Morning And Diamond 60s','',66.768,0),(1283251828,'2022-12-15 17:39:57','caleb','523','',72.489,0),(1330108244,'2022-12-15 17:49:36','lofty','sleepless','',143.124,0),(1358643725,'2022-12-15 20:53:56','pikasonic','Myself','',271.046,0),(1403538796,'2022-12-15 20:42:17','pikaa','midnight brightness','',168.045,0),(1411102719,'2022-12-15 17:49:35','lofty','hideaway EP','',734.354,0),(1412737191,'2022-12-15 20:42:16','pikaa','end of summer [EP]','',708.858,0),(1442677467,'2022-12-15 20:54:28','pikasonic','Eternity','',268.277,0),(1449060784,'2022-12-15 20:42:19','pikaa','streetlights','',204.747,0),(1476232309,'2022-12-15 20:42:19','pikaa','tokyo','',183.849,0),(1478194091,'2022-12-15 20:53:56','pikasonic','Over-Hit!','',247.536,1),(1523119839,'2022-12-15 17:39:57','caleb','898','',117.106,0),(1526522515,'2022-12-15 20:42:17','pikaa','late dusk','',124.708,0),(1536951199,'2022-12-15 20:42:18','pikaa','now that you\'re gone','',140.826,0),(1548102148,'2022-12-15 17:39:57','caleb','899','',38.817,0),(1559862841,'2022-12-15 20:42:19','pikaa','we used to talk more [v1]','',175.438,0),(1565411660,'2022-12-15 20:42:20','pikaa','with you','',123.794,0),(1604340282,'2022-12-15 18:02:38','potsu','drive by','',146.128,1),(1662479268,'2022-12-15 20:42:17','pikaa','moving pictures from japan [EP]','',709.511,0),(1671302381,'2022-12-15 20:42:17','pikaa','if you loved me','',217.025,0),(1677986800,'2022-12-15 18:02:39','potsu','ivy league','',236.042,0),(1737816285,'2022-12-15 17:49:35','lofty','lonely christmas','',125.91,0),(1761125174,'2022-12-15 20:42:18','pikaa','pikaa - aloe vera','',132.754,0),(1814052086,'2022-12-15 20:42:19','pikaa','under my umbrella','',215.301,0),(1819225934,'2022-12-15 17:49:36','lofty','masked man & lofty - light touches','',148.897,0),(1837428877,'2022-12-15 17:49:33','lofty','dazzleflip & lofty - cozy','',126.145,0),(1850646697,'2022-12-15 20:42:18','pikaa','postlove [ep] (ft. a dead joke)','',639.973,0),(1884467112,'2022-12-15 17:49:36','lofty','mxmtoon - i feel like chet (lofty & ayeon remix)','',199.157,0),(1902745421,'2022-12-15 20:42:18','pikaa','never ever knew me','',124.839,0),(1919941270,'2022-12-15 20:42:17','pikaa','i\'ve been so lost (ft. a dead joke)','',145.423,0),(1934704084,'2022-12-15 17:49:33','lofty','dunno why (w benz & michael)','',215.771,0),(1977308095,'2022-12-15 18:02:39','potsu','pots and pans','',136.96,3),(1996406758,'2022-12-15 20:42:20','pikaa','wishing for','',123.82,0),(2062189389,'2022-12-15 20:42:17','pikaa','hero\'s return','',137.717,0),(2106101882,'2022-12-15 17:49:34','lofty','〘 E I S U 〙& Lofty - Caylen','',121.443,0),(2123840784,'2022-12-15 20:42:18','pikaa','my first girlfriend turned into the moon','',56.79,0);
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `songtags`
--

DROP TABLE IF EXISTS `songtags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `songtags` (
  `id` int NOT NULL,
  `tag` varchar(50) NOT NULL,
  PRIMARY KEY (`id`,`tag`),
  KEY `songtags_tag_fk` (`tag`),
  CONSTRAINT `songtags_id_fk` FOREIGN KEY (`id`) REFERENCES `song` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `songtags_tag_fk` FOREIGN KEY (`tag`) REFERENCES `tags` (`tag`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `songtags`
--

LOCK TABLES `songtags` WRITE;
/*!40000 ALTER TABLE `songtags` DISABLE KEYS */;
INSERT INTO `songtags` VALUES (841524791,'Future House'),(853828103,'Future House'),(1108661628,'Future House'),(1265956094,'Future House'),(1274881397,'Future House'),(1358643725,'Future House'),(1442677467,'Future House'),(1478194091,'Future House'),(3834553,'Hiphop'),(11667243,'Hiphop'),(11907068,'Hiphop'),(140458887,'Hiphop'),(147803313,'Hiphop'),(172749070,'Hiphop'),(184191044,'Hiphop'),(213100314,'Hiphop'),(233833645,'Hiphop'),(296031077,'Hiphop'),(300457135,'Hiphop'),(320094148,'Hiphop'),(336610730,'Hiphop'),(384614568,'Hiphop'),(451046677,'Hiphop'),(473996799,'Hiphop'),(491482820,'Hiphop'),(506781510,'Hiphop'),(561980894,'Hiphop'),(563675606,'Hiphop'),(596072022,'Hiphop'),(601216586,'Hiphop'),(607694566,'Hiphop'),(669439202,'Hiphop'),(689628595,'Hiphop'),(707357179,'Hiphop'),(752100451,'Hiphop'),(760709158,'Hiphop'),(762987167,'Hiphop'),(782854270,'Hiphop'),(841631192,'Hiphop'),(998949295,'Hiphop'),(1014981968,'Hiphop'),(1064181298,'Hiphop'),(1098175740,'Hiphop'),(1147891123,'Hiphop'),(1148157545,'Hiphop'),(1161762152,'Hiphop'),(1193355903,'Hiphop'),(1283251828,'Hiphop'),(1330108244,'Hiphop'),(1403538796,'Hiphop'),(1411102719,'Hiphop'),(1412737191,'Hiphop'),(1449060784,'Hiphop'),(1476232309,'Hiphop'),(1523119839,'Hiphop'),(1526522515,'Hiphop'),(1536951199,'Hiphop'),(1548102148,'Hiphop'),(1559862841,'Hiphop'),(1565411660,'Hiphop'),(1604340282,'Hiphop'),(1662479268,'Hiphop'),(1671302381,'Hiphop'),(1677986800,'Hiphop'),(1737816285,'Hiphop'),(1761125174,'Hiphop'),(1814052086,'Hiphop'),(1819225934,'Hiphop'),(1837428877,'Hiphop'),(1850646697,'Hiphop'),(1884467112,'Hiphop'),(1902745421,'Hiphop'),(1919941270,'Hiphop'),(1934704084,'Hiphop'),(1977308095,'Hiphop'),(1996406758,'Hiphop'),(2062189389,'Hiphop'),(2106101882,'Hiphop'),(2123840784,'Hiphop'),(3834553,'Lofi'),(11667243,'Lofi'),(11907068,'Lofi'),(140458887,'Lofi'),(147803313,'Lofi'),(172749070,'Lofi'),(184191044,'Lofi'),(213100314,'Lofi'),(233833645,'Lofi'),(296031077,'Lofi'),(300457135,'Lofi'),(320094148,'Lofi'),(336610730,'Lofi'),(384614568,'Lofi'),(451046677,'Lofi'),(473996799,'Lofi'),(491482820,'Lofi'),(506781510,'Lofi'),(561980894,'Lofi'),(563675606,'Lofi'),(596072022,'Lofi'),(601216586,'Lofi'),(607694566,'Lofi'),(669439202,'Lofi'),(689628595,'Lofi'),(707357179,'Lofi'),(752100451,'Lofi'),(760709158,'Lofi'),(762987167,'Lofi'),(782854270,'Lofi'),(841631192,'Lofi'),(998949295,'Lofi'),(1014981968,'Lofi'),(1064181298,'Lofi'),(1098175740,'Lofi'),(1147891123,'Lofi'),(1148157545,'Lofi'),(1161762152,'Lofi'),(1193355903,'Lofi'),(1283251828,'Lofi'),(1330108244,'Lofi'),(1403538796,'Lofi'),(1411102719,'Lofi'),(1412737191,'Lofi'),(1449060784,'Lofi'),(1476232309,'Lofi'),(1523119839,'Lofi'),(1526522515,'Lofi'),(1536951199,'Lofi'),(1548102148,'Lofi'),(1559862841,'Lofi'),(1565411660,'Lofi'),(1604340282,'Lofi'),(1662479268,'Lofi'),(1671302381,'Lofi'),(1677986800,'Lofi'),(1737816285,'Lofi'),(1761125174,'Lofi'),(1814052086,'Lofi'),(1819225934,'Lofi'),(1837428877,'Lofi'),(1850646697,'Lofi'),(1884467112,'Lofi'),(1902745421,'Lofi'),(1919941270,'Lofi'),(1934704084,'Lofi'),(1977308095,'Lofi'),(1996406758,'Lofi'),(2062189389,'Lofi'),(2106101882,'Lofi'),(2123840784,'Lofi');
/*!40000 ALTER TABLE `songtags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `tag` varchar(50) NOT NULL,
  PRIMARY KEY (`tag`),
  UNIQUE KEY `tag_UNIQUE` (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES ('\'Hiphop'),('[\"Hiphop\", \"Lofi\"]'),('[Hiphop, Lofi]'),('Dance & EDM'),('Dubstep'),('Electronic'),('Funk'),('Future House'),('Hiphop'),('Hiphop, Lofi'),('Hiphop;Lofi'),('Lofi'),('Rap'),('Synthwave');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `createTime` datetime NOT NULL,
  `birth` datetime NOT NULL,
  `password` mediumtext NOT NULL,
  `gender` tinyint NOT NULL,
  `email` varchar(120) NOT NULL,
  `isAdmin` tinyint DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('admin','Anh Quan','','2022-12-14 19:18:06','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEPfISelPeC+V9OEOGNPa3z3/hcbh1+BJc5rXvpUIZqbh4KNKM42KEn676q/G92x/6Q==',1,'abc@def.com',0),('caleb','Caleb','','2022-12-15 16:03:21','1970-01-01 00:00:00','AQAAAAEAACcQAAAAENiJwfyx/hurs7h72vwD1/cdigUi5xj0YFNwbxe+MQdzz0j0sTqisgBW+wcqMDXRlg==',1,'caleb@mail.com',0),('lofty','lofty','','2022-12-15 17:44:02','1970-01-01 00:00:00','AQAAAAEAACcQAAAAELGg3KCaFIdPBVo2KPm9cjXBdIFynDhdFyLcxByjYiic0fU5CeU4+cQtrNroMlaUtA==',1,'lofty@mail.com',0),('pikaa','pikaa','','2022-12-15 20:34:01','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEACUi0NmHKB98sUHNzO+2zUK5uUN3hG0MXRTQorPK/x363AUEq/SAT1FQpMgAfJHRA==',1,'pikaa@mail.com',0),('pikasonic','PIKASONIC','','2022-12-15 20:43:54','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEB1zrvbG4mRiTmTZZLb7CkCAzifgeYVCNaeyiEuAV/XSNBSPHBF9domLGNZmEZbM2Q==',1,'pikasonic@mail.com',0),('potsu','potsu','','2022-12-15 18:00:44','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEGsxpmL6I2FRLiSkLFjLw7i63Q1AVjOmzYEtCi1ciBNQXOoFQcTdS18/xmCfh1vg0Q==',1,'potsu@mail.com',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tourmaline'
--
/*!50003 DROP PROCEDURE IF EXISTS `EditComment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditComment`(IN commentId INT, IN newContent TEXT, IN editTime DATETIME)
BEGIN
	UPDATE comment SET
		content = newContent,
        lastEditedTime = editTime
	WHERE id = commentId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `EditUserProfile` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `EditUserProfile`(IN username VARCHAR(45), IN newName VARCHAR(45), IN newBio VARCHAR(255), IN newBirth DATETIME,
	IN newGender TINYINT, IN newEmail VARCHAR(120), IN newIsAdmin TINYINT)
BEGIN
	UPDATE user SET
		name = newName,
        bio = newBio,
        birth = newBirth,
        gender = newGender,
        email = newEmail,
        isAdmin = newIsAdmin
	WHERE user.username = username;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `FindPlaylists` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `FindPlaylists`(IN keyword VARCHAR(100))
BEGIN
	DECLARE keywordLowered VARCHAR(100);
    SET keywordLowered = lower(keyword);

	SELECT * FROM playlist
    WHERE (LOWER(user) LIKE keywordLowered) OR (LOWER(name) LIKE keywordLowered);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `FindSongs` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `FindSongs`(IN keyword VARCHAR(100))
BEGIN
	DECLARE keywordLowered VARCHAR(100);
    SET keywordLowered = lower(keyword);

	SELECT id, uploadTime, uploader, name, description FROM song
    WHERE (LOWER(name) LIKE keywordLowered)
	OR (LOWER(description) LIKE keywordLowered);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `FindUsers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `FindUsers`(IN keyword VARCHAR(100))
BEGIN
	SELECT username, name, bio, createTime, birth, gender, isAdmin FROM user
    WHERE (lower(username) LIKE lower(keyword) OR lower(name) = lower(keyword));
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListCommentsOfSong` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ListCommentsOfSong`(IN id INT)
BEGIN
	SELECT id, username, content, createTime, lastEditedTime FROM comment WHERE song = id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ListTopFavorites` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ListTopFavorites`()
BEGIN
	SELECT songid, COUNT(songid) AS favoriteCount FROM favorites
	GROUP BY songid
	ORDER by favoriteCount DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-15 21:18:45
