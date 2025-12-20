<?php
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

// CORS Configuration (Because I have deployed backend and frontend separately)
$allowedOrigin = isset($_ENV['FRONTEND_URL']) && trim($_ENV['FRONTEND_URL']) != "" 
    ? $_ENV['FRONTEND_URL'] 
    : 'http://localhost/Dorm-Student-Organization-System/frontend';

// Handle OPTIONS preflight
Flight::route('OPTIONS *', function() use ($allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: content-type, Content-Type, Authorization, Authentication');
    header('Access-Control-Allow-Credentials: true');
    Flight::halt(204);
});

// Add CORS to JSON responses
Flight::before('json', function() use ($allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
    header('Access-Control-Allow-Credentials: true');
});

// Add CORS to error responses
Flight::before('error', function() use ($allowedOrigin) {
    header("Access-Control-Allow-Origin: $allowedOrigin");
    header('Access-Control-Allow-Credentials: true');
});

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