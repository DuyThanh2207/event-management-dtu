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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_username` varchar(45) NOT NULL,
  `account_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `account_password` char(60) NOT NULL,
  `account_email` varchar(45) NOT NULL,
  `account_role` varchar(45) NOT NULL,
  `account_color` varchar(7) DEFAULT NULL,
  `is_admin` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`account_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('admin','Trường Đại học Duy Tân','123456','duytan@gmail.com','Admin','','true'),('admin1','Dinh','1234','dinh@gmail.com','Admin','','true'),('admin2','Nguyễn Văn B','123456','admin2@gmail.com','Admin','','true'),('buiphuongd','Bùi Phương D','123456','buiphuongd@gmail.com','DTU Event Staff','',NULL),('buivant','Bùi Văn T','123456','buivant@gmail.com','DTU Event Staff','',NULL),('kdtqt','Khoa Đào tạo Quốc tế','123456','kdtqt@gmail.com','DTU Event Center','#40bcbf',NULL),('khoadulich','Khoa Du Lịch','123456','khoadulich@gmail.com','DTU Event Center','#bf5540',NULL),('khoaketoan','Khoa Kế Toán','123456','khoaketoan@gmail.com','DTU Event Center','#bfbd40','true'),('khoakinhte','Khoa Kinh Tế','123456','khoakinhte@gmail.com','DTU Event Center','#000000',NULL),('khoangoaingu','Khoa Ngoại Ngữ','123456','khoangoaingu@gmail.com','DTU Event Center','#4d193c',NULL),('nguyenvana','Nguyễn Văn A','123456','nguyenvana@gmail.com','DTU Event Staff','',NULL),('nguyenvanb','Nguyễn Văn B','123456','nguyenvanb@gmail.com','DTU Event Staff','',NULL),('phambangf','Phạm Băng F','123456','phambangf@gmail.com','DTU Event Staff','',NULL),('phamdange','Phạm Đăng E','123456','phamdange@gmail.com','DTU Event Staff','',NULL),('phamvanc','Phạm Văn C','123456','phamvanc@gmail.com','DTU Event Staff','',NULL),('test','test','wziz9d','emdeventtest@yopmail.com','Blocked',NULL,NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assignment`
--

DROP TABLE IF EXISTS `assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assignment` (
  `staff_id` varchar(45) NOT NULL,
  `center_id` varchar(45) NOT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `fk_assignment_center_username_idx` (`center_id`),
  CONSTRAINT `fk_assignment_center_username` FOREIGN KEY (`center_id`) REFERENCES `account` (`account_username`),
  CONSTRAINT `fk_assignment_staff_username` FOREIGN KEY (`staff_id`) REFERENCES `account` (`account_username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assignment`
--

LOCK TABLES `assignment` WRITE;
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` VALUES ('buiphuongd','kdtqt'),('phambangf','kdtqt'),('phamdange','kdtqt'),('buivant','khoadulich'),('nguyenvana','khoadulich'),('nguyenvanb','khoadulich'),('phamvanc','khoadulich');
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `emd_event`
--

DROP TABLE IF EXISTS `emd_event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emd_event` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_place` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_date` datetime NOT NULL,
  `event_duration` int NOT NULL,
  `event_description` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `center_username` varchar(45) NOT NULL,
  PRIMARY KEY (`event_id`),
  KEY `fk_event_center_username_idx` (`center_username`),
  CONSTRAINT `fk_event_center_username` FOREIGN KEY (`center_username`) REFERENCES `account` (`account_username`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emd_event`
--

LOCK TABLES `emd_event` WRITE;
/*!40000 ALTER TABLE `emd_event` DISABLE KEYS */;
INSERT INTO `emd_event` VALUES (1,'Chương trình Giao lưu văn hóa','03 Quang Trung','2020-10-05 09:00:00',3,'','kdtqt'),(3,'Khai giảng','Hòa Khánh Nam','2020-10-15 09:00:00',5,NULL,'kdtqt'),(4,'Tuyển Intern','Hòa Khánh Nam','2020-12-05 08:00:00',6,'Đợt tuyển Intern mùa đông','kdtqt'),(17,'Capstone 1','209 Phan Thanh','2020-11-26 14:00:00',3,'','kdtqt'),(18,'Chào đón tân sinh viên','Hòa Khánh Nam','2020-12-10 08:00:00',30,'','khoangoaingu'),(19,'Chào đón tân sinh viên 2021','Hòa Khánh Nam','2020-12-10 08:00:00',8,'','khoangoaingu'),(20,'Trao đổi sinh viên','209 Phan Thanh','2020-12-05 08:00:00',5,'','khoadulich'),(21,'Họp Capstone 1','Hanana','2020-12-09 14:00:00',3,'','khoadulich'),(22,'Họp mentor','Thư viện Quang Trung','2020-12-11 14:00:00',5,'','khoakinhte'),(24,'Nộp capstone','254 Nguyễn Văn Linh','2020-12-15 08:00:00',5,'','khoaketoan'),(25,'Nộp báo cáo capstone 1','Văn Phòng Khoa','2020-12-15 08:00:00',5,'','khoangoaingu');
/*!40000 ALTER TABLE `emd_event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_attendees`
--

DROP TABLE IF EXISTS `event_attendees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_attendees` (
  `event_attendees_id` int NOT NULL AUTO_INCREMENT,
  `event_attendees_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_attendees_email` varchar(45) NOT NULL,
  `event_attendees_eventname` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `event_attendees_feedback` text NOT NULL,
  `event_attendees_rate` varchar(45) NOT NULL,
  PRIMARY KEY (`event_attendees_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_attendees`
--

LOCK TABLES `event_attendees` WRITE;
/*!40000 ALTER TABLE `event_attendees` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_attendees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_show`
--

DROP TABLE IF EXISTS `event_show`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_show` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `show_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `show_description` text,
  `show_start_time` datetime NOT NULL,
  `show_finish_time` datetime NOT NULL,
  `show_speaker` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_id_show_idx` (`event_id`),
  CONSTRAINT `fk_event_id_show` FOREIGN KEY (`event_id`) REFERENCES `emd_event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_show`
--

LOCK TABLES `event_show` WRITE;
/*!40000 ALTER TABLE `event_show` DISABLE KEYS */;
INSERT INTO `event_show` VALUES (8,4,'Tiếp khách','Đón đoàn đại biểu','2020-12-05 08:00:00','2020-12-05 08:30:00',NULL),(9,4,'Văn nghệ','Biểu diễn văn nghệ','2020-12-05 09:00:00','2020-12-05 10:00:00','Vũ đoàn ABC'),(11,1,'Văn nghệ','Biểu diễn văn nghệ','2020-10-05 09:00:00','2020-10-05 10:00:00',NULL),(12,3,'Văn nghệ','Biểu diễn văn nghệ','2020-10-15 09:00:00','2020-10-15 10:00:00',NULL),(13,17,'Văn nghệ','Biểu diễn văn nghệ','2020-11-26 15:00:00','2020-11-26 15:30:00',NULL),(14,18,'Đón khách',NULL,'2020-12-10 08:00:00','2020-12-10 08:30:00',NULL),(15,18,'Văn nghệ',NULL,'2020-12-10 09:00:00','2020-12-10 10:00:00',NULL),(16,19,'Chào đón khách mời','','2020-12-10 08:00:00','2020-12-10 08:30:00',''),(17,19,'Tiết mục văn nghệ','','2020-12-10 09:00:00','2020-12-10 10:00:00','Vũ đoàn Bước nhảy'),(18,25,'Tiếp khách','','2020-12-15 09:15:00','2020-12-15 09:30:00','');
/*!40000 ALTER TABLE `event_show` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `finance`
--

DROP TABLE IF EXISTS `finance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `finance_name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `finance_description` text,
  `finance_time` date NOT NULL,
  `finance_spending` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_event_id_finance_idx` (`event_id`),
  CONSTRAINT `fk_event_id_finance` FOREIGN KEY (`event_id`) REFERENCES `emd_event` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finance`
--

LOCK TABLES `finance` WRITE;
/*!40000 ALTER TABLE `finance` DISABLE KEYS */;
INSERT INTO `finance` VALUES (7,1,'Bán vé',NULL,'2020-10-05',1000000),(8,3,'Thuê đạo cụ',NULL,'2020-10-15',-2000000),(9,4,'Dựng sân khấu',NULL,'2020-12-05',-1000000),(14,18,'Thuê bàn ghế','','2020-12-08',-500000),(15,18,'Bán nước',NULL,'2020-12-10',1000000),(16,18,'Phát mũ','','2020-12-10',0),(17,19,'Bán vé','','2020-12-10',2000000),(18,19,'Mua nước','Mua nước cho khách mời','2020-12-10',500000),(19,19,'Bán đồ lưu niệm','Bán đồ lưu niệm cho các bạn sinh viên tham gia sự kiện','2020-12-10',1500000),(20,25,'Mua nước cho giám khảo','','2020-12-15',-500000);
/*!40000 ALTER TABLE `finance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report`
--

DROP TABLE IF EXISTS `report`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `task_id` int NOT NULL,
  `report_detail` text NOT NULL,
  `report_handle` varchar(6) DEFAULT NULL,
  `report_time` datetime NOT NULL,
  `annunciator` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_report_event_id_idx` (`event_id`),
  KEY `fk_report_task_id_idx` (`task_id`),
  KEY `fk_report_annunciator_idx` (`annunciator`),
  CONSTRAINT `fk_report_annunciator` FOREIGN KEY (`annunciator`) REFERENCES `assignment` (`staff_id`),
  CONSTRAINT `fk_report_event_id` FOREIGN KEY (`event_id`) REFERENCES `emd_event` (`event_id`),
  CONSTRAINT `fk_report_task_id` FOREIGN KEY (`task_id`) REFERENCES `task` (`task_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report`
--

LOCK TABLES `report` WRITE;
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT INTO `report` VALUES (2,21,35,'Giá cả hơi cao','Solved','2020-12-09 00:40:00','nguyenvana'),(3,21,34,'Chưa có địa điểm cho thuê',NULL,'2020-12-09 00:43:00','nguyenvana');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;
UNLOCK TABLES;

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
  `start_date` date NOT NULL,
  `deadline` date NOT NULL,
  `status` varchar(45) NOT NULL,
  `event_id` int NOT NULL,
  `staff_id` text,
  `center_id` varchar(45) NOT NULL,
  PRIMARY KEY (`task_id`),
  KEY `fk_event_id_task_idx` (`event_id`) /*!80000 INVISIBLE */,
  KEY `fk_task_center_username_idx` (`center_id`),
  CONSTRAINT `fk_event_id_task` FOREIGN KEY (`event_id`) REFERENCES `emd_event` (`event_id`),
  CONSTRAINT `fk_task_center_username` FOREIGN KEY (`center_id`) REFERENCES `account` (`account_username`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `task`
--

LOCK TABLES `task` WRITE;
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` VALUES (1,'Set up place',NULL,'2020-10-01','2020-10-05','Fail',1,'buiphuongd, phambangf','kdtqt'),(3,'Set up sound',NULL,'2020-10-01','2020-10-05','Fail',3,'buiphuongd, phambangf','kdtqt'),(4,'Set up everything',NULL,'2020-10-01','2020-10-05','Done',1,'buiphuongd, phambangf','kdtqt'),(17,'Invite Guest','','2020-11-05','2020-11-17','Fail',3,'phamdange','kdtqt'),(18,'Set up background','','2020-11-05','2020-11-15','Fail',1,'phamdange','kdtqt'),(23,'Set up sound',NULL,'2020-11-26','2020-12-04','Fail',4,'buiphuongd, phambangf','kdtqt'),(24,'Set up background',NULL,'2020-11-27','2020-12-03','Fail',4,'phambangf, phamdange','kdtqt'),(25,'Invite Guest',NULL,'2020-11-27','2020-12-03','Fail',4,'buiphuongd','kdtqt'),(27,'Set up place','209 Phan Thanh','2020-11-27','2020-11-30','Fail',4,'phamdange','kdtqt'),(31,'Chuẩn bị ánh sáng','Công Ty Tổ Chức Sự Kiện Sea Event','2020-12-04','2020-12-05','Done',20,'nguyenvana','khoadulich'),(32,'Chuẩn bị âm thanh','Công Ty Tổ Chức Sự Kiện Sea Event','2020-12-04','2020-12-05','Done',20,'nguyenvana','khoadulich'),(34,'Tìm chỗ ngồi','    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum, delectus aliquam. Voluptatum unde aperiam reprehenderit explicabo dignissimos, beatae voluptas architecto repudiandae, recusandae, officiis harum rerum aspernatur corporis vel ex vitae?','2020-12-07','2020-12-09','Done',21,'buivant, nguyenvana','khoadulich'),(35,'Set up âm thanh','','2020-12-08','2020-12-09','Fail',21,'nguyenvana, phamvanc','khoadulich');
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

-- Dump completed on 2020-12-13 23:28:43
