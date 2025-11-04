<?php
require 'vendor/autoload.php'; //run autoloader

require_once __DIR__ . '/rest/services/MealService.php';
require_once __DIR__ . '/rest/services/UserService.php';

Flight::register('mealService', 'MealService');
Flight::register('userService', 'UserService');

Flight::route('/', function(){  //define route and define function to handle request
   echo 'Hello world!';
});

require_once __DIR__ . '/rest/routes/MealRoutes.php';
require_once __DIR__ . '/rest/routes/UserRoutes.php';

Flight::start();  //start FlightPHP
?>
