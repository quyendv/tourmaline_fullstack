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
  CONSTRAINT `FK_COMMENT_USER` FOREIGN KEY (`username`) REFERENCES `user` (`username`),
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
INSERT INTO `song` VALUES (40991359,'2022-12-08 18:41:44','anhquan7826','breeze','',248.215,0),(61132799,'2022-12-08 18:41:48','anhquan7826','Cosmos','',253.44,0),(68786455,'2022-12-08 17:57:54','anhquan7826','Mat. - Perspective EP Track 4','',119.405,0),(119502977,'2022-12-08 18:12:45','anhquan7826','Android52 - Real Love','',302.21,0),(125123863,'2022-12-08 18:41:56','anhquan7826','Miss You','',235.102,0),(148748452,'2022-12-08 17:57:54','anhquan7826','Mat. - Perspective EP Track 2','',100.44,0),(151563750,'2022-12-08 18:41:53','anhquan7826','Journey (feat. Ugu)','',264.071,0),(162751338,'2022-12-08 18:41:44','anhquan7826','Awaiting (feat. Rainy)','',241.214,0),(166488150,'2022-12-08 18:12:47','anhquan7826','Selfish High Heels (feat. Harrison & マクロスMACROSS 82-99)','',226.533,0),(169346560,'2022-12-08 18:41:43','anhquan7826','Achillea - アキレア','',259.082,0),(184041710,'2022-12-08 18:41:58','anhquan7826','Nostalgica','',202.605,0),(185233862,'2022-12-08 18:12:46','anhquan7826','Greyl - Planetarium','',225.645,0),(191650951,'2022-12-08 18:42:06','anhquan7826','Twinklestar','',203.859,0),(202214121,'2022-12-08 18:42:04','anhquan7826','Starlight','',202.579,0),(205854897,'2022-12-08 18:41:58','anhquan7826','Notice (w TORIENA)','',189.204,0),(228882895,'2022-12-08 18:42:02','anhquan7826','Rainbow sky(wREVERSED)','',188.551,0),(233548755,'2022-12-08 18:41:43','anhquan7826','AbyanF - True','',342.047,0),(247148258,'2022-12-08 18:41:52','anhquan7826','FreYou - Flight','',198.034,0),(269984399,'2022-12-08 18:41:59','anhquan7826','Pikasonic - Asuka','',237.217,0),(274203269,'2022-12-08 18:41:58','anhquan7826','Ohayou!','',217.547,0),(285825642,'2022-12-08 18:41:54','anhquan7826','Like A Sweet','',191.582,0),(319524115,'2022-12-08 18:42:08','anhquan7826','ジェリーフィッシュ (feat. ローラーガール)【MEiSTER】','',237.035,0),(347234699,'2022-12-08 18:41:52','anhquan7826','Honey (feat. Shion)','',229.093,0),(352935501,'2022-12-08 18:42:02','anhquan7826','Rain (w KITSUNE)','',189.675,0),(354212266,'2022-12-08 18:12:46','anhquan7826','HD - Ramen 5670NINE','',163.03,0),(363252756,'2022-12-08 17:57:54','anhquan7826','Mat. - Perspective EP Track 3','',106.997,0),(381599194,'2022-12-08 18:42:07','anhquan7826','Virtual (w Puniden)','',212.819,0),(384511220,'2022-12-08 18:12:48','anhquan7826','ミルクセーキ420','',184.842,0),(407336463,'2022-12-08 18:41:50','anhquan7826','Endless Hanabi','',280.032,0),(454027330,'2022-12-08 18:12:47','anhquan7826','SUI UZI - Midnight Sailor','',242.86,0),(482712459,'2022-12-08 18:41:51','anhquan7826','Field','',199.732,0),(531011935,'2022-12-08 18:42:03','anhquan7826','Remember Me','',261.381,0),(550937993,'2022-12-08 18:41:44','anhquan7826','Baq5 - Once Again','',260.362,0),(566139908,'2022-12-08 18:41:50','anhquan7826','Emptiness','',181.394,0),(602831830,'2022-12-08 18:42:03','anhquan7826','Rise','',204.617,0),(679499819,'2022-12-08 18:12:47','anhquan7826','She Is...','',232.594,0),(746951241,'2022-12-08 18:42:04','anhquan7826','Setsuna (Kirara Magic Remix)','',175.307,0),(768196705,'2022-12-08 18:12:47','anhquan7826','To You','',273.867,0),(770410846,'2022-12-08 18:41:55','anhquan7826','Make A Wish!','',281.443,0),(770618848,'2022-12-08 18:42:01','anhquan7826','PIKASONIC - Wildflowers [UXN Release]','',202.605,0),(780420000,'2022-12-08 18:41:46','anhquan7826','Charm (w Puniden)','',196.466,0),(798289163,'2022-12-08 18:12:46','anhquan7826','First Season','',295.836,0),(828225503,'2022-12-08 18:41:50','anhquan7826','Eternity','',266.37,0),(829921864,'2022-12-08 18:12:47','anhquan7826','S U B W A Y S - アイスクリーム','',167.915,0),(834699633,'2022-12-08 18:41:53','anhquan7826','Kyori','',168.777,0),(836517172,'2022-12-08 18:41:52','anhquan7826','Happy Kuru Kuru - Hanbunko Hanabi (Kabuki Remix)','',276.662,0),(844805992,'2022-12-08 18:42:04','anhquan7826','Shooting star','',174.524,0),(846891624,'2022-12-08 18:41:49','anhquan7826','Daydream Cafe (Kirara Magic Remix) feat. Shion','',254.772,0),(876055605,'2022-12-08 18:41:52','anhquan7826','Halcyon','',204.042,0),(887850355,'2022-12-08 18:42:07','anhquan7826','Wanderer','',206.706,0),(891616721,'2022-12-08 18:42:05','anhquan7826','? TAKE ME HOME ? — FEAT. WISHLYST [AIKA REMIX]','',171.781,0),(898934716,'2022-12-08 18:41:59','anhquan7826','Over-Hit!','',247.536,0),(911888322,'2022-12-08 18:42:08','anhquan7826','#ワンナイトマジック (your imouto Remix)','',172.669,0),(923476433,'2022-12-08 18:42:08','anhquan7826','You & Me (Feat.Plemoon)','',178.207,0),(926791513,'2022-12-08 18:41:59','anhquan7826','Phantasy','',217.129,0),(943244083,'2022-12-08 18:42:06','anhquan7826','Twinkle Layer','',243.905,0),(956561799,'2022-12-08 18:41:43','anhquan7826','AByanF - Slidewalk 『Dubstep』','',254.38,0),(968678342,'2022-12-08 18:41:51','anhquan7826','Forest','',268.173,0),(1003770975,'2022-12-08 18:41:51','anhquan7826','Ferst & Zentra - Pastel Sky (feat. Rainy)(Amidst Remix)','',172.173,0),(1044040610,'2022-12-08 18:41:47','anhquan7826','COR!S - Moon Garden (GHOST DATA Remix)','',278.151,0),(1053128219,'2022-12-08 18:41:48','anhquan7826','Couple N & Flay! - Natsumeku','',194.089,0),(1054274455,'2022-12-08 18:41:53','anhquan7826','KMNZ - VR (GF ElectroHouse Bootleg)','',231.81,0),(1060233386,'2022-12-08 18:12:46','anhquan7826','【﻿ｆａｎｔａｓｙ】 MEIKO NAKAHARA (1982)','',291.239,0),(1075716317,'2022-12-08 18:42:03','anhquan7826','Rytmeklubben - Girlfriend (Moe Shop Edit)','',199.053,0),(1075861660,'2022-12-08 18:42:04','anhquan7826','Summer Of Beach','',220.865,0),(1079269818,'2022-12-08 18:12:47','anhquan7826','SUI UZI - City Night Shadows','',249.965,0),(1096444014,'2022-12-08 18:42:02','anhquan7826','Relive','',168.385,0),(1099051195,'2022-12-08 18:12:45','anhquan7826','Android52 - Romance','',214.386,0),(1101076448,'2022-12-08 18:42:02','anhquan7826','Play','',177.057,0),(1110531557,'2022-12-08 18:41:48','anhquan7826','Cosmic [Vibes Release]','',296.045,0),(1129199367,'2022-12-08 18:41:57','anhquan7826','My Heart','',238.158,0),(1141352335,'2022-12-08 18:12:47','anhquan7826','Tatsuro Yamashita - Ride On Time (Night Tempo)','',256.862,0),(1163454618,'2022-12-08 18:12:46','anhquan7826','In Love With You','',266.37,0),(1164623953,'2022-12-08 18:12:48','anhquan7826','ミカヅキBIGWAVE - Emotional Prism 感情的なプリズム [PNTSS0202]','',273.136,0),(1192914459,'2022-12-08 18:12:45','anhquan7826','Dance Down','',181.995,0),(1220802919,'2022-12-08 18:12:48','anhquan7826','夢の続き ~ Dreams Of Light ~','',187.768,0),(1233941788,'2022-12-08 18:42:00','anhquan7826','PIKASONIC - Horizon','',200.202,0),(1255062433,'2022-12-08 18:42:01','anhquan7826','PIKASONIC - 一透星 (feat. nakotanmaru) [MEGAREX Release]','',232.542,0),(1270478676,'2022-12-08 18:42:07','anhquan7826','World (WPIKASONIC)','',224.809,0),(1271091611,'2022-12-08 18:41:56','anhquan7826','Mardi - Sunflower [E.T. Summering Release]','',187.271,0),(1274031112,'2022-12-08 18:41:53','anhquan7826','Imagine','',241.266,0),(1277416943,'2022-12-08 18:42:03','anhquan7826','Sakura (feat. Kimura Rin) [PIKASONIC Remix]','',242.128,0),(1283916905,'2022-12-08 18:41:57','anhquan7826','My Kind Of Love (feat. CHIARA)','',213.792,0),(1284585073,'2022-12-08 18:12:48','anhquan7826','夢のDancing','',181.916,0),(1336434437,'2022-12-08 17:57:54','anhquan7826','Mat. - Perspective EP Track 1','',121.652,0),(1355395857,'2022-12-08 18:41:58','anhquan7826','Osaka Express','',203.467,0),(1368805930,'2022-12-08 18:41:49','anhquan7826','Drive','',180.532,0),(1379074977,'2022-12-08 18:12:46','anhquan7826','luv.ly & eiiwun - summer magic','',164.702,0),(1391322608,'2022-12-08 18:12:46','anhquan7826','heaven beach','',158.197,0),(1392678614,'2022-12-08 18:41:44','anhquan7826','Artificial','',228.806,0),(1415474951,'2022-12-08 18:42:05','anhquan7826','SuperNova【FutureProgressive House】','',229.25,0),(1425474742,'2022-12-08 18:12:46','anhquan7826','LISA','',212.715,0),(1427925220,'2022-12-08 18:41:56','anhquan7826','Mihony - Cute Swing','',215.693,0),(1429354986,'2022-12-08 18:41:49','anhquan7826','Dreaming','',191.764,0),(1435364507,'2022-12-08 18:12:46','anhquan7826','Payᵖᵃʸ','',176.065,0),(1443215327,'2022-12-08 18:41:57','anhquan7826','MojiX! x Elkuu - Minamo','',318.04,0),(1444211657,'2022-12-08 18:41:47','anhquan7826','Colors','',199.732,0),(1464518139,'2022-12-08 18:42:08','anhquan7826','手を伸ばして(Reaching For)Feat. N6','',274.991,0),(1464948583,'2022-12-08 18:41:55','anhquan7826','Lunai2 & Pikasonic - Climax (Etopia Remix)','',226.925,0),(1476883308,'2022-12-08 18:12:48','anhquan7826','ミカヅキBIGWAVE - シャボンのシャンプー','',173.113,0),(1487147285,'2022-12-08 18:12:46','anhquan7826','Jesse Cassettes - Haruka Rhythm! (Album Version) [Magical Girl Album 2019]','',280.032,0),(1487503483,'2022-12-08 18:41:46','anhquan7826','Claires - Submerge','',280.372,0),(1511586169,'2022-12-08 18:41:53','anhquan7826','Jade Key & Meredith Bull - Breathe (Author wind remix)','',174.158,0),(1515041221,'2022-12-08 18:41:54','anhquan7826','Lois - Spotlight','',304.326,0),(1545336872,'2022-12-08 18:41:52','anhquan7826','Forever','',193.175,0),(1558966020,'2022-12-08 18:41:51','anhquan7826','Flow [5k Followers]','',154.592,0),(1563846000,'2022-12-08 18:41:56','anhquan7826','Michael Li - Gomenasai','',161.724,0),(1566437883,'2022-12-08 18:41:47','anhquan7826','Cloudier - A Centimetre Apart (Systile Remix)','',272.039,0),(1574488460,'2022-12-08 18:41:44','anhquan7826','A Sweet Start','',159.425,0),(1587769797,'2022-12-08 17:57:54','anhquan7826','Mat. - Perspective EP Track 6','',236.956,0),(1589344303,'2022-12-08 18:42:05','anhquan7826','Tashikametai Nukumori (feat. Shoyun)','',270.445,0),(1621239364,'2022-12-08 18:41:53','anhquan7826','K-NEXT - Access (Author Wind Remix)','',176.561,0),(1643238269,'2022-12-08 18:12:46','anhquan7826','Magical Candy','',173.792,0),(1708625805,'2022-12-08 18:41:54','anhquan7826','Lone Alpha & KITSUNE - U & Me','',182.987,0),(1742970353,'2022-12-08 18:42:05','anhquan7826','Surf','',240.822,0),(1743087535,'2022-12-08 18:12:45','anhquan7826','Borderless','',306.52,0),(1743166639,'2022-12-08 18:42:03','anhquan7826','Romantic Travel','',214.648,0),(1747497746,'2022-12-08 18:41:56','anhquan7826','Mirror','',261.694,0),(1755383647,'2022-12-08 18:42:04','anhquan7826','Smile','',202.997,0),(1768828045,'2022-12-08 18:12:47','anhquan7826','TELL ME TELL ME','',245.028,0),(1796594433,'2022-12-08 18:41:57','anhquan7826','new stage','',283.533,0),(1817513472,'2022-12-08 18:12:47','anhquan7826','PSYQUI - ヒステリックナイトガール feat. Such (android52 Edit)','',301.035,0),(1828917367,'2022-12-08 18:12:48','anhquan7826','サクラSAKURA-LEE - My Heart Baby (Read The Description)','',242.311,0),(1845125305,'2022-12-08 18:42:08','anhquan7826','You Look So Good','',204.564,0),(1851668614,'2022-12-08 18:41:43','anhquan7826','Amidst x Sacry - Carousel','',180.584,0),(1861082882,'2022-12-08 18:41:44','anhquan7826','Bloom','',203.18,0),(1895727323,'2022-12-08 17:57:54','anhquan7826','Mat. - Perspective EP Track 7','',116.297,0),(1897217881,'2022-12-08 18:42:00','anhquan7826','PIKASONIC - Inside [UXN Release]','',202.083,0),(1897674625,'2022-12-08 18:42:06','anhquan7826','The twenty three (Free Download)','',293.485,0),(1902199571,'2022-12-08 17:57:54','anhquan7826','Mat. - Perspective EP Track 5','',110.341,0),(1929209529,'2022-12-08 18:41:46','anhquan7826','Claires - Evening Sky','',320.574,0),(1945997698,'2022-12-08 18:42:01','anhquan7826','PIKASONIC & Tatsunoshin - Lockdown (ft. NEONA)','',209.893,0),(1953820815,'2022-12-08 18:12:48','anhquan7826','時空 Rendez-Vous','',272.953,0),(1961893614,'2022-12-08 18:41:55','anhquan7826','Love Letter (Ft. 동백)','',245.42,0),(1994077535,'2022-12-08 18:41:51','anhquan7826','Fantasy (w MONICO)','',275.461,0),(2002289372,'2022-12-08 18:41:59','anhquan7826','Path To Fairyland','',234.135,0),(2015752580,'2022-12-08 18:41:57','anhquan7826','noguchii & Jecan - Anymore','',194.115,0),(2020815188,'2022-12-08 18:12:47','anhquan7826','SUPER RISER!','',232.045,0),(2051254989,'2022-12-08 18:42:05','anhquan7826','Tako','',187.846,0),(2059088398,'2022-12-08 18:41:50','anhquan7826','Edge Of The Way','',182.857,0),(2062897242,'2022-12-08 18:41:56','anhquan7826','Moe Punch','',149.342,0),(2082512246,'2022-12-08 18:12:47','anhquan7826','Yasuha - Flyday Chinatown (Night Tempo Edit)','',205.217,0),(2085813953,'2022-12-08 18:41:55','anhquan7826','Lost','',175.229,0),(2100363326,'2022-12-08 18:42:06','anhquan7826','U And Me','',213.551,0),(2104190528,'2022-12-08 18:41:45','anhquan7826','Bright','',256.6,0),(2140874922,'2022-12-08 18:41:48','anhquan7826','Creed','',173.479,0);
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
INSERT INTO `songtags` VALUES (61132799,'Dubstep'),(162751338,'Dubstep'),(202214121,'Dubstep'),(228882895,'Dubstep'),(233548755,'Dubstep'),(319524115,'Dubstep'),(347234699,'Dubstep'),(407336463,'Dubstep'),(746951241,'Dubstep'),(1099051195,'Dubstep'),(1101076448,'Dubstep'),(1164623953,'Dubstep'),(1233941788,'Dubstep'),(1255062433,'Dubstep'),(1271091611,'Dubstep'),(1391322608,'Dubstep'),(1392678614,'Dubstep'),(1415474951,'Dubstep'),(1464948583,'Dubstep'),(1545336872,'Dubstep'),(1643238269,'Dubstep'),(1768828045,'Dubstep'),(1796594433,'Dubstep'),(1861082882,'Dubstep'),(1945997698,'Dubstep'),(1961893614,'Dubstep'),(119502977,'Electronic'),(185233862,'Electronic'),(191650951,'Electronic'),(202214121,'Electronic'),(274203269,'Electronic'),(285825642,'Electronic'),(381599194,'Electronic'),(846891624,'Electronic'),(968678342,'Electronic'),(1110531557,'Electronic'),(1274031112,'Electronic'),(1277416943,'Electronic'),(1444211657,'Electronic'),(1476883308,'Electronic'),(1574488460,'Electronic'),(1747497746,'Electronic'),(1755383647,'Electronic'),(1817513472,'Electronic'),(1845125305,'Electronic'),(1851668614,'Electronic'),(1861082882,'Electronic'),(1994077535,'Electronic'),(2085813953,'Electronic'),(381599194,'Funk'),(482712459,'Funk'),(531011935,'Funk'),(770410846,'Funk'),(798289163,'Funk'),(844805992,'Funk'),(876055605,'Funk'),(911888322,'Funk'),(1060233386,'Funk'),(1079269818,'Funk'),(1429354986,'Funk'),(1435364507,'Funk'),(1464518139,'Funk'),(1464948583,'Funk'),(1558966020,'Funk'),(1566437883,'Funk'),(1643238269,'Funk'),(1828917367,'Funk'),(1929209529,'Funk'),(2002289372,'Funk'),(2020815188,'Funk'),(2051254989,'Funk'),(40991359,'Future House'),(68786455,'Future House'),(125123863,'Future House'),(151563750,'Future House'),(184041710,'Future House'),(205854897,'Future House'),(352935501,'Future House'),(566139908,'Future House'),(770618848,'Future House'),(834699633,'Future House'),(836517172,'Future House'),(876055605,'Future House'),(891616721,'Future House'),(923476433,'Future House'),(926791513,'Future House'),(943244083,'Future House'),(1044040610,'Future House'),(1192914459,'Future House'),(1255062433,'Future House'),(1336434437,'Future House'),(1355395857,'Future House'),(1368805930,'Future House'),(1464518139,'Future House'),(1587769797,'Future House'),(1742970353,'Future House'),(1902199571,'Future House'),(1945997698,'Future House'),(2015752580,'Future House'),(2140874922,'Future House'),(61132799,'Hiphop'),(119502977,'Hiphop'),(166488150,'Hiphop'),(679499819,'Hiphop'),(780420000,'Hiphop'),(891616721,'Hiphop'),(926791513,'Hiphop'),(1053128219,'Hiphop'),(1075861660,'Hiphop'),(1163454618,'Hiphop'),(1220802919,'Hiphop'),(1415474951,'Hiphop'),(1425474742,'Hiphop'),(1487503483,'Hiphop'),(1515041221,'Hiphop'),(1621239364,'Hiphop'),(1768828045,'Hiphop'),(1953820815,'Hiphop'),(1961893614,'Hiphop'),(40991359,'Lofi'),(68786455,'Lofi'),(148748452,'Lofi'),(169346560,'Lofi'),(205854897,'Lofi'),(269984399,'Lofi'),(363252756,'Lofi'),(384511220,'Lofi'),(798289163,'Lofi'),(829921864,'Lofi'),(834699633,'Lofi'),(887850355,'Lofi'),(956561799,'Lofi'),(1060233386,'Lofi'),(1075716317,'Lofi'),(1096444014,'Lofi'),(1101076448,'Lofi'),(1129199367,'Lofi'),(1274031112,'Lofi'),(1277416943,'Lofi'),(1336434437,'Lofi'),(1427925220,'Lofi'),(1435364507,'Lofi'),(1487147285,'Lofi'),(1511586169,'Lofi'),(1563846000,'Lofi'),(1587769797,'Lofi'),(1589344303,'Lofi'),(1708625805,'Lofi'),(1743166639,'Lofi'),(1747497746,'Lofi'),(1895727323,'Lofi'),(1897217881,'Lofi'),(1902199571,'Lofi'),(2059088398,'Lofi'),(2062897242,'Lofi'),(2140874922,'Lofi'),(184041710,'Rap'),(185233862,'Rap'),(247148258,'Rap'),(454027330,'Rap'),(531011935,'Rap'),(550937993,'Rap'),(602831830,'Rap'),(768196705,'Rap'),(780420000,'Rap'),(828225503,'Rap'),(1003770975,'Rap'),(1270478676,'Rap'),(1271091611,'Rap'),(1284585073,'Rap'),(1443215327,'Rap'),(1743087535,'Rap'),(1851668614,'Rap'),(1897674625,'Rap'),(2082512246,'Rap'),(2104190528,'Rap'),(354212266,'Synthwave'),(602831830,'Synthwave'),(828225503,'Synthwave'),(829921864,'Synthwave'),(898934716,'Synthwave'),(1054274455,'Synthwave'),(1079269818,'Synthwave'),(1141352335,'Synthwave'),(1163454618,'Synthwave'),(1164623953,'Synthwave'),(1270478676,'Synthwave'),(1283916905,'Synthwave'),(1379074977,'Synthwave'),(1443215327,'Synthwave'),(1444211657,'Synthwave'),(1511586169,'Synthwave'),(1545336872,'Synthwave'),(1566437883,'Synthwave'),(1897217881,'Synthwave'),(2002289372,'Synthwave'),(2059088398,'Synthwave'),(2100363326,'Synthwave');
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
INSERT INTO `tags` VALUES ('Dubstep'),('Electronic'),('Funk'),('Future House'),('Hiphop'),('Lofi'),('Rap'),('Synthwave');
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

-- Dump completed on 2022-12-08 20:28:22
