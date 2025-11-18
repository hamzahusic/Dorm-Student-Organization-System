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

    //Stats for student chart
    public function get_student_taken_meals($student_id){
        $result = $this->dao->get_student_taken_meals($student_id);
        $start = 0;
        $end = 0;
        $last_date = date('Y-m-d');
        $filtered_result = [];

        if(count($result) > 0 && count($result) < 15){
            $end = 15 - count($result);
            $last_date = date('Y-m-d', strtotime(end($result)['date'] . ' -1 day'));
        }else if(count($result) == 0){
            $end = 15;
        }
        
        foreach($result as $val){
            $filtered_result[$val['date']] = $val['number_of_meals_taken'];
        }
        
        for($i = $start; $i < $end; $i++){
            $filtered_result[$last_date] = 0;
            $last_date = date('Y-m-d', strtotime($last_date . ' -1 day'));
        }


        return array_reverse($filtered_result,true);

    }

    //Admin stats for all students
    public function get_taken_meals_per_day(){
        $result = $this->dao->get_taken_meals_per_day();
        $start = 0;
        $end = 0;
        $last_date = date('Y-m-d');
        $filtered_result = [];

        if(count($result) > 0 && count($result) < 7){
            $end = 7 - count($result);
            $last_date = date('Y-m-d', strtotime(end($result)['date'] . ' -1 day'));
        }else if(count($result) == 0){
            $end = 7;
        }

        foreach($result as $val){
            $filtered_result[$val['date']] = $val['total'];
        }
        
        for($i = $start; $i < $end; $i++){
            $filtered_result[$last_date] = 0;
            $last_date = date('Y-m-d', strtotime($last_date . ' -1 day'));
        }

        return array_reverse($filtered_result,true);;
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