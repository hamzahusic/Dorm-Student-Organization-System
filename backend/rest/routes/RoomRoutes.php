<?php

/**
 * @OA\Get(
 *     path="/rooms",
 *     tags={"rooms"},
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
    Flight::json(Flight::roomService()->get_all_rooms());
});

/**
 * @OA\Get(
 *     path="/room/info/{id}",
 *     tags={"rooms"},
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
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /room/info/@id', function($id){
    Flight::json(Flight::roomService()->get_room_information($id));
});

/**
 * @OA\Post(
 *     path="/room",
 *     summary="Create a new room",
 *     description="Add a new room to the database.",
 *     tags={"rooms"},
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
 *         description="Room has been updated successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('PUT /room', function(){
    $data = Flight::request()->data->getData();
    $result = Flight::roomService()->update($data,$data['id']);

    Flight::json($result);
});

/**
 * @OA\Delete(
 *     path="/room/{id}",
 *     summary="Delete a room by ID.",
 *     description="Delete a room from the database using its ID.",
 *     tags={"rooms"},
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
    $result = Flight::roomService()->delete($id);
    Flight::json($result);
});

?>