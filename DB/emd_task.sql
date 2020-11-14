-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: emd
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `task` (
  `task_id` int NOT NULL AUTO_INCREMENT,
  `task_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `task_description` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `deadline` date NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `event_id` varchar(10) NOT NULL,
  `staff_id` varchar(10) NOT NULL,
  `center_id` varchar(10) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_event_id_idx` (`event_id`),
  KEY `fk_task_center_id_idx` (`center_id`),
  CONSTRAINT `fk_event_id_task` FOREIGN KEY (`event_id`) REFERENCES `emd_event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Set up place',NULL,'2020-10-05','Done','EVENT01','NV01, NV03','KDTQT'),(2,'Set up sound',NULL,'2020-12-05','In Process','EVENT02','NV02, NV04','KDL'),(3,'Set up sound',NULL,'2020-10-05','Fail','EVENT03','NV01, NV03','KDTQT'),(4,'Set up everything',NULL,'2020-10-05','Done','EVENT01','NV01, NV03','KDTQT'),(10,'Set up place','03 Quang Trung','2020-10-05','Fail','EVENT02','NV02','KDL'),(11,'Set up background','','2020-10-05','Done','EVENT02','NV04','KDL'),(12,'Set up speaker','','2020-10-05','In Process','EVENT02','NV02, NV04','KDL'),(13,'Set up background','','2020-11-05','In Process','EVENT01','NV05','KDTQT'),(14,'Set up sound','','2020-11-05','In Process','EVENT01','NV01','KDTQT'),(15,'Set up place',NULL,'2020-11-18','In Process','EVENT03','NV01, NV03','KDTQT'),(16,'Set up background','','2020-11-08','In Process','EVENT03','NV05','KDTQT');
/*!40000 ALTER TABLE `task` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-09 15:41:17
