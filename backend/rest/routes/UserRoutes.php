<?php

/**
* @OA\Get(
*      path="/users",
*      tags={"users"},
*      summary="Get all users",
*      @OA\Response(
*           response=200,
*           description="Array of all users in the database"
*      )
* )
*/

Flight::route('GET /users', function(){
    $result = Flight::userService()->get_all();

    foreach($result as &$user){
        unset($user['password']);
    }

    Flight::json($result);
});

Flight::route('GET /users/stats', function(){
    Flight::json(Flight::userService()->get_students_per_year());
});

Flight::route('GET /users/@id', function($id){
    $user = Flight::userService()->get_by_id($id);
    //I will have special if statement when user is requesting his info
    //e.g profile page for changing password
    unset($user['password']);
    Flight::json($user);
});

Flight::route('POST /users', function(){
    $data = Flight::request()->data->getData();
    
    $result = Flight::userService()->update(
        $data, (int)$data['id']
    );

    Flight::json($result);
});

Flight::route('DELETE /users/@id', function($id){
    $result = Flight::userService()->delete($id);
    Flight::json($result);
});

?>