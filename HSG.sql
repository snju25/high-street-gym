-- MySQL dump 10.13  Distrib 8.0.34, for macos13 (arm64)
--
-- Host: localhost    Database: high-street-gym-2024
-- ------------------------------------------------------
-- Server version	8.3.0

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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(45) NOT NULL,
  `activity_description` varchar(400) NOT NULL,
  `activity_duration` varchar(45) NOT NULL,
  PRIMARY KEY (`activity_id`),
  UNIQUE KEY `activity_id_UNIQUE` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Yoga','A practice that combines physical postures, breathing techniques, and meditation for overall wellness.','60'),(2,'Pilates','A low-impact exercise that focuses on core strength, flexibility, and overall body conditioning.','60'),(3,'Abs','A targeted workout aimed at strengthening and toning the abdominal muscles.','45'),(4,'HIIT','A targeted workout aimed at strengthening and toning the abdominal muscles.','60'),(5,'Indoor cycling',' A group exercise class performed on stationary bikes, focusing on endurance, strength, and intervals.','60'),(6,'Boxing','A combat sport and fitness activity that involves punching, footwork, and overall body conditioning.','60'),(7,'Zumba','A dance fitness program that combines Latin and international music with dance moves for a fun and effective workout.','60');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_posts`
--

DROP TABLE IF EXISTS `blog_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `post_user_id` int NOT NULL,
  `post_title` varchar(100) NOT NULL,
  `post_content` varchar(5000) NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `blogPostUserId_idx` (`post_user_id`),
  CONSTRAINT `blogPostUserId` FOREIGN KEY (`post_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_posts`
--

LOCK TABLES `blog_posts` WRITE;
/*!40000 ALTER TABLE `blog_posts` DISABLE KEYS */;
INSERT INTO `blog_posts` VALUES (46,'2024-04-24 03:26:02',1,'First Blog Post','This is a test blog post'),(52,'2024-04-25 12:34:58',42,'asdas','asdasd');
/*!40000 ALTER TABLE `blog_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `booking_id` int NOT NULL AUTO_INCREMENT,
  `booking_user_id` int NOT NULL,
  `booking_class_id` int NOT NULL,
  `booking_date` date DEFAULT NULL,
  `booking_trainer_id` int NOT NULL,
  `booking_time` time NOT NULL,
  PRIMARY KEY (`booking_id`),
  KEY `blog_post_userID_idx` (`booking_user_id`),
  KEY `blog_post_classID_idx` (`booking_class_id`),
  KEY `booking_trainerID_idx` (`booking_trainer_id`),
  CONSTRAINT `booking_classID` FOREIGN KEY (`booking_class_id`) REFERENCES `classes` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_trainerID` FOREIGN KEY (`booking_trainer_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `booking_userID` FOREIGN KEY (`booking_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (50,44,20,'2024-04-22',1,'08:00:00'),(51,44,17,'2024-04-22',1,'08:00:00'),(52,44,14,'2024-05-15',1,'12:00:00'),(58,42,30,'2024-04-29',47,'08:00:00'),(59,42,27,'2024-04-26',1,'09:00:00'),(61,42,36,'2024-04-29',47,'09:00:00');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `class_id` int NOT NULL AUTO_INCREMENT,
  `class_datetime` time NOT NULL,
  `class_activity_id` int NOT NULL,
  `class_trainer_user_id` int NOT NULL,
  `class_room_number` varchar(45) DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`class_id`),
  KEY `class_trainerID_idx` (`class_trainer_user_id`),
  KEY `class_activityID_idx` (`class_activity_id`),
  CONSTRAINT `class_activityID` FOREIGN KEY (`class_activity_id`) REFERENCES `activities` (`activity_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `class_trainerID` FOREIGN KEY (`class_trainer_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2645 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'08:00:00',1,1,'1','2024-04-15'),(3,'08:00:00',2,47,'2','2024-04-15'),(4,'12:00:00',3,1,'2','2024-04-16'),(5,'04:00:00',4,1,'3','2024-04-16'),(6,'09:00:00',5,1,'1','2024-04-17'),(7,'12:00:00',7,47,'2','2024-04-17'),(9,'05:00:00',5,47,'2','2024-04-18'),(10,'09:00:00',4,1,'3','2024-04-18'),(13,'09:00:00',3,1,'1','2024-04-15'),(14,'12:00:00',2,1,'1','2024-05-15'),(15,'08:00:00',5,1,'2','2024-04-17'),(16,'09:00:00',1,1,'3','2024-04-17'),(17,'08:00:00',1,1,'2','2024-04-22'),(18,'09:00:00',2,1,'3','2024-05-12'),(19,'08:00:00',1,1,'3','2024-05-12'),(20,'08:00:00',1,47,'1','2024-04-22'),(21,'08:00:00',2,47,'2','2024-04-22'),(22,'12:00:00',3,1,'2','2024-04-23'),(23,'04:00:00',4,1,'3','2024-04-23'),(24,'09:00:00',5,1,'1','2024-04-24'),(25,'12:00:00',7,47,'2','2024-04-24'),(26,'05:00:00',5,47,'2','2024-04-25'),(27,'09:00:00',4,1,'3','2024-04-26'),(28,'09:00:00',3,1,'1','2024-04-27'),(29,'12:00:00',2,1,'1','2024-05-28'),(30,'08:00:00',5,1,'2','2024-04-28'),(31,'09:00:00',1,1,'3','2024-04-28'),(32,'08:00:00',1,1,'2','2024-04-29'),(33,'09:00:00',2,1,'3','2024-05-22'),(34,'08:00:00',1,1,'3','2024-05-30'),(35,'08:00:00',1,47,'1','2024-04-29'),(36,'09:00:00',1,47,'2','2024-04-29'),(37,'12:00:00',3,1,'2','2024-05-01'),(38,'04:00:00',4,1,'3','2024-05-01'),(39,'09:00:00',5,1,'1','2024-05-02'),(40,'12:00:00',7,47,'2','2024-05-03'),(42,'09:00:00',4,1,'3','2024-05-05'),(43,'09:00:00',3,1,'1','2024-05-05'),(44,'12:00:00',2,1,'1','2024-05-06'),(45,'08:00:00',5,1,'2','2024-05-06'),(46,'09:00:00',1,1,'3','2024-05-07'),(47,'08:00:00',1,1,'2','2024-05-08'),(48,'09:00:00',2,1,'3','2024-05-09'),(49,'08:00:00',1,1,'3','2024-05-10'),(50,'08:00:00',1,1,'3','2024-06-01'),(2644,'09:00:00',2,1,'3','2024-06-01');
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `user_password` varchar(200) NOT NULL,
  `user_role` varchar(45) NOT NULL,
  `user_phone` varchar(45) NOT NULL,
  `user_firstName` varchar(45) NOT NULL,
  `user_lastName` varchar(45) NOT NULL,
  `user_address` varchar(45) DEFAULT NULL,
  `authenticationKey` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_email_UNIQUE` (`user_email`),
  UNIQUE KEY `authenticationKey_UNIQUE` (`authenticationKey`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin@gmail.com','$2a$10$HGftA.tPA3Ag/PHA8Ut6su1z9uwU8vLWN3Ds1KP8Q1k0rE9x/iRbK','manager','0406129090','Trainer','One','2 Parker Place',NULL),(42,'member21@gmail.com','$2a$10$JE6P2wnDrJm2nXPyjBwxuOADHUvEcrUN5chEL6g9QpBHzXwwPDw0a','member','0406910209','Sanjay','Bhandaria','2 newrton Place',NULL),(44,'trainer3@gmail.com','$2a$10$nVvcE.XGyGHQtzs4U3kBAO8STCsFGo4kx6.ihau1E8yykdfZiH7tu','trainer','0409087909','Sanjay','Bhandari','2 parker place',NULL),(47,'trainer2@gmail.com','$2a$10$O0wwXw3rXjK8oZTpwL1CLeY7fbQ6gE0q1hV9DKXKX9ZEcDQmuOxJW','trainer','0408879098','Trainer','Second','2 parer place',NULL),(48,'test2@gmail.com','$2a$10$kAMeg1WDePCdxHeAVKyjterp1Upzge/ZeB/A/mF48PIbGm1xoj.Gy','member','1234','1234','1234','1234',NULL),(49,'test1@gmail.com','$2a$10$NbuX7DaUQ6Ewvgnimv7rkuTxzPlh4qz9hT27Bh2sGSilY2t4rq6Be','member','1234','1234','1234','1234',NULL),(50,'trainer4@gmail.com','$2a$10$NXOTNTVnFA&#x2F;UndM9w9DTpeCYq1fkDV4MVR1hpVIgrcvp8FxPZmXBa','member','0409809809','Trainer','Four','2 par nplace',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-26 13:00:58
