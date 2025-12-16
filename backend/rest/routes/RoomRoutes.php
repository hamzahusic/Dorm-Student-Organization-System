<?php

/**
 * @OA\Get(
 *     path="/rooms",
 *     tags={"rooms"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Get all rooms",
 *     @OA\Response(
 *         response=200,
 *         description="Array of all rooms in the database"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /rooms', function(){
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    Flight::json(Flight::roomService()->get_all_rooms());
});

/**
 * @OA\Get(
 *     path="/room/info/{id}",
 *     tags={"rooms"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Fetch individual room by ID.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Room ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Fetch individual room information."
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Room doesn't exist."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /room/info/@id', function($id){
    Flight::auth_middleware()->authorizeRoles([Roles::STUDENT, Roles::ADMIN]);
    $user = Flight::get('user');
    $room_info = Flight::roomService()->get_by_id($id);
    
    if(!$room_info){
        Flight::halt(404,"Room doesn't exist.");
    }

    if($room_info['id'] !== $user->room_id && $user->role !== Roles::ADMIN){
        Flight::halt(403, "Unauthorized access");
    }

    $result = Flight::roomService()->get_room_information($id);
    Flight::json(array_merge($room_info,['students' => $result]));
    
});

/**
 * @OA\Post(
 *     path="/room",
 *     summary="Create a new room",
 *     description="Add a new room to the database.",
 *     tags={"rooms"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="New room information",
 *         required=true,
 *         @OA\JsonContent(
 *             required={"id","capacity", "floor"},
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 example=113,
 *                 description="Room number"
 *             ),
 *             @OA\Property(
 *                 property="capacity",
 *                 type="integer",
 *                 example=2,
 *                 description="Room capacity"
 *             ),
 *             @OA\Property(
 *                 property="floor",
 *                 type="integer",
 *                 example=1,
 *                 description="Floor number"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Room has been created successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('POST /room', function(){
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    $result = Flight::roomService()->add($data);

    Flight::json($result);
});

/**
 * @OA\Put(
 *     path="/room",
 *     summary="Update a room",
 *     description="Update room information.",
 *     tags={"rooms"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="Updated room information",
 *         required=false,
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 example=113,
 *                 description="Room ID"
 *             ),
 *             @OA\Property(
 *                 property="original_id",
 *                 type="integer",
 *                 example=113,
 *                 description="Original Room ID (If room id is changing)"
 *             ),
 *             @OA\Property(
 *                 property="capacity",
 *                 type="integer",
 *                 example=2,
 *                 description="Room capacity"
 *             ),
 *             @OA\Property(
 *                 property="floor",
 *                 type="integer",
 *                 example=1,
 *                 description="Floor number"
 *             ),
 *             @OA\Property(
 *                 property="students_ids",
 *                 type="array",
 *                 description="Array of students IDs assigned to this room",
 *                 @OA\Items(
 *                     type="integer",
 *                     example=45
 *                 )
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Room has been updated successfully."
 *     ),
 *     @OA\Response(
 *         response=404,
 *         description="Room doesn't exist or room capacity exceeded."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('PUT /room', function(){
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $data = Flight::request()->data->getData();
    $room_id = $data['id'];
    $original_room_id = $data['original_id'];
    $room_info = Flight::roomService()->get_by_id($original_room_id);
    $students = $data['students_ids'];

    if(!$room_info){
        Flight::halt(404, "Room doesn't exist");
    }
    
    if(count($students) > $room_info['capacity'] && count($students) > $data['capacity']){
        Flight::halt(404,"Room capacity exceeded");
    }
    
    $room_assignees = Flight::roomService()->get_room_information($original_room_id);

    foreach($room_assignees as $assignee){
        Flight::userService()->update(
            [
                'room_id' => NULL
            ],
            $assignee['student_id']
        );
    }

    if($room_id != $original_room_id){
        $result = Flight::roomService()->add([
            'id' => $room_id,
            'capacity' => $data['capacity'],
            'floor' => $data['floor']
        ]);
        
        Flight::roomService()->delete($original_room_id);
    } else {
        unset($data['id']);
        unset($data['students_ids']);
        unset($data['original_id']);
        $result = Flight::roomService()->update($data, $original_room_id);
    }

    foreach($students as $student_id){
        Flight::userService()->update(
            [
                'room_id' => $room_id
            ],
            $student_id
        );
    }

    Flight::json($result);
});

/**
 * @OA\Delete(
 *     path="/room/{id}",
 *     summary="Delete a room by ID.",
 *     description="Delete a room from the database using its ID.",
 *     tags={"rooms"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Room ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Room deleted successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('DELETE /room/@id', function($id){
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    $result = Flight::roomService()->delete($id);
    Flight::json($result);
});

?>