-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: board_db
-- ------------------------------------------------------
-- Server version	8.0.40

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
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `post_id` int NOT NULL,
  `user_id` varchar(20) COLLATE utf8mb3_bin NOT NULL,
  `parent_id` int DEFAULT NULL,
  `content` text COLLATE utf8mb3_bin NOT NULL,
  `depth` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `post_id` (`post_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`parent_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (1,1,'kim221',NULL,'좋은 글 감사합니다.',0,'2025-01-23 16:15:36'),(2,1,'asdas99',NULL,'이거 맞나여?',0,'2025-01-23 16:16:24'),(3,1,'sadad',1,'댓글 테스트3048756',1,'2025-01-23 16:17:34'),(4,1,'s23423',2,'맞음ㅇㅇㅇ',1,'2025-01-23 16:17:37'),(5,1,'sdkldc2',3,'댓글 sdafsa',2,'2025-01-23 16:18:20'),(8,2,'asd87',NULL,'ㅇㄹㄴㄹㄴㄹㄴㅇ',0,'2025-02-03 17:36:20'),(9,2,'3424',NULL,'asdfasdf',0,'2025-02-03 17:39:20'),(10,2,'zxcvxzcv',NULL,'adfsadfasdfasdf',0,'2025-02-03 17:40:05'),(11,2,'231423',NULL,'sfrksdhflkjsadhf',0,'2025-02-03 17:41:38'),(12,2,'dfsdf',NULL,'asdfasdfsadfsadfsdf',0,'2025-02-03 17:42:29'),(14,3,'수정테435534543',NULL,'4354534534',0,'2025-02-04 09:50:46'),(18,2,'dsf',8,'sdfsdktesttest',1,'2025-02-04 11:24:50'),(19,2,'test1',9,'test11gdssdf',1,'2025-02-04 11:25:29'),(20,2,'test2',19,'ㅏㅓ로니아ㅓ뢰ㅏㄴ',2,'2025-02-04 11:30:55'),(23,2,'test5',19,'lksjadhflk',2,'2025-02-04 13:29:11'),(24,2,'3424',8,'ㅁㄴㅇㄹ',1,'2025-02-04 13:36:51'),(25,2,'test6',24,'lkdjsfhl',2,'2025-02-04 13:40:30'),(29,3,'테스트',NULL,'니마어타처퇴',0,'2025-02-04 14:35:37'),(34,4,'수정ㅇㄴㄹㄴ',NULL,'수정니ㅏㅓㅇ롷',0,'2025-02-04 17:21:41'),(35,8,'ssssa',NULL,'ssssss',0,'2025-02-04 17:26:49'),(37,8,'dddd',35,'ddddd',1,'2025-02-04 17:26:59'),(38,8,'ddd',37,'ddddd',2,'2025-02-04 17:27:04'),(41,2,'ㅇ',12,'ㅇㅇㅇㅇ',1,'2025-02-04 17:43:30'),(50,1,'테스트',1,'테스트',1,'2025-02-07 14:20:25');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-10  9:40:48
