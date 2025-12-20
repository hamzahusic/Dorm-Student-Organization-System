<?php

// CORS Configuration - MUST BE FIRST
$allowedOrigin = isset($_ENV['FRONTEND_URL']) && trim($_ENV['FRONTEND_URL']) != "" 
    ? $_ENV['FRONTEND_URL'] 
    : 'http://localhost/Dorm-Student-Organization-System/frontend';

// Set CORS headers for ALL requests
header("Access-Control-Allow-Origin: " . $allowedOrigin);
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 86400");
header("Access-Control-Allow-Headers: content-type, Content-Type, Authorization, Authentication, Accept, Origin");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Handle OPTIONS preflight - respond and exit immediately
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Content-Length: 0");
    header("Content-Type: text/plain");
    http_response_code(204);
    exit(0);
}

require 'vendor/autoload.php'; //run autoloader

require_once __DIR__ . '/rest/services/MealService.php';
require_once __DIR__ . '/rest/services/UserService.php';
require_once __DIR__ . '/rest/services/RoomService.php';
require_once __DIR__ . '/rest/services/RequestService.php';
require_once __DIR__ . '/rest/services/AnnouncementService.php';
require_once __DIR__ . '/rest/services/AuthService.php';
require_once __DIR__ . '/middleware/AuthMiddleware.php';
require_once __DIR__ . '/data/Roles.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::register('mealService', 'MealService');
Flight::register('userService', 'UserService');
Flight::register('roomService', 'RoomService');
Flight::register('requestService', 'RequestService');
Flight::register('announcementService', 'AnnouncementService');
Flight::register('auth_service', "AuthService");
Flight::register('auth_middleware', "AuthMiddleware");

Flight::before('start', function() {
    if(
        strpos(Flight::request()->url, '/auth/login') === 0 ||
        strpos(Flight::request()->url, '/auth/register') === 0
    ) {
        return TRUE;
    } else {
        try {
            $token = Flight::request()->getHeader("Authentication");
            if(Flight::auth_middleware()->verifyToken($token))
                return TRUE;
        } catch (\Exception $e) {
            Flight::halt(401, $e->getMessage());
        }
    }
});


require_once __DIR__ . '/rest/routes/MealRoutes.php';
require_once __DIR__ . '/rest/routes/UserRoutes.php';
require_once __DIR__ . '/rest/routes/RoomRoutes.php';
require_once __DIR__ . '/rest/routes/RequestRoutes.php';
require_once __DIR__ . '/rest/routes/AnnouncementRoutes.php';
require_once __DIR__ . '/rest/routes/AuthRoutes.php';

Flight::start();
?>