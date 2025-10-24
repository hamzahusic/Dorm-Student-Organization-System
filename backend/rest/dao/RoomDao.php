<?php
require_once __DIR__ . "/BaseDao.php";

    class RoomDao extends BaseDao{

        protected $table_name;

        public function __construct()
        {
            $this->table_name = "rooms";
            parent::__construct($this->table_name);
        }

        public function get_room_information($room_id){
            return $this->query("SELECT DISTINCT
                    r.id as room_number,
                    r.floor as floor_number,
                    CONCAT(u.first_name,' ', u.last_name) as name,
                    u.faculty,
                    u.email,
                    u.`year`,
                    u.phone,
                    r.capacity
                FROM users u
                JOIN rooms r on u.room_id = r.id 
                WHERE r.id = :room_id AND u.is_active = true", ['room_id' => $room_id]);
        }

    }
    

?>