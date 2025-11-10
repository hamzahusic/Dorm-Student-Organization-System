<?php

/**
 * @OA\Get(
 *     path="/meals",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Get all meals",
 *     @OA\Response(
 *         response=200,
 *         description="Array of all meals in the database"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /meals', function(){
    Flight::json(Flight::mealService()->get_all());
});

/**
 * @OA\Get(
 *     path="/meals/per_day",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Get taken meals per day (admin dashboard stats)",
 *     @OA\Response(
 *         response=200,
 *         description="Statistics of taken meals per day"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

//Stats for admin dashboard
Flight::route('GET /meals/per_day', function(){
    Flight::json(Flight::mealService()->get_taken_meals_per_day());
});

/**
 * @OA\Get(
 *     path="/student/meals/per_day/{student_id}",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Get student taken meals per day (student dashboard stats)",
 *     @OA\Parameter(
 *         name="student_id",
 *         in="path",
 *         required=true,
 *         description="Student ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Statistics of student's taken meals per day"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

//Stats for single student (student dashboard)
Flight::route('GET /student/meals/per_day/@student_id', function($student_id){
    Flight::json(Flight::mealService()->get_student_taken_meals($student_id));
});

/**
 * @OA\Get(
 *     path="/student/meals/today/{student_id}",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     summary="Get today's meals for a student",
 *     @OA\Parameter(
 *         name="student_id",
 *         in="path",
 *         required=true,
 *         description="Student ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Array of today's meals for the student"
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('GET /student/meals/today/@student_id', function($student_id){
   Flight::json(Flight::mealService()->get_todays_meals($student_id));
});

/**
 * @OA\Post(
 *     path="/student/meals",
 *     summary="Take a meal",
 *     description="Student takes a meal.",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="Meal taking information",
 *         required=true,
 *         @OA\JsonContent(
 *             required={"user_id", "meal_id"},
 *             @OA\Property(
 *                 property="user_id",
 *                 type="integer",
 *                 example=1,
 *                 description="User ID"
 *             ),
 *             @OA\Property(
 *                 property="meal_id",
 *                 type="integer",
 *                 example=5,
 *                 description="Meal ID"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Meal has been taken successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

// Implement logic to check if that meal exists first.
// If it does that do it, if not return back error

Flight::route('POST /student/meals', function(){
   $data = Flight::request()->data->getData();

   $response = Flight::mealService()->take_meal($data['user_id'],$data['meal_id']);

   if($response['success']){
      Flight::json($response);
   }else{
      Flight::halt(500, $response['error']);
   }

});

/**
 * @OA\Delete(
 *     path="/student/meals/{user_meal_id}",
 *     summary="Delete a taken meal by ID.",
 *     description="Delete a taken meal record from the database using its ID.",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\Parameter(
 *         name="user_meal_id",
 *         in="path",
 *         required=true,
 *         description="User Meal ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Taken meal deleted successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('DELETE /student/meals/@user_meal_id', function($user_meal_id){
   Flight::json(Flight::mealService()->delete_taken_meal($user_meal_id));
});

/**
 * @OA\Post(
 *     path="/meals",
 *     summary="Create a new meal",
 *     description="Add a new meal to the database.",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="New meal information",
 *         required=true,
 *         @OA\JsonContent(
 *             required={"date", "type", "name", "description"},
 *             @OA\Property(
 *                 property="date",
 *                 type="string",
 *                 format="date",
 *                 example="2024-11-06",
 *                 description="Meal date"
 *             ),
 *             @OA\Property(
 *                 property="type",
 *                 type="string",
 *                 example="breakfast",
 *                 description="Meal type"
 *             ),
 *             @OA\Property(
 *                 property="name",
 *                 type="string",
 *                 example="Scrambled eggs",
 *                 description="Meal name"
 *             ),
 *             @OA\Property(
 *                 property="description",
 *                 type="string",
 *                 example="Scrambled eggs with toast and orange juice",
 *                 description="Meal description"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Meal has been created successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('POST /meals', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::mealService()->add($data));
});

/**
 * @OA\Put(
 *     path="/meals",
 *     summary="Update a meal",
 *     description="Update meal information.",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\RequestBody(
 *         description="Updated meal information",
 *         required=false,
 *         @OA\JsonContent(
 *             @OA\Property(
 *                 property="id",
 *                 type="integer",
 *                 example=1,
 *                 description="Meal ID"
 *             ),
 *             @OA\Property(
 *                 property="date",
 *                 type="string",
 *                 format="date",
 *                 example="2024-11-06",
 *                 description="Meal date"
 *             ),
 *             @OA\Property(
 *                 property="type",
 *                 type="string",
 *                 example="breakfast",
 *                 description="Meal type"
 *             ),
 *             @OA\Property(
 *                 property="name",
 *                 type="string",
 *                 example="Scrambled eggs",
 *                 description="Meal name"
 *             ),
 *             @OA\Property(
 *                 property="description",
 *                 type="string",
 *                 example="Scrambled eggs with toast and orange juice",
 *                 description="Meal description"
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Meal has been updated successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('PUT /meals', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::mealService()->update($data,$data['id']));
});

/**
 * @OA\Delete(
 *     path="/meals/{meal_id}",
 *     summary="Delete a meal by ID.",
 *     description="Delete a meal from the database using its ID.",
 *     tags={"meals"},
 *     security={
 *         {"ApiKey": {}}
 *     },
 *     @OA\Parameter(
 *         name="meal_id",
 *         in="path",
 *         required=true,
 *         description="Meal ID",
 *         @OA\Schema(type="integer", example=1)
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Meal deleted successfully."
 *     ),
 *     @OA\Response(
 *         response=500,
 *         description="Internal server error."
 *     )
 * )
 */

Flight::route('DELETE /meals/@meal_id', function($meal_id){
   Flight::json(Flight::mealService()->delete($meal_id));
});

?>