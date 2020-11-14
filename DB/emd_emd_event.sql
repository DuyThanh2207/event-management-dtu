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
-- Table structure for table `emd_event`
--

DROP TABLE IF EXISTS `emd_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emd_event` (
  `event_id` varchar(10) NOT NULL,
  `event_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_place` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_date` datetime NOT NULL,
  `event_duration` int NOT NULL,
  `event_description` varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `center_id` varchar(10) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `fk_center_id_idx` (`center_id`),
  CONSTRAINT `fk_center_id` FOREIGN KEY (`center_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emd_event`
--

LOCK TABLES `emd_event` WRITE;
/*!40000 ALTER TABLE `emd_event` DISABLE KEYS */;
INSERT INTO `emd_event` VALUES ('EVENT01','Chương trình Giao lưu văn hóa','03 Quang Trung','2020-10-05 09:00:00',3,'','KDTQT'),('EVENT02','Trao thưởng','03 Quang Trung','2020-10-11 09:00:00',3,NULL,'KDL'),('EVENT03','Khai giảng','Hòa Khánh Nam','2020-10-15 09:00:00',5,NULL,'KDTQT'),('EVENT04','Tuyển Intern','Hòa Khánh Nam','2020-12-05 09:00:00',5,NULL,'KDTQT');
/*!40000 ALTER TABLE `emd_event` ENABLE KEYS */;
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
