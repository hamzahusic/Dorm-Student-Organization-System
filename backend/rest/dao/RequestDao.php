<?php
require_once __DIR__ . "/BaseDao.php";

    class RequestDao extends BaseDao{

        protected $table_name;

        public function __construct()
        {
            $this->table_name = "requests";
            parent::__construct($this->table_name);
        }

        public function get_student_requests($student_id){
            return $this->query("SELECT 
                r.id,
                r.title,
                r.description,
                r.created_at,
                r.status
            FROM users u 
            JOIN requests r ON u.id = r.user_id
            WHERE u.id = :student_id;", ['student_id' => $student_id]);
        }

        public function get_all_request(){
            return $this->query(
                "SELECT DISTINCT
                    r.id,
                    r.title,
                    r.description,
                    r.status,
                    r.created_at,
                    CONCAT(u.first_name, ' ', u.last_name ) as name,
                    u.room_id as room_number
                FROM requests r
                JOIN users u on r.user_id = u.id;"
            ,[]);
        }

    }
    

?>