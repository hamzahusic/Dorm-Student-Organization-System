<?php
require 'vendor/autoload.php'; //run autoloader

require_once __DIR__ . '/rest/services/MealService.php';
Flight::register('mealService', 'MealService');

Flight::route('/', function(){  //define route and define function to handle request
   echo 'Hello world!';
});

require_once __DIR__ . '/rest/routes/MealRoutes.php';

Flight::start();  //start FlightPHP
?>
