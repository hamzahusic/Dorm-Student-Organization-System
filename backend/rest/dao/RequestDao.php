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

        public function create_student_request($user_id, $title, $description){
            return $this->add(["user_id" => $user_id, "title" => $title, "description" => $description]);
        }

        public function delete_request($request_id){
            return $this->delete($request_id);
        }

    }
    

?>