-- MySQL dump 10.13  Distrib 8.0.31, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: tourmaline
-- ------------------------------------------------------
-- Server version	8.0.31-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
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
INSERT INTO `playlist` VALUES (1975350824,'anhquan7826','my playlist',NULL);
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
INSERT INTO `song` VALUES (144930306,'2022-11-30 23:17:05','anhquan7826','Magical Candy','144930306.jpg','','','','144930306.mp3'),(346643694,'2022-11-30 23:17:04','anhquan7826','Dance Down','346643694.jpg','','','','346643694.mp3'),(349288679,'2022-11-30 23:17:05','anhquan7826','Night Tempo - Yukiko','349288679.jpg','','','','349288679.mp3'),(385237912,'2022-11-30 23:17:05','anhquan7826','Greyl - Planetarium','385237912.jpg','','','','385237912.mp3'),(505261946,'2022-11-30 23:17:06','anhquan7826','【﻿ｆａｎｔａｓｙ】 MEIKO NAKAHARA (1982)','505261946.jpg','','','','505261946.mp3'),(565477168,'2022-11-30 23:17:06','anhquan7826','悲しみFOREVER [失恋Rhapsody] EP','565477168.jpg','','','','565477168.mp3'),(929863895,'2022-11-30 23:17:06','anhquan7826','Yasuha - Flyday Chinatown (Night Tempo Edit)','929863895.jpg','','','','929863895.mp3'),(988715273,'2022-11-30 23:17:05','anhquan7826','HD - Ramen 5670NINE','988715273.jpg','','','','988715273.mp3'),(992226217,'2022-11-30 23:17:05','anhquan7826','SUPER RISER!','992226217.jpg','','','','992226217.mp3'),(1263927684,'2022-11-30 23:17:05','anhquan7826','October 3 Project','1263927684.jpg','','','','1263927684.mp3'),(1275941856,'2022-11-30 23:17:06','anhquan7826','時空 Rendez-Vous','1275941856.jpg','','','','1275941856.mp3'),(1302122541,'2022-11-30 23:17:04','anhquan7826','Android52 - Real Love','1302122541.jpg','','','','1302122541.mp3'),(1305740319,'2022-11-30 23:17:06','anhquan7826','ミカヅキBIGWAVE - シャボンのシャンプー','1305740319.jpg','','','','1305740319.mp3'),(1323228764,'2022-11-30 23:17:05','anhquan7826','S U B W A Y S - アイスクリーム','1323228764.jpg','','','','1323228764.mp3'),(1331674615,'2022-11-30 23:17:04','anhquan7826','Android52 - Romance','1331674615.jpg','','','','1331674615.mp3'),(1420621256,'2022-11-30 23:17:06','anhquan7826','heaven beach','1420621256.jpg','','','','1420621256.mp3'),(1421402119,'2022-11-30 23:17:05','anhquan7826','Payᵖᵃʸ','1421402119.jpg','','','','1421402119.mp3'),(1578902249,'2022-11-30 23:17:05','anhquan7826','She Is...','1578902249.jpg','','','','1578902249.mp3'),(1631183107,'2022-11-30 23:17:04','anhquan7826','First Season','1631183107.jpg','','','','1631183107.mp3'),(1664822041,'2022-11-30 23:17:06','anhquan7826','To You','1664822041.jpg','','','','1664822041.mp3'),(1696527422,'2022-11-30 23:17:05','anhquan7826','In Love With You','1696527422.jpg','','','','1696527422.mp3'),(1720979461,'2022-11-30 23:17:06','anhquan7826','夢の続き ~ Dreams Of Light ~','1720979461.jpg','','','','1720979461.mp3'),(1811741842,'2022-11-30 23:17:05','anhquan7826','TELL ME TELL ME','1811741842.jpg','','','','1811741842.mp3'),(1847161374,'2022-11-30 23:17:05','anhquan7826','SUI UZI - Midnight Sailor','1847161374.jpg','','','','1847161374.mp3'),(1925922370,'2022-11-30 23:17:04','anhquan7826','Borderless','1925922370.jpg','','','','1925922370.mp3'),(1942041696,'2022-11-30 23:17:06','anhquan7826','夢のDancing','1942041696.jpg','','','','1942041696.mp3'),(1980301390,'2022-11-30 23:17:06','anhquan7826','luv.ly & eiiwun - summer magic','1980301390.jpg','','','','1980301390.mp3'),(2101619215,'2022-11-30 23:17:04','anhquan7826','Future Rhapsody [失恋Rhapsody] EP','2101619215.jpg','','','','2101619215.mp3'),(2113671589,'2022-11-30 23:17:05','anhquan7826','SUI UZI - City Night Shadows','2113671589.jpg','','','','2113671589.mp3'),(2146263885,'2022-11-30 23:17:05','anhquan7826','LISA','2146263885.jpg','','','','2146263885.mp3');
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
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

-- Dump completed on 2022-11-30 23:21:58
