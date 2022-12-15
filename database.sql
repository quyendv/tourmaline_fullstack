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
INSERT INTO `song` VALUES (3834553,'2022-12-15 20:42:19','pikaa','sky dance','',64.261,0),(11667243,'2022-12-15 18:02:38','potsu','blue in green','',104.254,0),(11681626,'2022-12-15 21:38:12','yunomi','インドア系ならトラックメイカー（Fdby Remix)','',208.718,0),(11907068,'2022-12-15 20:42:18','pikaa','one lonely night','',174.759,0),(22449142,'2022-12-15 21:53:50','mikazukibigwave','TOKYO SAKURA NIGHT','',148.401,0),(108405198,'2022-12-15 21:29:26','yunomi','Yunomi - めんたいコズミック(Stereoman Remix)','',240.065,0),(134297299,'2022-12-15 21:43:46','home','Native','',242.442,0),(140458887,'2022-12-15 17:39:57','caleb','wasd','',120.058,0),(142102596,'2022-12-15 21:52:40','mikazukibigwave','Route 134','',202.527,0),(147803313,'2022-12-15 18:02:39','potsu','sunny','',207.438,6),(164785382,'2022-12-15 21:43:47','home','Oort Cloud','',205.897,0),(164870391,'2022-12-15 21:38:09','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー (CDR はくちゅ−む Mix)','',167.366,0),(172749070,'2022-12-15 17:49:35','lofty','marsha','',374.413,0),(184191044,'2022-12-15 20:42:18','pikaa','never be the same [minitape]','',185.626,0),(213100314,'2022-12-15 18:02:38','potsu','for what','',178.155,0),(233833645,'2022-12-15 20:42:19','pikaa','walking with you','',150.517,0),(265076001,'2022-12-15 21:49:53','windows96','ANOTHERDAY','',243.461,0),(269590156,'2022-12-15 21:38:12','yunomi','インドア系ならトラックメイカー(Yasyoshi Remix)','',231.131,0),(296031077,'2022-12-15 20:42:17','pikaa','i like it (flip)','',130.638,0),(300457135,'2022-12-15 20:42:16','pikaa','autumn\'s ballad (on spotify)','',130.638,0),(302976135,'2022-12-15 21:52:40','mikazukibigwave','Please Call Me','',167.314,0),(320094148,'2022-12-15 17:49:36','lofty','masked man & lofty - rotom','',132.048,0),(336610730,'2022-12-15 20:42:16','pikaa','dont run away','',82.155,0),(339163328,'2022-12-15 21:53:50','mikazukibigwave','El Dorado 魔法少女伝説','',192.026,0),(373310358,'2022-12-15 21:38:07','yunomi','[FreeDL]Yunomi & Nicamoq - インドア系ならトラックメイカー(Fuyuki Remix)','',322.533,0),(377265388,'2022-12-15 21:38:08','yunomi','Yunomi & nicamoq - インドア系ならトラックメーカー(Jun Kuroda remix)[FREE DL]','',207.281,0),(384614568,'2022-12-15 20:42:20','pikaa','yaiko kaori - maybe im alone (pikaa lofi remix)','',185.103,0),(422197787,'2022-12-15 21:29:27','yunomi','明けない夜、醒めない夢 (feat. nicamoq)','',231.653,0),(426287542,'2022-12-15 21:29:26','yunomi','Yunomi - 星降る夜のアデニウム (feat. nicamoq)','',271.568,0),(451046677,'2022-12-15 17:49:34','lofty','〘 E I S U 〙& lofty - take my hand ft. ok2222','',160.731,0),(473996799,'2022-12-15 20:42:19','pikaa','tell me how to forget about you','',142.968,0),(479819869,'2022-12-15 21:38:11','yunomi','インドア系ならトラックメイカー 【Alpaca Remix】','',253.988,0),(483488894,'2022-12-15 21:38:08','yunomi','Yunomi & nicamoq - インドア系ならトラックメーカー(Wedan remix)','',225.044,0),(491482820,'2022-12-15 20:42:16','pikaa','dandelions [tape.03]','',582.138,0),(506781510,'2022-12-15 17:49:34','lofty','feel this way (ft. FKnA)','',191.033,0),(511940704,'2022-12-15 21:38:08','yunomi','Yunomi & nicamoq vs. Simon Patterson & Waio - インドア系ならトラックメイカー (Mashup)','',517.433,0),(512465297,'2022-12-15 21:52:41','mikazukibigwave','魔法戦線 CODE - MKZK','',236.042,0),(525293478,'2022-12-15 21:38:09','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー DowntownGangbeat Mix (QUERUX Remix)','',280.764,0),(561980894,'2022-12-15 20:42:15','pikaa','alone in this world','',137.168,0),(563675606,'2022-12-15 20:42:19','pikaa','somewhere far from you (spotify)','',98.481,0),(596072022,'2022-12-15 17:39:56','caleb','504','',151.222,0),(601216586,'2022-12-15 20:42:17','pikaa','hold onto me','',154.618,0),(607694566,'2022-12-15 18:02:38','potsu','have you heard','',162.351,0),(622033851,'2022-12-15 21:43:46','home','Nights (I Wish I Could Be There)','',185.835,0),(640261542,'2022-12-15 21:49:54','windows96','Red Skies','',288.052,0),(666546338,'2022-12-15 21:38:09','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (Camti-K Remix)[Free DL]','',211.095,0),(669439202,'2022-12-15 17:39:57','caleb','889','',118.804,0),(689628595,'2022-12-15 20:42:18','pikaa','remember (ft. farewell)','',128.574,0),(690595609,'2022-12-15 21:52:40','mikazukibigwave','Mystica','',214.047,0),(694689477,'2022-12-15 21:38:09','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー (°FLUX GARAGE Remix)','',231.471,0),(707357179,'2022-12-15 18:02:38','potsu','bossa uh','',210.102,0),(727180818,'2022-12-15 21:52:40','mikazukibigwave','METROPOLIS.exe','',214.726,0),(748594020,'2022-12-15 21:52:40','mikazukibigwave','Never Forget You','',216.032,0),(751558245,'2022-12-15 21:38:11','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー (SOS☆\'s Remix)','',196.911,0),(752100451,'2022-12-15 18:02:39','potsu','turtleneck','',110.288,0),(760709158,'2022-12-15 17:49:34','lofty','〘 E I S U 〙& lofty - shallow','',138.031,0),(762987167,'2022-12-15 20:42:15','pikaa','a nice cafe','',67.996,0),(782854270,'2022-12-15 20:42:16','pikaa','clover [tape.01]','',576.992,0),(813708641,'2022-12-15 21:38:10','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (pnk remix)','',135.262,0),(826944516,'2022-12-15 21:38:10','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー(Ruiringo Remix)','',313.652,0),(841524791,'2022-12-15 20:54:28','pikasonic','Break It!','',168.176,0),(841631192,'2022-12-15 20:42:19','pikaa','touch the sky','',174.785,0),(848839714,'2022-12-15 21:38:10','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (Okami (人 •ᴗ•) Remix)','',195.03,0),(853828103,'2022-12-15 20:54:28','pikasonic','Travel','',224.653,0),(881428629,'2022-12-15 21:43:47','home','On The Way Out','',241.92,0),(886393358,'2022-12-15 21:38:11','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (zmblds Remix)','',174.654,0),(934224135,'2022-12-15 21:43:46','home','Decay','',251.036,0),(965162873,'2022-12-15 21:43:47','home','Tides','',237.217,0),(969432583,'2022-12-15 21:52:40','mikazukibigwave','I\'ll Never Stop','',190.511,0),(998949295,'2022-12-15 17:39:57','caleb','i endure what has to be','',71.026,0),(1005793132,'2022-12-15 21:38:08','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー (APIECEOFONION REMIX)','',200.933,0),(1014981968,'2022-12-15 20:42:20','pikaa','we used to talk more [v2] (spotify)','',173.061,0),(1064181298,'2022-12-15 17:39:57','caleb','summer','',143.595,0),(1085885481,'2022-12-15 21:38:07','yunomi','Calcanda x Yunomi & nicamoq - Mushrooms x インドア系ならトラックメイカ (mitsorubi Mashup)','',246.674,0),(1098175740,'2022-12-15 20:42:20','pikaa','who am i','',195.709,0),(1108661628,'2022-12-15 20:54:28','pikasonic','No Limit','',179.905,0),(1141490218,'2022-12-15 21:38:07','yunomi','Yunomi & nicamoq - Indoor Kei Nara Trackmaker (curryrice Remix) [NEST HQ Premiere]','',185.521,0),(1146549673,'2022-12-15 21:43:46','home','Half Moon','',260.989,0),(1147891123,'2022-12-15 20:42:16','pikaa','bamboo [tape.02]','',593.162,0),(1148157545,'2022-12-15 17:49:35','lofty','junimo','',549.198,0),(1161073151,'2022-12-15 21:43:45','home','Come Back Down','',293.093,0),(1161762152,'2022-12-15 20:42:16','pikaa','evenings','',124.708,0),(1164366002,'2022-12-15 21:53:50','mikazukibigwave','2つのハートで Sweet Heaven','',226.403,0),(1173353629,'2022-12-15 21:38:09','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー [mitt Remix]','',210.05,0),(1187732568,'2022-12-15 21:38:09','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー(kazayan.remix)','',113.475,0),(1193355903,'2022-12-15 20:42:17','pikaa','i\'ll see you again','',83.513,0),(1228533923,'2022-12-15 21:52:41','mikazukibigwave','愛 2 MUCH','',188.029,0),(1230801802,'2022-12-15 21:38:10','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー(remix by wupaarupaa)','',223.738,0),(1246957083,'2022-12-15 21:38:10','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (Peno Remix) [Free DL]','',176.326,0),(1260207188,'2022-12-15 21:29:26','yunomi','惑星ラビット (feat. TORIENA)','',204.199,0),(1265956094,'2022-12-15 20:53:56','pikasonic','Rose Garden','',247.536,0),(1274881397,'2022-12-15 20:54:28','pikasonic','Good Morning And Diamond 60s','',66.768,0),(1281181440,'2022-12-15 21:38:07','yunomi','Yunomi & Nicamoq - Indoor Kei Nara Trackmaker(Dezhay Remix)','',201.795,0),(1283251828,'2022-12-15 17:39:57','caleb','523','',72.489,0),(1330108244,'2022-12-15 17:49:36','lofty','sleepless','',143.124,0),(1343034202,'2022-12-15 21:38:10','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー[Nekomura Remix]','',164.179,0),(1355761706,'2022-12-15 21:49:53','windows96','Facts (̅_̅_̅_̅(̅_̅_̅_̅_̅_̅_̅_̅_̅̅_̅()ڪے~ ~','',190.667,0),(1358643725,'2022-12-15 20:53:56','pikasonic','Myself','',271.046,0),(1403538796,'2022-12-15 20:42:17','pikaa','midnight brightness','',168.045,0),(1411102719,'2022-12-15 17:49:35','lofty','hideaway EP','',734.354,0),(1412737191,'2022-12-15 20:42:16','pikaa','end of summer [EP]','',708.858,0),(1415733119,'2022-12-15 21:38:11','yunomi','Yunomi& nicamoq - インドア系ならトラックメイカー (ひきこもりYktr mix)','',199.993,0),(1432951886,'2022-12-15 21:38:12','yunomi','インドア系ならトラックメイカー','',197.407,0),(1434036004,'2022-12-15 21:53:50','mikazukibigwave','WAVE2020','',168.045,0),(1442677467,'2022-12-15 20:54:28','pikasonic','Eternity','',268.277,0),(1449060784,'2022-12-15 20:42:19','pikaa','streetlights','',204.747,0),(1476232309,'2022-12-15 20:42:19','pikaa','tokyo','',183.849,0),(1478194091,'2022-12-15 20:53:56','pikasonic','Over-Hit!','',247.536,1),(1489318608,'2022-12-15 21:38:08','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー (Boek Remix) BUY4FREE DL','',174.445,0),(1511638609,'2022-12-15 21:52:40','mikazukibigwave','Final Shot!!','',182.047,0),(1518099795,'2022-12-15 21:52:39','mikazukibigwave','Cyber Patrol','',174.236,0),(1523119839,'2022-12-15 17:39:57','caleb','898','',117.106,0),(1526522515,'2022-12-15 20:42:17','pikaa','late dusk','',124.708,0),(1536951199,'2022-12-15 20:42:18','pikaa','now that you\'re gone','',140.826,0),(1548102148,'2022-12-15 17:39:57','caleb','899','',38.817,0),(1559862841,'2022-12-15 20:42:19','pikaa','we used to talk more [v1]','',175.438,0),(1565411660,'2022-12-15 20:42:20','pikaa','with you','',123.794,0),(1604340282,'2022-12-15 18:02:38','potsu','drive by','',146.128,1),(1605261067,'2022-12-15 21:38:11','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカ(Angelby Remix)','',226.951,0),(1638884114,'2022-12-15 21:49:53','windows96','After','',144.613,0),(1653734168,'2022-12-15 21:38:08','yunomi','Yunomi & nicamoq - Indoor Kei Nara Trackmaker(Meiden Remix)','',217.547,0),(1662479268,'2022-12-15 20:42:17','pikaa','moving pictures from japan [EP]','',709.511,0),(1671302381,'2022-12-15 20:42:17','pikaa','if you loved me','',217.025,0),(1677986800,'2022-12-15 18:02:39','potsu','ivy league','',236.042,0),(1687135483,'2022-12-15 21:38:10','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (OKTA. Reprod.) (Free Download)','',182.439,0),(1697794838,'2022-12-15 21:38:10','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー(Se!ra Remix)','',198.791,0),(1701440912,'2022-12-15 21:38:08','yunomi','Yunomi & Nicamoq - Indoor Kei Nara Trackmaker (i5cream Remix)','',195.213,0),(1708625446,'2022-12-15 21:38:11','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカ [ELIS Remix]','',230.06,0),(1737816285,'2022-12-15 17:49:35','lofty','lonely christmas','',125.91,0),(1746703292,'2022-12-15 21:43:47','home','Odyssey','',369.554,0),(1761125174,'2022-12-15 20:42:18','pikaa','pikaa - aloe vera','',132.754,0),(1789838169,'2022-12-15 21:38:11','yunomi','インドア系ならトラックメイカー(Capchii Remix)','',198.4,0),(1814052086,'2022-12-15 20:42:19','pikaa','under my umbrella','',215.301,0),(1819225934,'2022-12-15 17:49:36','lofty','masked man & lofty - light touches','',148.897,0),(1837428877,'2022-12-15 17:49:33','lofty','dazzleflip & lofty - cozy','',126.145,0),(1846677060,'2022-12-15 21:38:07','yunomi','[110-175bpm] インドア系ならトラックメイカー (mikaru Remix) - Yunomi & nicamoq','',323.683,0),(1850646697,'2022-12-15 20:42:18','pikaa','postlove [ep] (ft. a dead joke)','',639.973,0),(1867909594,'2022-12-15 21:38:12','yunomi','? インドア系ならトラックメイカー [Mysteka Remix] ?','',160.6,0),(1884467112,'2022-12-15 17:49:36','lofty','mxmtoon - i feel like chet (lofty & ayeon remix)','',199.157,0),(1902745421,'2022-12-15 20:42:18','pikaa','never ever knew me','',124.839,0),(1919941270,'2022-12-15 20:42:17','pikaa','i\'ve been so lost (ft. a dead joke)','',145.423,0),(1934704084,'2022-12-15 17:49:33','lofty','dunno why (w benz & michael)','',215.771,0),(1954683004,'2022-12-15 21:43:46','home','New Machines','',177.423,0),(1977308095,'2022-12-15 18:02:39','potsu','pots and pans','',136.96,3),(1983937983,'2022-12-15 21:52:41','mikazukibigwave','電月街夜 Neon Light','',189.178,0),(1996406758,'2022-12-15 20:42:20','pikaa','wishing for','',123.82,0),(2001233675,'2022-12-15 21:43:46','home','Intro','',189.178,0),(2012807372,'2022-12-15 21:38:11','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (Vincent White Remix)','',268.852,0),(2017763693,'2022-12-15 21:38:09','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー(K-TEE REMIX)','',200.019,0),(2021249115,'2022-12-15 21:38:07','yunomi','【Mashup】ミリオンライブなら徳川まつり【インドア系ならトラックメイカー×徳川まつり】','',196.937,0),(2043728505,'2022-12-15 21:49:54','windows96','RUN','',301.217,0),(2057940364,'2022-12-15 21:49:53','windows96','ANEWDAY','',257.28,0),(2062189389,'2022-12-15 20:42:17','pikaa','hero\'s return','',137.717,0),(2095020054,'2022-12-15 21:38:09','yunomi','Yunomi & Nicamoq - インドア系ならトラックメイカー (Hiroshi Matsuoka Remix)','',196.858,0),(2096951292,'2022-12-15 21:38:09','yunomi','Yunomi & nicamoq - インドア系ならトラックメイカー (Keisuke Kimura Bootleg)','',425.665,0),(2106101882,'2022-12-15 17:49:34','lofty','〘 E I S U 〙& Lofty - Caylen','',121.443,0),(2120718473,'2022-12-15 21:53:50','mikazukibigwave','Like That','',187.48,0),(2123840784,'2022-12-15 20:42:18','pikaa','my first girlfriend turned into the moon','',56.79,0);
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
INSERT INTO `songtags` VALUES (134297299,'Electronic'),(164785382,'Electronic'),(622033851,'Electronic'),(881428629,'Electronic'),(934224135,'Electronic'),(965162873,'Electronic'),(1146549673,'Electronic'),(1161073151,'Electronic'),(1746703292,'Electronic'),(1954683004,'Electronic'),(2001233675,'Electronic'),(22449142,'Future Funk'),(142102596,'Future Funk'),(302976135,'Future Funk'),(339163328,'Future Funk'),(512465297,'Future Funk'),(690595609,'Future Funk'),(727180818,'Future Funk'),(748594020,'Future Funk'),(969432583,'Future Funk'),(1164366002,'Future Funk'),(1228533923,'Future Funk'),(1434036004,'Future Funk'),(1511638609,'Future Funk'),(1518099795,'Future Funk'),(1983937983,'Future Funk'),(2120718473,'Future Funk'),(11681626,'Future House'),(108405198,'Future House'),(164870391,'Future House'),(269590156,'Future House'),(373310358,'Future House'),(377265388,'Future House'),(422197787,'Future House'),(426287542,'Future House'),(479819869,'Future House'),(483488894,'Future House'),(511940704,'Future House'),(525293478,'Future House'),(666546338,'Future House'),(694689477,'Future House'),(751558245,'Future House'),(813708641,'Future House'),(826944516,'Future House'),(841524791,'Future House'),(848839714,'Future House'),(853828103,'Future House'),(886393358,'Future House'),(1005793132,'Future House'),(1085885481,'Future House'),(1108661628,'Future House'),(1141490218,'Future House'),(1173353629,'Future House'),(1187732568,'Future House'),(1230801802,'Future House'),(1246957083,'Future House'),(1260207188,'Future House'),(1265956094,'Future House'),(1274881397,'Future House'),(1281181440,'Future House'),(1343034202,'Future House'),(1358643725,'Future House'),(1415733119,'Future House'),(1432951886,'Future House'),(1442677467,'Future House'),(1478194091,'Future House'),(1489318608,'Future House'),(1605261067,'Future House'),(1653734168,'Future House'),(1687135483,'Future House'),(1697794838,'Future House'),(1701440912,'Future House'),(1708625446,'Future House'),(1789838169,'Future House'),(1846677060,'Future House'),(1867909594,'Future House'),(2012807372,'Future House'),(2017763693,'Future House'),(2021249115,'Future House'),(2095020054,'Future House'),(2096951292,'Future House'),(3834553,'Hiphop'),(11667243,'Hiphop'),(11907068,'Hiphop'),(140458887,'Hiphop'),(147803313,'Hiphop'),(172749070,'Hiphop'),(184191044,'Hiphop'),(213100314,'Hiphop'),(233833645,'Hiphop'),(296031077,'Hiphop'),(300457135,'Hiphop'),(320094148,'Hiphop'),(336610730,'Hiphop'),(384614568,'Hiphop'),(451046677,'Hiphop'),(473996799,'Hiphop'),(491482820,'Hiphop'),(506781510,'Hiphop'),(561980894,'Hiphop'),(563675606,'Hiphop'),(596072022,'Hiphop'),(601216586,'Hiphop'),(607694566,'Hiphop'),(669439202,'Hiphop'),(689628595,'Hiphop'),(707357179,'Hiphop'),(752100451,'Hiphop'),(760709158,'Hiphop'),(762987167,'Hiphop'),(782854270,'Hiphop'),(841631192,'Hiphop'),(998949295,'Hiphop'),(1014981968,'Hiphop'),(1064181298,'Hiphop'),(1098175740,'Hiphop'),(1147891123,'Hiphop'),(1148157545,'Hiphop'),(1161762152,'Hiphop'),(1193355903,'Hiphop'),(1283251828,'Hiphop'),(1330108244,'Hiphop'),(1403538796,'Hiphop'),(1411102719,'Hiphop'),(1412737191,'Hiphop'),(1449060784,'Hiphop'),(1476232309,'Hiphop'),(1523119839,'Hiphop'),(1526522515,'Hiphop'),(1536951199,'Hiphop'),(1548102148,'Hiphop'),(1559862841,'Hiphop'),(1565411660,'Hiphop'),(1604340282,'Hiphop'),(1662479268,'Hiphop'),(1671302381,'Hiphop'),(1677986800,'Hiphop'),(1737816285,'Hiphop'),(1761125174,'Hiphop'),(1814052086,'Hiphop'),(1819225934,'Hiphop'),(1837428877,'Hiphop'),(1850646697,'Hiphop'),(1884467112,'Hiphop'),(1902745421,'Hiphop'),(1919941270,'Hiphop'),(1934704084,'Hiphop'),(1977308095,'Hiphop'),(1996406758,'Hiphop'),(2062189389,'Hiphop'),(2106101882,'Hiphop'),(2123840784,'Hiphop'),(3834553,'Lofi'),(11667243,'Lofi'),(11907068,'Lofi'),(140458887,'Lofi'),(147803313,'Lofi'),(172749070,'Lofi'),(184191044,'Lofi'),(213100314,'Lofi'),(233833645,'Lofi'),(296031077,'Lofi'),(300457135,'Lofi'),(320094148,'Lofi'),(336610730,'Lofi'),(384614568,'Lofi'),(451046677,'Lofi'),(473996799,'Lofi'),(491482820,'Lofi'),(506781510,'Lofi'),(561980894,'Lofi'),(563675606,'Lofi'),(596072022,'Lofi'),(601216586,'Lofi'),(607694566,'Lofi'),(669439202,'Lofi'),(689628595,'Lofi'),(707357179,'Lofi'),(752100451,'Lofi'),(760709158,'Lofi'),(762987167,'Lofi'),(782854270,'Lofi'),(841631192,'Lofi'),(998949295,'Lofi'),(1014981968,'Lofi'),(1064181298,'Lofi'),(1098175740,'Lofi'),(1147891123,'Lofi'),(1148157545,'Lofi'),(1161762152,'Lofi'),(1193355903,'Lofi'),(1283251828,'Lofi'),(1330108244,'Lofi'),(1403538796,'Lofi'),(1411102719,'Lofi'),(1412737191,'Lofi'),(1449060784,'Lofi'),(1476232309,'Lofi'),(1523119839,'Lofi'),(1526522515,'Lofi'),(1536951199,'Lofi'),(1548102148,'Lofi'),(1559862841,'Lofi'),(1565411660,'Lofi'),(1604340282,'Lofi'),(1662479268,'Lofi'),(1671302381,'Lofi'),(1677986800,'Lofi'),(1737816285,'Lofi'),(1761125174,'Lofi'),(1814052086,'Lofi'),(1819225934,'Lofi'),(1837428877,'Lofi'),(1850646697,'Lofi'),(1884467112,'Lofi'),(1902745421,'Lofi'),(1919941270,'Lofi'),(1934704084,'Lofi'),(1977308095,'Lofi'),(1996406758,'Lofi'),(2062189389,'Lofi'),(2106101882,'Lofi'),(2123840784,'Lofi'),(11681626,'Pop'),(108405198,'Pop'),(164870391,'Pop'),(269590156,'Pop'),(373310358,'Pop'),(377265388,'Pop'),(422197787,'Pop'),(426287542,'Pop'),(479819869,'Pop'),(483488894,'Pop'),(511940704,'Pop'),(525293478,'Pop'),(666546338,'Pop'),(694689477,'Pop'),(751558245,'Pop'),(813708641,'Pop'),(826944516,'Pop'),(848839714,'Pop'),(886393358,'Pop'),(1005793132,'Pop'),(1085885481,'Pop'),(1141490218,'Pop'),(1173353629,'Pop'),(1187732568,'Pop'),(1230801802,'Pop'),(1246957083,'Pop'),(1260207188,'Pop'),(1281181440,'Pop'),(1343034202,'Pop'),(1415733119,'Pop'),(1432951886,'Pop'),(1489318608,'Pop'),(1605261067,'Pop'),(1653734168,'Pop'),(1687135483,'Pop'),(1697794838,'Pop'),(1701440912,'Pop'),(1708625446,'Pop'),(1789838169,'Pop'),(1846677060,'Pop'),(1867909594,'Pop'),(2012807372,'Pop'),(2017763693,'Pop'),(2021249115,'Pop'),(2095020054,'Pop'),(2096951292,'Pop'),(265076001,'Retrowave'),(640261542,'Retrowave'),(1355761706,'Retrowave'),(1638884114,'Retrowave'),(2043728505,'Retrowave'),(2057940364,'Retrowave');
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
INSERT INTO `tags` VALUES ('\'Hiphop'),('[\"Hiphop\", \"Lofi\"]'),('[Hiphop, Lofi]'),('Dance & EDM'),('Dubstep'),('Electronic'),('Funk'),('Future Funk'),('Future House'),('Hiphop'),('Hiphop, Lofi'),('Hiphop;Lofi'),('Lofi'),('Pop'),('Rap'),('Retrowave'),('Synthwave');
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
INSERT INTO `user` VALUES ('admin','Anh Quan','','2022-12-14 19:18:06','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEPfISelPeC+V9OEOGNPa3z3/hcbh1+BJc5rXvpUIZqbh4KNKM42KEn676q/G92x/6Q==',1,'abc@def.com',0),('caleb','Caleb','','2022-12-15 16:03:21','1970-01-01 00:00:00','AQAAAAEAACcQAAAAENiJwfyx/hurs7h72vwD1/cdigUi5xj0YFNwbxe+MQdzz0j0sTqisgBW+wcqMDXRlg==',1,'caleb@mail.com',0),('home','HOME','','2022-12-15 21:41:08','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEOOWCpezB/JqlIRhe3IFDbk4hLTw8qaAVxMR9SINSj1T8aAsOWl7MqyCz2mhe08CrA==',1,'home@mail.com',0),('lofty','lofty','','2022-12-15 17:44:02','1970-01-01 00:00:00','AQAAAAEAACcQAAAAELGg3KCaFIdPBVo2KPm9cjXBdIFynDhdFyLcxByjYiic0fU5CeU4+cQtrNroMlaUtA==',1,'lofty@mail.com',0),('mikazukibigwave','ミカヅキBIGWAVE','','2022-12-15 21:49:53','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEDB+yhQgINlagLYS5P1aOoNCI3ngLHE+68yRS5oWabLKrvaQ1jFjNTmbRTdx9I7esQ==',1,'mikazukibigwave@mail.com',0),('pikaa','pikaa','','2022-12-15 20:34:01','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEACUi0NmHKB98sUHNzO+2zUK5uUN3hG0MXRTQorPK/x363AUEq/SAT1FQpMgAfJHRA==',1,'pikaa@mail.com',0),('pikasonic','PIKASONIC','','2022-12-15 20:43:54','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEB1zrvbG4mRiTmTZZLb7CkCAzifgeYVCNaeyiEuAV/XSNBSPHBF9domLGNZmEZbM2Q==',1,'pikasonic@mail.com',0),('potsu','potsu','','2022-12-15 18:00:44','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEGsxpmL6I2FRLiSkLFjLw7i63Q1AVjOmzYEtCi1ciBNQXOoFQcTdS18/xmCfh1vg0Q==',1,'potsu@mail.com',0),('windows96','Windows96','','2022-12-15 21:48:20','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEOn7aDIwT6q5nEENnlN2VKBYWc9bBXsHQOt3swUjlMfQJ3lUBg+TGj/+Gc9gYMNiUw==',1,'windows96@mail.com',0),('yunomi','YUNOMI','','2022-12-15 21:27:51','1970-01-01 00:00:00','AQAAAAEAACcQAAAAENJuWOJrnVo8ABcG3IFn42WbyRVSKMxLVWU6B2r01Hk8lX+32wCMq2B7WivlwFcAdQ==',1,'yunomi@mail.com',0);
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

-- Dump completed on 2022-12-15 21:56:07
