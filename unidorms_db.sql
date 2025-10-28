DROP DATABASE IF EXISTS unidorms;

CREATE DATABASE unidorms;
USE unidorms;

DROP TABLE IF EXISTS `rooms`;

CREATE TABLE `rooms` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `capacity` int unsigned NOT NULL,
  `floor` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

INSERT INTO rooms (id,capacity, floor)
VALUES (115, 2, 1);

INSERT INTO rooms (id,capacity, floor)
VALUES (110, 3, 1);

INSERT INTO rooms (id,capacity, floor)
VALUES (202, 2, 2);

DROP TABLE IF EXISTS `users`;

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
  CONSTRAINT `users_rooms_FK` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`)
);


INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `role`, `room_id`, `faculty`, `year`, `phone`, `is_active`) 
VALUES ('John', 'Anderson', 'admin@university.edu', '1231231', 'admin', NULL, NULL, NULL, '+387-61-123-4567', 1);


INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `role`, `room_id`, `faculty`, `year`, `phone`, `is_active`) 
VALUES ('Amina', 'Ković', 'amina.kovic@student.edu', '213123131', 'student', 115, 'Faculty of Engineering', 2, '+387-62-234-5678', 1);


INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `role`, `room_id`, `faculty`, `year`, `phone`, `is_active`) 
VALUES ('Emir', 'Hadžić', 'emir.hadzic@student.edu', '123123123123', 'student', 115, 'Faculty of Economics', 3, '+387-63-345-6789', 1);


INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `role`, `room_id`, `faculty`, `year`, `phone`, `is_active`) 
VALUES ('Sara', 'Begić', 'sara.begic@student.edu', '12312312312312312', 'student', 110, 'Faculty of Medicine', 1, '+387-64-456-7890', 1);


INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `role`, `room_id`, `faculty`, `year`, `phone`, `is_active`) 
VALUES ('Nedim', 'Ramić', 'nedim.ramic@student.edu', '213123123123', 'student', 110, 'Faculty of Law', 4, '+387-65-567-8901', 1);




DROP TABLE IF EXISTS `announcements`;

CREATE TABLE `announcements` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` varchar(1000) NOT NULL,
  `user_id` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `thumbnail` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `announcements_users_FK` (`user_id`),
  CONSTRAINT `announcements_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

INSERT INTO `announcements` (`title`, `content`, `user_id`, `thumbnail`) 
VALUES ('Welcome to Student Dormitory 2024/2025', 'Dear students, welcome to the new academic year! We are excited to have you with us. Please make sure to familiarize yourself with the dormitory rules and regulations. The welcome orientation will be held on October 28th at 6 PM in the main hall. Attendance is mandatory for all new residents.', 1, 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500');

INSERT INTO `announcements` (`title`, `content`, `user_id`, `thumbnail`) 
VALUES ('Internet Maintenance Schedule', 'Please be advised that scheduled maintenance will be performed on the dormitory internet network on Saturday, October 26th from 2 AM to 6 AM. During this time, internet services will be unavailable. We apologize for any inconvenience this may cause. If you have any urgent matters, please plan accordingly.', 1, 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500');


DROP TABLE IF EXISTS `meals`;

CREATE TABLE `meals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL DEFAULT (curdate()),
  `type` enum('breakfast','lunch','dinner') NOT NULL DEFAULT 'dinner',
  `name` varchar(100) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);


INSERT INTO `meals` (`date`, `type`, `name`, `description`) 
VALUES ('2025-10-24', 'breakfast', 'Continental Breakfast', 'Fresh bread, butter, jam, cheese, ham, boiled eggs, yogurt, orange juice, coffee and tea');

INSERT INTO `meals` (`date`, `type`, `name`, `description`) 
VALUES ('2025-10-24', 'lunch', 'Chicken Schnitzel with Mashed Potatoes', 'Breaded chicken cutlet served with creamy mashed potatoes, fresh salad, and tartar sauce');

INSERT INTO `meals` (`date`, `type`, `name`, `description`) 
VALUES ('2025-10-24', 'dinner', 'Beef Goulash with Rice', 'Traditional slow-cooked beef stew with peppers and onions, served with white rice and cucumber salad');


INSERT INTO `meals` (`date`, `type`, `name`, `description`) 
VALUES ('2025-10-25', 'breakfast', 'American Breakfast', 'Scrambled eggs, bacon, sausages, baked beans, toast, butter, fresh fruit, orange juice, coffee and tea');

INSERT INTO `meals` (`date`, `type`, `name`, `description`) 
VALUES ('2025-10-25', 'lunch', 'Grilled Fish with Vegetables', 'Grilled sea bass fillet with roasted seasonal vegetables, lemon wedge, and herb butter');

INSERT INTO `meals` (`date`, `type`, `name`, `description`) 
VALUES ('2025-10-25', 'dinner', 'Pasta Bolognese', 'Spaghetti with homemade meat sauce, parmesan cheese, and garlic bread on the side');


DROP TABLE IF EXISTS `user_meals`;

CREATE TABLE `user_meals` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `meal_id` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_meals_users_FK` (`user_id`),
  KEY `user_meals_meals_FK` (`meal_id`),
  CONSTRAINT `user_meals_meals_FK` FOREIGN KEY (`meal_id`) REFERENCES `meals` (`id`),
  CONSTRAINT `user_meals_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);


INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (2, 1);
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (2, 2);
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (2, 3);
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (2, 4);
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (2, 5); 
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (2, 6); 

INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (3, 2);
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (3, 3);
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (3, 4); 
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (3, 5);
INSERT INTO `user_meals` (`user_id`, `meal_id`) VALUES (3, 6);


DROP TABLE IF EXISTS `requests`;

CREATE TABLE `requests` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` enum('pending','in_progress','resolved') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `requests_users_FK` (`user_id`),
  CONSTRAINT `requests_users_FK` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
);

INSERT INTO `requests` (`user_id`, `title`, `description`, `status`) 
VALUES (2, 'Broken Window in Room 101', 'The window in my room does not close properly. There is a draft coming through and it gets very cold at night. Could someone please come and fix it as soon as possible?', 'pending');

-- Request 2 - In Progress
INSERT INTO `requests` (`user_id`, `title`, `description`, `status`) 
VALUES (2, 'Heating Not Working', 'The radiator in room 115 is not heating up. I have tried adjusting the valve but nothing happens. The room temperature is very low. Please send maintenance to check it.', 'in_progress');

-- Request 3 - Resolved
INSERT INTO `requests` (`user_id`, `title`, `description`, `status`) 
VALUES (2, 'Leaking Faucet in Bathroom', 'The bathroom sink faucet has been dripping constantly. It is wasting water and making noise at night. Can this be repaired?', 'resolved');

