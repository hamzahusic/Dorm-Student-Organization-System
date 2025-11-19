<?php

/**
 * @OA\Get(
 *     path="/public/announcements",
 *     tags={"announcements"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Get all announcements",
 *     @OA\Response(
 *         response=200,
 *         description="Array of all announcements in the database"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

//I will protects all these routes to be only for admin when we implement authorization
Flight::route('GET /public/announcements', function(){
    Flight::json(Flight::announcementService()->get_all_announcements());
});

/**
 * @OA\Get(
 *     path="/public/announcement/{id}",
 *     tags={"announcements"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Fetch individual announcement by ID.",
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Announcement ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Fetch individual announcement."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */


Flight::route('GET /public/announcement/@id', function($id){
    Flight::json(Flight::announcementService()->get_announcement($id));
});

/**
 * @OA\Post(
 *     path="/announcement",
 *     summary="Create a new announcement",
 *     description="Add a new announcement to the database.",
 *     tags={"announcements"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="New announcement information",
 *         required=true,
 *         @OA\JsonContent(
 *             required={"title", "content", "thumbnail"},
 *             @OA\Property(
 *                 property="title",
 *                 type="string",
 *                 example="Maintenance Notice",
 *                 description="Announcement title"
 *             ),
 *             @OA\Property(
 *                 property="content",
 *                 type="string",
 *                 example="Water will be shut off tomorrow from 9 AM to 12 PM",
 *                 description="Announcement description"
 *             ),
 *             @OA\Property(
 *                 property="thumbnail",
 *                 type="string",
 *                 example="https://unsplash.com/photos/black-metal-bunk-bed-WQJvWU_HZFo",
 *                 description="Announcement thumbnail"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Announcement has been created successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('POST /announcement', function(){
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);

    $data = Flight::request()->data->getData();
    $result = Flight::announcementService()->add($data);

    Flight::json($result);
});

/**
 * @OA\Put(
 *     path="/announcement",
 *     summary="Update an announcement",
 *     description="Update announcement information.",
 *     tags={"announcements"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="Updated announcement information",
 *         required=false,
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 example=1,
 *                 description="Announcement ID"
 *             ),
 *             @OA\Property(
 *                 property="title",
 *                 type="string",
 *                 example="Maintenance Notice",
 *                 description="Announcement title"
 *             ),
 *             @OA\Property(
 *                 property="content",
 *                 type="string",
 *                 example="Water will be shut off tomorrow from 9 AM to 12 PM",
 *                 description="Announcement description"
 *             ),
 *             @OA\Property(
 *                 property="thumbnail",
 *                 type="string",
 *                 example="https://unsplash.com/photos/black-metal-bunk-bed-WQJvWU_HZFo",
 *                 description="Announcement thumbnail"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Announcement has been updated successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('PUT /announcement', function(){
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);

    $data = Flight::request()->data->getData();
    $result = Flight::announcementService()->update($data,$data['id']);

    Flight::json($result);
});

/**
 * @OA\Delete(
 *     path="/announcement/{id}",
 *     summary="Delete an announcement by ID.",
 *     description="Delete an announcement from the database using its ID.",
 *     tags={"announcements"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\Parameter(
 *         name="id",
 *         in="path",
 *         required=true,
 *         description="Announcement ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Announcement deleted successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('DELETE /announcement/@id', function($id){
    Flight::auth_middleware()->authorizeRole(Roles::ADMIN);
    
    $result = Flight::announcementService()->delete($id);
    Flight::json($result);
});

?>