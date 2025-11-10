<?php

require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/RoomDao.php';

class RoomService extends BaseService {

    public function __construct()
    {
        $dao = new RoomDao();
        parent::__construct($dao);
    }

   public function get_room_information($room_id){
    return $this->dao->get_room_information($room_id);
   }
   public function get_all_rooms(){
    return $this->dao->get_all_rooms();
   }
}
?>