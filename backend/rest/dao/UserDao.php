<?php

require_once __DIR__ . "/BaseDao.php";


    class UserDao extends BaseDao{

        protected $table_name;

        public function __construct()
        {
            $this->table_name = "users";
            parent::__construct($this->table_name);
        }

        public function get_all()
        {
            return $this->query("SELECT * FROM " . $this->table_name, []);
        }

        public function get_students_per_year(){
            return $this->query("SELECT YEAR(created_at) as year, COUNT(*) as student_count FROM " . $this->table_name . " WHERE role = 'student' GROUP BY YEAR(created_at)", []);
        }

        public function get_dorm_students_per_year(){
            return $this->query("SELECT
                YEAR(u.created_at) as year,
                COUNT(*) as students
            FROM users u
            GROUP by YEAR(u.created_at);",[]);
        }

    }
?>