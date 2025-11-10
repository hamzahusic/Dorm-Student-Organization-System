-- MySQL dump 10.13  Distrib 9.4.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: unidorms
-- ------------------------------------------------------
-- Server version	9.4.0

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
-- Table structure for table `announcements`
--

DROP DATABASE IF EXISTS unidorms;
CREATE DATABASE unidorms;

USE unidorms;

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `announcements_users_FK` (`user_id`),
  CONSTRAINT `announcements_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,'Welcome to Student Dormitory 2024/2025','Dear students, welcome to the new academic year! We are excited to have you with us. Please make sure to familiarize yourself with the dormitory rules and regulations. The welcome orientation will be held on October 28th at 6 PM in the main hall. Attendance is mandatory for all new residents.',1,'2025-10-24 23:40:58','https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500'),(2,'Internet Maintenance Schedule','Please be advised that scheduled maintenance will be performed on the dormitory internet network on Saturday, October 26th from 2 AM to 6 AM. During this time, internet services will be unavailable. We apologize for any inconvenience this may cause. If you have any urgent matters, please plan accordingly.',1,'2025-10-24 23:40:58','https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL DEFAULT (curdate()),
  `type` enum('breakfast','lunch','dinner') NOT NULL DEFAULT 'dinner',
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
INSERT INTO `meals` VALUES (1,'2025-11-04','breakfast','Continental Breakfast','Fresh bread, butter, jam, cheese, ham, boiled eggs, yogurt, orange juice, coffee and tea','2025-10-24 23:40:58'),(2,'2025-11-04','lunch','Chicken Schnitzel with Mashed Potatoes','Breaded chicken cutlet served with creamy mashed potatoes, fresh salad, and tartar sauce','2025-10-24 23:40:58'),(3,'2025-11-04','dinner','Beef Goulash with Rice','Traditional slow-cooked beef stew with peppers and onions, served with white rice and cucumber salad','2025-10-24 23:40:58'),(4,'2025-11-05','breakfast','American Breakfast','Scrambled eggs, bacon, sausages, baked beans, toast, butter, fresh fruit, orange juice, coffee and tea','2025-10-24 23:40:58'),(5,'2025-11-05','lunch','Grilled Fish with Vegetables','Grilled sea bass fillet with roasted seasonal vegetables, lemon wedge, and herb butter','2025-10-24 23:40:58'),(6,'2025-11-05','dinner','Pasta Bolognese','Spaghetti with homemade meat sauce, parmesan cheese, and garlic bread on the side','2025-10-24 23:40:58'),(8,'2025-11-08','dinner','Chicken with potatos','Chicken with potatos and dessert','2025-11-08 16:32:47');
/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('pending','in_progress','resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `requests_users_FK` (`user_id`),
  CONSTRAINT `requests_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (1,2,'Broken Window in Room 101','The window in my room does not close properly. There is a draft coming through and it gets very cold at night. Could someone please come and fix it as soon as possible?','resolved','2025-10-24 23:40:58'),(2,2,'Heating Not Working','The radiator in room 115 is not heating up. I have tried adjusting the valve but nothing happens. The room temperature is very low. Please send maintenance to check it.','in_progress','2025-10-24 23:40:58'),(3,2,'Leaking Faucet in Bathroom','The bathroom sink faucet has been dripping constantly. It is wasting water and making noise at night. Can this be repaired?','resolved','2025-10-24 23:40:58'),(4,1,'Urgent window fix','Broken window in room 101','in_progress','2025-11-06 11:52:58');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `capacity` int unsigned NOT NULL,
  `floor` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=204 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (110,3,1,'2025-10-24 23:40:58'),(115,2,1,'2025-10-24 23:40:58'),(202,3,2,'2025-10-24 23:40:58');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_meals`
--

DROP TABLE IF EXISTS `user_meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_meals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned DEFAULT NULL,
  `meal_id` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_meals_users_FK` (`user_id`),
  KEY `user_meals_meals_FK` (`meal_id`),
  CONSTRAINT `user_meals_meals_FK` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_meals_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_meals`
--

LOCK TABLES `user_meals` WRITE;
/*!40000 ALTER TABLE `user_meals` DISABLE KEYS */;
INSERT INTO `user_meals` VALUES (1,2,1,'2025-11-04 21:52:07'),(2,2,2,'2025-11-04 21:52:07'),(3,2,3,'2025-11-04 21:52:07'),(4,2,4,'2025-11-04 21:52:07'),(5,2,5,'2025-11-04 21:52:07'),(6,2,6,'2025-11-04 21:52:07'),(18,2,8,'2025-11-08 17:05:09');
/*!40000 ALTER TABLE `user_meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(254) NOT NULL,
  `role` enum('student','admin') NOT NULL DEFAULT 'student',
  `room_id` int unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `faculty` varchar(200) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `phone` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_rooms_FK` (`room_id`),
  CONSTRAINT `users_rooms_FK` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'John','Anderson','admin@university.edu','1231231','admin',NULL,'2025-10-24 23:40:58',1,NULL,NULL,'+387-61-123-4567'),(2,'Amina','Ković','amina.kovic@student.edu','213123131','student',115,'2025-10-24 23:40:58',1,'Faculty of Engineering',2,'+387-62-234-5678'),(4,'Sara','Begić','sara.begic@student.edu','12312312312312312','student',110,'2025-10-24 23:40:58',1,'Faculty of Medicine',1,'+387-64-456-7890'),(5,'Nedim','Ramić','nedim.ramic@student.edu','213123123123','student',110,'2025-10-24 23:40:58',1,'Faculty of Law',4,'+387-65-567-8901');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'unidorms'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-08 17:08:06
