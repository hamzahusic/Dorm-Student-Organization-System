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
    Flight::auth_middleware()->authorizeRoles([Roles::STUDENT, Roles::ADMIN]);
    $user = Flight::get('user');
    if($user->role == Roles::ADMIN){
       Flight::json(Flight::requestService()->get_all_request());
    }else{
       Flight::json(Flight::requestService()->get_all_request($user->id));
    }
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
    Flight::auth_middleware()->authorizeRoles([Roles::STUDENT, Roles::ADMIN]);
    $user = Flight::get('user');
    if($user->role == Roles::ADMIN){
       Flight::json(Flight::requestService()->get_request_information($id));
    }else{
       Flight::json(Flight::requestService()->get_request_information($id, $user->id));
    }
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
 *             required={"title", "description"},
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
    Flight::auth_middleware()->authorizeRole(Roles::STUDENT);
    $user = Flight::get('user');
    $data = Flight::request()->data->getData();
    $result = Flight::requestService()->add(array_merge($data, ['user_id' => $user->id]));

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
    Flight::auth_middleware()->authorizeRoles([Roles::STUDENT, Roles::ADMIN]);
    $user = Flight::get('user');
    $data = Flight::request()->data->getData();
    $data['user_id'] = $user->id;
    $result;

    if(!$data['id']){
        Flight::halt(400, "Please provide request id");
    }

    $user_request = Flight::requestService()->get_by_id($data['id']);

    if($user->role == Roles::ADMIN){
       $result = Flight::requestService()->update($data,$data['id']);
    }else{
       unset($data['status']);

       if(!$user_request || $user_request['user_id'] != $user->id ){
            Flight::halt(403, "Unauthorized access");
       }

       $result = Flight::requestService()->update($data,$data['id']);
    }

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
    Flight::auth_middleware()->authorizeRoles([Roles::STUDENT, Roles::ADMIN]);
    $user = Flight::get('user');
    $result;

    $user_request = Flight::requestService()->get_by_id($id);

    if($user->role == Roles::ADMIN){
       $result = Flight::requestService()->delete($id);
    }else{
       if(!$user_request || $user_request['user_id'] != $user->id ){
          Flight::halt(403, "Unauthorized access");
       }

       $result = Flight::requestService()->delete($id);
    }

    Flight::json($result);
});

?>