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
  `account_id` varchar(10) NOT NULL,
  `account_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `account_username` varchar(45) NOT NULL,
  `account_password` varchar(15) NOT NULL,
  `account_email` varchar(45) NOT NULL,
  `account_role` varchar(45) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('ABC','Thanh Duy Tran','admin1','admin','td.thanh2207@gmail.com','DTU Event Staff'),('ABC123','Thanh Duy Tran','admin123','admin','td.thanh221107@gmail.com','DTU Event Staff'),('ADMIN','Admin','admin','admin','admin@gmail.com','Admin'),('KDL','Khoa Du Lịch','khoadulich','123456','khoadulich@gmail.com','DTU Event Center'),('KDTQT','Khoa Đào tạo Quốc tế','kdtqt','123456','kdtqt@gmail.com','DTU Event Center'),('NV01','Nguyễn Văn A','nguyenvana','123456','nguyenvana@gmail.com','DTU Event Staff'),('NV02','Nguyễn Văn B','nguyenvanb','123456','nguyenvanb@gmail.com','DTU Event Staff'),('NV03','Phạm Văn C','phamvanc','123456','phamvanc@gmail.com','DTU Event Staff'),('NV04','Bùi Phương D','buiphuongd','123456','buiphuongd@gmail.com','DTU Event Staff'),('NV05','Phạm Đăng E','phamdange','123456','phamdange@gmail.com','DTU Event Staff'),('NV06','Phạm Băng F','phambangf','123456','phambangf@gmail.com','DTU Event Staff');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
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
