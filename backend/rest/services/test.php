<?php

require_once __DIR__ . '/UserService.php';
require_once __DIR__ . '/RoomService.php';
require_once __DIR__ . '/RequestService.php';
require_once __DIR__ . '/MealService.php';
require_once __DIR__ . '/AnnouncementService.php';

$users = new UserService();
$room = new RoomService();
$request = new RequestService();
$meal = new MealService();
$announcement = new AnnouncementService();

print_r($users->get_students_per_year());
print_r($room->get_room_information(115));
print_r($request->get_all_request());
print_r($meal->get_taken_meals_per_day());
print_r($announcement->get_all_announcements());
?>