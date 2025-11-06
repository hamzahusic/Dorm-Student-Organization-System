<?php

/**
 * @OA\Get(
 *     path="/requests",
 *     tags={"requests"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Get all requests",
 *     @OA\Response(
 *         response=200,
 *         description="Array of all requests in the database"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /requests', function(){
    //when we do authorization I will update get_all method to get result based on role
    Flight::json(Flight::requestService()->get_all());
});

/**
 * @OA\Get(
 *     path="/request/info/{id}",
 *     tags={"requests"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Fetch individual request by ID.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Request ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Fetch individual request."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /request/info/@id', function($id){
    Flight::json(Flight::requestService()->get_request_information($id));
});

/**
 * @OA\Post(
 *     path="/request",
 *     summary="Create a new request",
 *     description="Add a new request to the database.",
 *     tags={"requests"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="New request information",
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "title", "description"},
 *             @OA\Property(
 *                 property="user_id",
 *                 type="integer",
 *                 example=1,
 *                 description="User ID"
 *             ),
 *             @OA\Property(
 *                 property="title",
 *                 type="string",
 *                 example="Urgent window fix",
 *                 description="Request title"
 *             ),
 *             @OA\Property(
 *                 property="description",
 *                 type="string",
 *                 example="Broken window in room 101",
 *                 description="Request description"
 *             ),
 *             @OA\Property(
 *                 property="status",
 *                 type="string",
 *                 example="pending",
 *                 description="Request status (defaults to 'pending')"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Request has been created successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('POST /request', function(){
    $data = Flight::request()->data->getData();
    $result = Flight::requestService()->add($data);

    Flight::json($result);
});

/**
 * @OA\Put(
 *     path="/request",
 *     summary="Update a request",
 *     description="Update request information.",
 *     tags={"requests"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="Updated request information",
 *         required=false,
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 example=1,
 *                 description="Request ID"
 *             ),
 *             @OA\Property(
 *                 property="user_id",
 *                 type="integer",
 *                 example=1,
 *                 description="User ID"
 *             ),
 *             @OA\Property(
 *                 property="title",
 *                 type="string",
 *                 example="Urgent window fix",
 *                 description="Request title"
 *             ),
 *             @OA\Property(
 *                 property="description",
 *                 type="string",
 *                 example="Broken window in room 101",
 *                 description="Request description"
 *             ),
 *             @OA\Property(
 *                 property="status",
 *                 type="string",
 *                 example="pending",
 *                 description="Request status"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Request has been updated successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('PUT /request', function(){
    //when we do authorization I will edit update method to update based on role
    //e.g only admin can change status of request
    $data = Flight::request()->data->getData();
    $result = Flight::requestService()->update($data,$data['id']);

    Flight::json($result);
});

/**
 * @OA\Delete(
 *     path="/request/{id}",
 *     summary="Delete a request by ID.",
 *     description="Delete a request from the database using its ID.",
 *     tags={"requests"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Request ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Request deleted successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('DELETE /request/@id', function($id){
    $result = Flight::requestService()->delete($id);
    Flight::json($result);
});

?>