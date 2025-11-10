<?php

require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/MealDao.php';

class MealService extends BaseService {

    public function __construct()
    {
        $dao = new MealDao();
        parent::__construct($dao);
    }

    public function get_todays_meals($user_id){
        return $this->dao->get_todays_meals($user_id);
    }

    public function get_student_taken_meals($student_id){
        return $this->dao->get_student_taken_meals($student_id);
    }

    public function get_taken_meals_per_day(){
        return $this->dao->get_taken_meals_per_day();
    }
    
    public function take_meal($user_id, $meal_id){
        $response = $this->dao->getById($meal_id);

        if(!$response){
            return ['success' => false, 'error' => 'Meal does not exist'];
        }

        $data = $this->dao->take_meal($user_id, $meal_id);

        return [
            'message' => "Meal taken",
            'success' => true,
            'data' => $data
        ];
    }

    public function delete_taken_meal($user_meal_id){
        return $this->dao->delete_taken_meal($user_meal_id);
    }

}
?>