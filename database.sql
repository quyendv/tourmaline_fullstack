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
  `replyToId` int NOT NULL,
  `song` int NOT NULL,
  `username` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_USER_idx` (`username`),
  KEY `FK_COMMENT_USER_idx` (`username`),
  KEY `FK_COMMENT_COMMENT_idx` (`replyToId`),
  CONSTRAINT `FK_COMMENT_COMMENT` FOREIGN KEY (`replyToId`) REFERENCES `comment` (`id`),
  CONSTRAINT `FK_COMMENT_USER` FOREIGN KEY (`username`) REFERENCES `user` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
  KEY `FK_FAVORITE_USER_idx` (`userid`),
  KEY `FK_FAVORITE_SONG_idx` (`songid`),
  CONSTRAINT `FK_FAVORITE_SONG` FOREIGN KEY (`songid`) REFERENCES `song` (`id`),
  CONSTRAINT `FK_FAVORITE_USER` FOREIGN KEY (`userid`) REFERENCES `user` (`username`)
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
  `cover_url` varchar(255) DEFAULT NULL,
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
INSERT INTO `playlist` VALUES (68301647,'anhquan7826','80s jp pop','68301647.jpg'),(1975350824,'anhquan7826','my playlist',NULL);
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
INSERT INTO `playlistsongs` VALUES (68301647,1720979461),(68301647,1847161374),(68301647,1980301390);
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
INSERT INTO `recents` VALUES ('anhquan7826',144930306,'2022-11-30 23:20:05');
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
  `coverUrl` varchar(255) DEFAULT NULL,
  `lyrics` text,
  `description` text,
  `album` varchar(255) DEFAULT NULL,
  `path` varchar(2048) NOT NULL,
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
INSERT INTO `song` VALUES (16919402,'2022-12-02 19:29:22','anhquan7826','new stage','16919402.jpg',NULL,NULL,NULL,'16919402.mp3'),(24665185,'2022-12-02 19:29:21','anhquan7826','Drive','24665185.jpg',NULL,NULL,NULL,'24665185.mp3'),(45212631,'2022-12-02 19:29:20','anhquan7826','Colors','45212631.jpg',NULL,NULL,NULL,'45212631.mp3'),(82352503,'2022-12-02 19:29:23','anhquan7826','Wanderer','82352503.jpg',NULL,NULL,NULL,'82352503.mp3'),(101157243,'2022-12-02 19:29:22','anhquan7826','Romantic Travel','101157243.jpg',NULL,NULL,NULL,'101157243.mp3'),(114652819,'2022-12-02 19:29:23','anhquan7826','? TAKE ME HOME ? — FEAT. WISHLYST [AIKA REMIX]','114652819.jpg',NULL,NULL,NULL,'114652819.mp3'),(117946796,'2022-12-02 19:29:21','anhquan7826','Lost','117946796.jpg',NULL,NULL,NULL,'117946796.mp3'),(124521406,'2022-12-02 19:29:20','anhquan7826','Claires - Evening Sky','124521406.jpg',NULL,NULL,NULL,'124521406.mp3'),(131703190,'2022-12-02 19:29:22','anhquan7826','noguchii & Jecan - Anymore','131703190.jpg',NULL,NULL,NULL,'131703190.mp3'),(144930306,'2022-11-30 23:17:05','anhquan7826','Magical Candy','144930306.jpg','','','','144930306.mp3'),(165911875,'2022-12-02 19:29:21','anhquan7826','Lois - Spotlight','165911875.jpg',NULL,NULL,NULL,'165911875.mp3'),(189369224,'2022-12-02 19:46:22','anhquan7826','04 C418 - Death','189369224.jpg',NULL,NULL,NULL,'189369224.mp3'),(196896603,'2022-12-02 19:29:21','anhquan7826','KMNZ - VR (GF ElectroHouse Bootleg)','196896603.jpg',NULL,NULL,NULL,'196896603.mp3'),(204029025,'2022-12-02 19:29:22','anhquan7826','Remember Me','204029025.jpg',NULL,NULL,NULL,'204029025.mp3'),(206879533,'2022-12-02 19:48:04','anhquan7826','Mat. - Perspective EP Track 5','206879533.jpg',NULL,NULL,NULL,'206879533.mp3'),(214631054,'2022-12-02 19:29:20','anhquan7826','breeze','214631054.jpg',NULL,NULL,NULL,'214631054.mp3'),(238957802,'2022-12-02 19:29:21','anhquan7826','Happy Kuru Kuru - Hanbunko Hanabi (Kabuki Remix)','238957802.jpg',NULL,NULL,NULL,'238957802.mp3'),(272565980,'2022-12-02 19:29:21','anhquan7826','Like A Sweet','272565980.jpg',NULL,NULL,NULL,'272565980.mp3'),(287897962,'2022-12-02 19:48:05','anhquan7826','Mat. - Perspective EP Track 7','287897962.jpg',NULL,NULL,NULL,'287897962.mp3'),(313529512,'2022-12-02 19:29:23','anhquan7826','You & Me (Feat.Plemoon)','313529512.jpg',NULL,NULL,NULL,'313529512.mp3'),(346643694,'2022-11-30 23:17:04','anhquan7826','Dance Down','346643694.jpg','','','','346643694.mp3'),(349288679,'2022-11-30 23:17:05','anhquan7826','Night Tempo - Yukiko','349288679.jpg','','','','349288679.mp3'),(385237912,'2022-11-30 23:17:05','anhquan7826','Greyl - Planetarium','385237912.jpg','','','','385237912.mp3'),(393898071,'2022-12-02 19:29:22','anhquan7826','Phantasy','393898071.jpg',NULL,NULL,NULL,'393898071.mp3'),(417570392,'2022-12-02 19:29:23','anhquan7826','Twinkle Layer','417570392.jpg',NULL,NULL,NULL,'417570392.mp3'),(451890113,'2022-12-02 19:29:21','anhquan7826','Jade Key & Meredith Bull - Breathe (Author wind remix)','451890113.jpg',NULL,NULL,NULL,'451890113.mp3'),(465914001,'2022-12-02 19:29:20','anhquan7826','Bloom','465914001.jpg',NULL,NULL,NULL,'465914001.mp3'),(482869611,'2022-12-02 19:48:04','anhquan7826','Mat. - Perspective EP Track 3','482869611.jpg',NULL,NULL,NULL,'482869611.mp3'),(485091761,'2022-12-02 19:29:22','anhquan7826','My Heart','485091761.jpg',NULL,NULL,NULL,'485091761.mp3'),(493068892,'2022-12-02 19:29:22','anhquan7826','Relive','493068892.jpg',NULL,NULL,NULL,'493068892.mp3'),(497055592,'2022-12-02 19:29:22','anhquan7826','Sakura (feat. Kimura Rin) [PIKASONIC Remix]','497055592.jpg',NULL,NULL,NULL,'497055592.mp3'),(505261946,'2022-11-30 23:17:06','anhquan7826','【﻿ｆａｎｔａｓｙ】 MEIKO NAKAHARA (1982)','505261946.jpg','','','','505261946.mp3'),(512886986,'2022-12-02 19:29:21','anhquan7826','Ferst & Zentra - Pastel Sky (feat. Rainy)(Amidst Remix)','512886986.jpg',NULL,NULL,NULL,'512886986.mp3'),(514405900,'2022-12-02 19:29:22','anhquan7826','MojiX! x Elkuu - Minamo','514405900.jpg',NULL,NULL,NULL,'514405900.mp3'),(565477168,'2022-11-30 23:17:06','anhquan7826','悲しみFOREVER [失恋Rhapsody] EP','565477168.jpg','','','','565477168.mp3'),(572977732,'2022-12-02 19:29:21','anhquan7826','Flow [5k Followers]','572977732.jpg',NULL,NULL,NULL,'572977732.mp3'),(644362288,'2022-12-02 19:29:21','anhquan7826','Forest','644362288.jpg',NULL,NULL,NULL,'644362288.mp3'),(650949325,'2022-12-02 19:29:20','anhquan7826','COR!S - Moon Garden (GHOST DATA Remix)','650949325.jpg',NULL,NULL,NULL,'650949325.mp3'),(675394911,'2022-12-02 19:29:22','anhquan7826','Moe Punch','675394911.jpg',NULL,NULL,NULL,'675394911.mp3'),(686138791,'2022-12-02 19:29:22','anhquan7826','Mirror','686138791.jpg',NULL,NULL,NULL,'686138791.mp3'),(690090236,'2022-12-02 19:29:22','anhquan7826','Over-Hit!','690090236.jpg',NULL,NULL,NULL,'690090236.mp3'),(702742878,'2022-12-02 19:29:23','anhquan7826','Starlight','702742878.jpg',NULL,NULL,NULL,'702742878.mp3'),(720783535,'2022-12-02 19:29:23','anhquan7826','World (WPIKASONIC)','720783535.jpg',NULL,NULL,NULL,'720783535.mp3'),(733691765,'2022-12-02 19:29:20','anhquan7826','AbyanF - True','733691765.jpg',NULL,NULL,NULL,'733691765.mp3'),(753308253,'2022-12-02 19:29:22','anhquan7826','Ohayou!','753308253.jpg',NULL,NULL,NULL,'753308253.mp3'),(772830337,'2022-12-02 19:29:20','anhquan7826','Artificial','772830337.jpg',NULL,NULL,NULL,'772830337.mp3'),(779739787,'2022-12-02 19:29:22','anhquan7826','Pikasonic - Asuka','779739787.jpg',NULL,NULL,NULL,'779739787.mp3'),(786435040,'2022-12-02 19:29:23','anhquan7826','Virtual (w Puniden)','786435040.jpg',NULL,NULL,NULL,'786435040.mp3'),(794202302,'2022-12-02 19:48:04','anhquan7826','Mat. - Perspective EP Track 4','794202302.jpg',NULL,NULL,NULL,'794202302.mp3'),(827604666,'2022-12-02 19:29:21','anhquan7826','Emptiness','827604666.jpg',NULL,NULL,NULL,'827604666.mp3'),(836437411,'2022-12-02 19:29:22','anhquan7826','Setsuna (Kirara Magic Remix)','836437411.jpg',NULL,NULL,NULL,'836437411.mp3'),(860079903,'2022-12-02 19:29:22','anhquan7826','Rain (w KITSUNE)','860079903.jpg',NULL,NULL,NULL,'860079903.mp3'),(889415535,'2022-12-02 19:29:22','anhquan7826','Osaka Express','889415535.jpg',NULL,NULL,NULL,'889415535.mp3'),(907395639,'2022-12-02 19:48:05','anhquan7826','Mat. - Perspective EP Track 6','907395639.jpg',NULL,NULL,NULL,'907395639.mp3'),(925220689,'2022-12-02 19:29:22','anhquan7826','PIKASONIC - Horizon','925220689.jpg',NULL,NULL,NULL,'925220689.mp3'),(928805643,'2022-12-02 19:29:22','anhquan7826','PIKASONIC - Wildflowers [UXN Release]','928805643.jpg',NULL,NULL,NULL,'928805643.mp3'),(929863895,'2022-11-30 23:17:06','anhquan7826','Yasuha - Flyday Chinatown (Night Tempo Edit)','929863895.jpg','','','','929863895.mp3'),(934738827,'2022-12-02 19:29:22','anhquan7826','Nostalgica','934738827.jpg',NULL,NULL,NULL,'934738827.mp3'),(946027106,'2022-12-02 19:29:21','anhquan7826','Edge Of The Way','946027106.jpg',NULL,NULL,NULL,'946027106.mp3'),(958018574,'2022-12-02 19:29:20','anhquan7826','AByanF - Slidewalk 『Dubstep』','958018574.jpg',NULL,NULL,NULL,'958018574.mp3'),(988715273,'2022-11-30 23:17:05','anhquan7826','HD - Ramen 5670NINE','988715273.jpg','','','','988715273.mp3'),(992226217,'2022-11-30 23:17:05','anhquan7826','SUPER RISER!','992226217.jpg','','','','992226217.mp3'),(1017395806,'2022-12-02 19:29:23','anhquan7826','U And Me','1017395806.jpg',NULL,NULL,NULL,'1017395806.mp3'),(1018189668,'2022-12-02 19:29:23','anhquan7826','Twinklestar','1018189668.jpg',NULL,NULL,NULL,'1018189668.mp3'),(1030238271,'2022-12-02 19:29:20','anhquan7826','Awaiting (feat. Rainy)','1030238271.jpg',NULL,NULL,NULL,'1030238271.mp3'),(1079452472,'2022-12-02 19:48:04','anhquan7826','Mat. - Perspective EP Track 1','1079452472.jpg',NULL,NULL,NULL,'1079452472.mp3'),(1129699765,'2022-12-02 19:29:22','anhquan7826','Rise','1129699765.jpg',NULL,NULL,NULL,'1129699765.mp3'),(1133247758,'2022-12-02 19:29:22','anhquan7826','Path To Fairyland','1133247758.jpg',NULL,NULL,NULL,'1133247758.mp3'),(1142730826,'2022-12-02 19:29:20','anhquan7826','Daydream Cafe (Kirara Magic Remix) feat. Shion','1142730826.jpg',NULL,NULL,NULL,'1142730826.mp3'),(1146631662,'2022-12-02 19:29:20','anhquan7826','Cosmos','1146631662.jpg',NULL,NULL,NULL,'1146631662.mp3'),(1202625906,'2022-12-02 19:29:20','anhquan7826','Dreaming','1202625906.jpg',NULL,NULL,NULL,'1202625906.mp3'),(1217918966,'2022-12-02 19:29:23','anhquan7826','Smile','1217918966.jpg',NULL,NULL,NULL,'1217918966.mp3'),(1227443045,'2022-12-02 19:29:22','anhquan7826','Play','1227443045.jpg',NULL,NULL,NULL,'1227443045.mp3'),(1236932759,'2022-12-02 19:29:22','anhquan7826','Rainbow sky(wREVERSED)','1236932759.jpg',NULL,NULL,NULL,'1236932759.mp3'),(1261048123,'2022-12-02 19:29:21','anhquan7826','Fantasy (w MONICO)','1261048123.jpg',NULL,NULL,NULL,'1261048123.mp3'),(1263927684,'2022-11-30 23:17:05','anhquan7826','October 3 Project','1263927684.jpg','','','','1263927684.mp3'),(1275941856,'2022-11-30 23:17:06','anhquan7826','時空 Rendez-Vous','1275941856.jpg','','','','1275941856.mp3'),(1284151857,'2022-12-02 19:29:23','anhquan7826','Summer Of Beach','1284151857.jpg',NULL,NULL,NULL,'1284151857.mp3'),(1302122541,'2022-11-30 23:17:04','anhquan7826','Android52 - Real Love','1302122541.jpg','','','','1302122541.mp3'),(1305740319,'2022-11-30 23:17:06','anhquan7826','ミカヅキBIGWAVE - シャボンのシャンプー','1305740319.jpg','','','','1305740319.mp3'),(1323228764,'2022-11-30 23:17:05','anhquan7826','S U B W A Y S - アイスクリーム','1323228764.jpg','','','','1323228764.mp3'),(1331674615,'2022-11-30 23:17:04','anhquan7826','Android52 - Romance','1331674615.jpg','','','','1331674615.mp3'),(1333697111,'2022-12-02 19:48:04','anhquan7826','Mat. - Perspective EP Track 2','1333697111.jpg',NULL,NULL,NULL,'1333697111.mp3'),(1358822488,'2022-12-02 19:29:23','anhquan7826','The twenty three (Free Download)','1358822488.jpg',NULL,NULL,NULL,'1358822488.mp3'),(1359486456,'2022-12-02 19:29:20','anhquan7826','Amidst x Sacry - Carousel','1359486456.jpg',NULL,NULL,NULL,'1359486456.mp3'),(1384781338,'2022-12-02 19:29:21','anhquan7826','Mihony - Cute Swing','1384781338.jpg',NULL,NULL,NULL,'1384781338.mp3'),(1420621256,'2022-11-30 23:17:06','anhquan7826','heaven beach','1420621256.jpg','','','','1420621256.mp3'),(1420811583,'2022-12-02 19:29:21','anhquan7826','Eternity','1420811583.jpg',NULL,NULL,NULL,'1420811583.mp3'),(1421402119,'2022-11-30 23:17:05','anhquan7826','Payᵖᵃʸ','1421402119.jpg','','','','1421402119.mp3'),(1432367093,'2022-12-02 19:29:22','anhquan7826','Rytmeklubben - Girlfriend (Moe Shop Edit)','1432367093.jpg',NULL,NULL,NULL,'1432367093.mp3'),(1466908070,'2022-12-02 19:28:08','anhquan7826','AByanF - Slidewalk 『Dubstep』','1466908070.jpg',NULL,NULL,NULL,'1466908070.mp3'),(1475184453,'2022-12-02 19:29:21','anhquan7826','Kyori','1475184453.jpg',NULL,NULL,NULL,'1475184453.mp3'),(1477897836,'2022-12-02 19:29:21','anhquan7826','Honey (feat. Shion)','1477897836.jpg',NULL,NULL,NULL,'1477897836.mp3'),(1488365695,'2022-12-02 19:29:20','anhquan7826','Creed','1488365695.jpg',NULL,NULL,NULL,'1488365695.mp3'),(1497542337,'2022-12-02 19:29:21','anhquan7826','Michael Li - Gomenasai','1497542337.jpg',NULL,NULL,NULL,'1497542337.mp3'),(1517870492,'2022-12-02 19:29:23','anhquan7826','Tako','1517870492.jpg',NULL,NULL,NULL,'1517870492.mp3'),(1522146267,'2022-12-02 19:29:22','anhquan7826','PIKASONIC & Tatsunoshin - Lockdown (ft. NEONA)','1522146267.jpg',NULL,NULL,NULL,'1522146267.mp3'),(1544402921,'2022-12-02 19:29:22','anhquan7826','PIKASONIC - Inside [UXN Release]','1544402921.jpg',NULL,NULL,NULL,'1544402921.mp3'),(1578902249,'2022-11-30 23:17:05','anhquan7826','She Is...','1578902249.jpg','','','','1578902249.mp3'),(1589426509,'2022-12-02 19:29:20','anhquan7826','Cloudier - A Centimetre Apart (Systile Remix)','1589426509.jpg',NULL,NULL,NULL,'1589426509.mp3'),(1602301361,'2022-12-02 19:29:22','anhquan7826','Shooting star','1602301361.jpg',NULL,NULL,NULL,'1602301361.mp3'),(1631183107,'2022-11-30 23:17:04','anhquan7826','First Season','1631183107.jpg','','','','1631183107.mp3'),(1664822041,'2022-11-30 23:17:06','anhquan7826','To You','1664822041.jpg','','','','1664822041.mp3'),(1693345589,'2022-12-02 19:29:21','anhquan7826','Forever','1693345589.jpg',NULL,NULL,NULL,'1693345589.mp3'),(1696527422,'2022-11-30 23:17:05','anhquan7826','In Love With You','1696527422.jpg','','','','1696527422.mp3'),(1707110337,'2022-12-02 19:29:20','anhquan7826','Couple N & Flay! - Natsumeku','1707110337.jpg',NULL,NULL,NULL,'1707110337.mp3'),(1708728926,'2022-12-02 19:46:22','anhquan7826','01 C418 - Key','1708728926.jpg',NULL,NULL,NULL,'1708728926.mp3'),(1720979461,'2022-11-30 23:17:06','anhquan7826','夢の続き ~ Dreams Of Light ~','1720979461.jpg','','','','1720979461.mp3'),(1738788031,'2022-12-02 19:29:21','anhquan7826','K-NEXT - Access (Author Wind Remix)','1738788031.jpg',NULL,NULL,NULL,'1738788031.mp3'),(1742428243,'2022-12-02 19:29:21','anhquan7826','Make A Wish!','1742428243.jpg',NULL,NULL,NULL,'1742428243.mp3'),(1756539735,'2022-12-02 19:29:20','anhquan7826','Baq5 - Once Again','1756539735.jpg',NULL,NULL,NULL,'1756539735.mp3'),(1759995885,'2022-12-02 19:29:21','anhquan7826','FreYou - Flight','1759995885.jpg',NULL,NULL,NULL,'1759995885.mp3'),(1766499416,'2022-12-02 19:46:22','anhquan7826','02 C418 - Door','1766499416.jpg',NULL,NULL,NULL,'1766499416.mp3'),(1787944684,'2022-12-02 19:29:23','anhquan7826','Tashikametai Nukumori (feat. Shoyun)','1787944684.jpg',NULL,NULL,NULL,'1787944684.mp3'),(1795000161,'2022-12-02 19:29:21','anhquan7826','Field','1795000161.jpg',NULL,NULL,NULL,'1795000161.mp3'),(1811741842,'2022-11-30 23:17:05','anhquan7826','TELL ME TELL ME','1811741842.jpg','','','','1811741842.mp3'),(1825363300,'2022-12-02 19:29:23','anhquan7826','Surf','1825363300.jpg',NULL,NULL,NULL,'1825363300.mp3'),(1847161374,'2022-11-30 23:17:05','anhquan7826','SUI UZI - Midnight Sailor','1847161374.jpg','','','','1847161374.mp3'),(1849608669,'2022-12-02 19:29:21','anhquan7826','Lone Alpha & KITSUNE - U & Me','1849608669.jpg',NULL,NULL,NULL,'1849608669.mp3'),(1863330795,'2022-12-02 19:29:23','anhquan7826','SuperNova【FutureProgressive House】','1863330795.jpg',NULL,NULL,NULL,'1863330795.mp3'),(1866437038,'2022-12-02 19:29:20','anhquan7826','A Sweet Start','1866437038.jpg',NULL,NULL,NULL,'1866437038.mp3'),(1874020779,'2022-12-02 19:29:20','anhquan7826','Bright','1874020779.jpg',NULL,NULL,NULL,'1874020779.mp3'),(1918196644,'2022-12-02 19:29:20','anhquan7826','Charm (w Puniden)','1918196644.jpg',NULL,NULL,NULL,'1918196644.mp3'),(1919003477,'2022-12-02 19:29:22','anhquan7826','Miss You','1919003477.jpg',NULL,NULL,NULL,'1919003477.mp3'),(1923793143,'2022-12-02 19:29:21','anhquan7826','Imagine','1923793143.jpg',NULL,NULL,NULL,'1923793143.mp3'),(1925922370,'2022-11-30 23:17:04','anhquan7826','Borderless','1925922370.jpg','','','','1925922370.mp3'),(1926788209,'2022-12-02 19:29:23','anhquan7826','You Look So Good','1926788209.jpg',NULL,NULL,NULL,'1926788209.mp3'),(1942041696,'2022-11-30 23:17:06','anhquan7826','夢のDancing','1942041696.jpg','','','','1942041696.mp3'),(1980301390,'2022-11-30 23:17:06','anhquan7826','luv.ly & eiiwun - summer magic','1980301390.jpg','','','','1980301390.mp3'),(2002473944,'2022-12-02 19:29:21','anhquan7826','Lunai2 & Pikasonic - Climax (Etopia Remix)','2002473944.jpg',NULL,NULL,NULL,'2002473944.mp3'),(2050156374,'2022-12-02 19:29:22','anhquan7826','My Kind Of Love (feat. CHIARA)','2050156374.jpg',NULL,NULL,NULL,'2050156374.mp3'),(2056730330,'2022-12-02 19:29:22','anhquan7826','Notice (w TORIENA)','2056730330.jpg',NULL,NULL,NULL,'2056730330.mp3'),(2082890648,'2022-12-02 19:29:21','anhquan7826','Halcyon','2082890648.jpg',NULL,NULL,NULL,'2082890648.mp3'),(2101573346,'2022-12-02 19:29:21','anhquan7826','Mardi - Sunflower [E.T. Summering Release]','2101573346.jpg',NULL,NULL,NULL,'2101573346.mp3'),(2101619215,'2022-11-30 23:17:04','anhquan7826','Future Rhapsody [失恋Rhapsody] EP','2101619215.jpg','','','','2101619215.mp3'),(2102269203,'2022-12-02 19:46:22','anhquan7826','03 C418 - Subwoofer Lullaby','2102269203.jpg',NULL,NULL,NULL,'2102269203.mp3'),(2113015871,'2022-12-02 19:29:20','anhquan7826','Cosmic [Vibes Release]','2113015871.jpg',NULL,NULL,NULL,'2113015871.mp3'),(2113671589,'2022-11-30 23:17:05','anhquan7826','SUI UZI - City Night Shadows','2113671589.jpg','','','','2113671589.mp3'),(2135920033,'2022-12-02 19:29:21','anhquan7826','Endless Hanabi','2135920033.jpg',NULL,NULL,NULL,'2135920033.mp3'),(2136127768,'2022-12-02 19:29:21','anhquan7826','Journey (feat. Ugu)','2136127768.jpg',NULL,NULL,NULL,'2136127768.mp3'),(2139091126,'2022-12-02 19:29:20','anhquan7826','Claires - Submerge','2139091126.jpg',NULL,NULL,NULL,'2139091126.mp3'),(2146263885,'2022-11-30 23:17:05','anhquan7826','LISA','2146263885.jpg','','','','2146263885.mp3');
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
  `tag` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('anhquan7826','Nguyen Anh Quan','Temporary','2022-11-18 11:00:50','2015-05-16 05:50:06','AQAAAAEAACcQAAAAEH0d5Z8K2mT20ExGXmAtdLFCUXXf/3Wtgrnv5FqU+9m7hVaT0YctAxXKxb/BLWUTLg==',1,'anhquan7826@gmail.com',0,NULL),('anhquan7826_2','','','2022-11-18 11:15:25','1970-01-01 00:00:00','AQAAAAEAACcQAAAAEKnAO4Q3WEjsedgirBHWx1iXsWKTkivTNH86/6yIf9d5Qf+pAQh1ROd1rR7xWd2Z6w==',1,'',0,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-03 17:39:38
