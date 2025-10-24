<?php

    require_once __DIR__ . '/MealDao.php';

    $user_dao = new MealDao();
    // // $user = $user_dao->create_student_request(1, "Test", "Test123");
    // // print_r($user);

    // $request = $user_dao->get_student_requests(1);
    // print_r($request);

    // $removed = $user_dao->remove_request(1);
    // print_r($removed);

    $student_rooms = $user_dao->get_todays_meals(1);
    print_r($student_rooms);
?>