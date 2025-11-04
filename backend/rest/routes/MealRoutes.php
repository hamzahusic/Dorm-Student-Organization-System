<?php

Flight::route('GET /meals', function(){
    Flight::json(Flight::mealService()->get_all());
});

//Stats for admin dashboard
Flight::route('GET /meals/per_day', function(){
    Flight::json(Flight::mealService()->get_taken_meals_per_day());
});
//Stats for single student dashboard
Flight::route('GET /student/meals/per_day/@student_id', function($student_id){
    Flight::json(Flight::mealService()->get_student_taken_meals($student_id));
});

Flight::route('GET /student/meals/today/@student_id', function($student_id){
   Flight::json(Flight::mealService()->get_todays_meals($student_id));
});

Flight::route('POST /student/meals', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::mealService()->take_meal($data['user_id'],$data['meal_id']));
});

Flight::route('DELETE /student/meals/@user_meal_id', function($user_meal_id){
   Flight::json(Flight::mealService()->delete_taken_meal($user_meal_id));
});

Flight::route('POST /meals', function(){
   $data = Flight::request()->data->getData();
   Flight::json(Flight::mealService()->add($data));
});

Flight::route('PUT /meals', function(){
   $data = Flight::request()->data->getData();
   $id = $data['id'];
   unset($data['id']);
   Flight::json(Flight::mealService()->update($data,$id));
});

Flight::route('DELETE /meals/@meal_id', function($meal_id){
   Flight::json(Flight::mealService()->delete($meal_id));
});

?>