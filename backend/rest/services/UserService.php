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
        return $this->dao->get_students_per_year();
    }
    
}
?>