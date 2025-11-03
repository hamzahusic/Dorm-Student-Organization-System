<?php

Flight::route('GET /student', function(){
    Flight::json(["message" => "Hello!"]);
});

Flight::route('GET /student/meal/@id', function($id){
   Flight::json(Flight::mealService()->get_student_taken_meals($id));
});

?>