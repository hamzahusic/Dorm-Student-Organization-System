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
                    u.id as student_id,
                    CONCAT(u.first_name,' ', u.last_name) as name,
                    u.faculty,
                    u.email,
                    u.`year`,
                    u.phone
                FROM users u
                WHERE u.room_id = :room_id AND u.is_active = true
                ORDER BY name ASC", ['room_id' => $room_id]);
        }

        public function get_all_rooms(){
            return $this->query("
                SELECT
				    r.id as room_number,
				    r.capacity,
				    r.floor as floor_number,
				    COUNT(u.id) as student_count,
				    GROUP_CONCAT(CONCAT(u.first_name,' ',u.last_name) SEPARATOR ', ') as assigned_students
				FROM rooms r
				LEFT JOIN users u ON u.room_id = r.id AND u.is_active = true
				GROUP BY r.id;
            ",[]);
        }

    }
    

?>