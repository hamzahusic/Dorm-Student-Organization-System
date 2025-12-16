<?php

require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/RequestDao.php';

class RequestService extends BaseService {

    public function __construct()
    {
        $dao = new RequestDao();
        parent::__construct($dao);
    }

    public function get_all_request($user_id = null){
        return $this->dao->get_all_request($user_id);
    }

    public function get_request_information($id, $user_id = null){
        return $this->dao->get_request_information($id, $user_id);
    }
    
}
?>