<?php

require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/UserDao.php';

class UserService extends BaseService {

    public function __construct()
    {
        $dao = new UserDao();
        parent::__construct($dao);
    }

    public function get_students_per_year(){
        $result = $this->dao->get_students_per_year();
        $start = (int)date("Y");
        $end = (int)date("Y") + 1;// +1 to prevent loop if there is 7 elements in array
        $filtered_result = [];

        if(count($result) == 0){
            $end -= 8;
        }else if(count($result) > 0 && count($result) < 7){
            $start = (int)(end($result)['year'])  - 1;
            $end = $start - (7 - count($result));
        }

        for($i = $start; $i>= $end; $i--){
            $filtered_result[$i] = 0;
        }

        foreach($result as $val){
            $filtered_result[$val['year']] = $val['student_count'];
        }

        return $filtered_result;
    }
    
}
?>