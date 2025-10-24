<?php

require_once __DIR__ . "/BaseDao.php";


    class UserDao extends BaseDao{

        protected $table_name;

        public function __construct()
        {
            $this->table_name = "users";
            parent::__construct($this->table_name);
        }

        public function get_all_students()
        {
            return $this->query("SELECT 
                id,
                first_name,
                last_name,
                email,
                faculty,
                room_id as room_number,
                role,
                is_active
             FROM " . $this->table_name, []);
        }

        public function get_students_per_year(){
            return $this->query("SELECT YEAR(created_at) as year, COUNT(*) as student_count FROM " . $this->table_name . " WHERE role = 'student' GROUP BY YEAR(created_at)", []);
        }

    }
?>