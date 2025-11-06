<?php

/**
* @OA\Get(
*      path="/users",
*      tags={"users"},
*      summary="Get all users",
*      @OA\Response(
*           response=200,
*           description="Array of all users in the database"
*      ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
* )
*/

Flight::route('GET /users', function(){
    $result = Flight::userService()->get_all();

    foreach($result as &$user){
        unset($user['password']);
    }

    Flight::json($result);
});

/**
* @OA\Get(
*      path="/users/stats",
*      tags={"users"},
*      summary="Get sats for the number of students per year (just for admins)",
*      @OA\Response(
*           response=200,
*           description="Array of all users per year in the database"
*      ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
* )
*/

Flight::route('GET /users/stats', function(){
    Flight::json(Flight::userService()->get_students_per_year());
});

/**
 * @OA\Get(
 *     path="/users/{id}",
 *     tags={"users"},
 *     summary="Fetch individual user by ID.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Fetch individual user."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /users/@id', function($id){
    $user = Flight::userService()->get_by_id($id);
    //I will have special if statement when user is requesting his info
    //e.g profile page for changing password
    unset($user['password']);
    Flight::json($user);
});

/**
 * @OA\Put(
 *     path="/users",
 *     summary="Update a user",
 *     description="Update user information.",
 *     tags={"users"},
 *     @OA\RequestBody(
 *         description="Updated user information",
 *         required=false,
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 example=1,
 *                 description="User ID"
 *             ),
 *             @OA\Property(
 *                 property="first_name",
 *                 type="string",
 *                 example="John",
 *                 description="User first name"
 *             ),
 *             @OA\Property(
 *                 property="last_name",
 *                 type="string",
 *                 example="Doe",
 *                 description="User last name"
 *             ),
 *             @OA\Property(
 *                 property="email",
 *                 type="string",
 *                 example="john.doe@gmail.com",
 *                 description="User email"
 *             ),
 *             @OA\Property(
 *                 property="password",
 *                 type="string",
 *                 example="password123",
 *                 description="User password"
 *             ),
 *             @OA\Property(
 *                 property="role",
 *                 type="string",
 *                 example="student",
 *                 description="User role"
 *             ),
 *             @OA\Property(
 *                 property="room_id",
 *                 type="integer",
 *                 example=101,
 *                 description="Room ID"
 *             ),
 *             @OA\Property(
 *                 property="is_active",
 *                 type="boolean",
 *                 example=true,
 *                 description="User active status"
 *             ),
 *             @OA\Property(
 *                 property="faculty",
 *                 type="string",
 *                 example="Engineering",
 *                 description="User faculty"
 *             ),
 *             @OA\Property(
 *                 property="year",
 *                 type="integer",
 *                 example=2024,
 *                 description="User year"
 *             ),
 *             @OA\Property(
 *                 property="phone",
 *                 type="string",
 *                 example="+1234567890",
 *                 description="User phone number"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User has been updated successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('PUT /users', function(){
    $data = Flight::request()->data->getData();
    
    $result = Flight::userService()->update(
        $data, (int)$data['id']
    );

    Flight::json($result);
});

/**
 * @OA\Delete(
 *     path="/users/{id}",
 *     summary="Delete a user by ID.",
 *     description="Delete a user from the database using their ID.",
 *     tags={"users"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="User ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="User deleted successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('DELETE /users/@id', function($id){
    $result = Flight::userService()->delete($id);
    Flight::json($result);
});

?>