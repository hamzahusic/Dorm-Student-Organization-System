<?php
require_once __DIR__ . "/BaseDao.php";

    class MealDao extends BaseDao{

        protected $table_name;

        public function __construct()
        {
            $this->table_name = "meals";
            parent::__construct($this->table_name);
        }

        public function get_todays_meals($user_id){
            return $this->query("SELECT DISTINCT
                            m.id,
                            m.`type`,
                            m.name,
                            m.description,
                            CASE WHEN um.user_id IS NOT NULL THEN true ELSE false END as taken
                        FROM meals m 
                        LEFT JOIN user_meals um on m.id = um.meal_id
                        WHERE m.date = CURRENT_DATE(); AND m.user_id = :id", ["id" => $user_id]);
        }

        //this is meals that student has taken each month
        public function get_student_taken_meals($student_id){
            return $this->query("SELECT DISTINCT
                    m.date,
                    COUNT(*) number_of_meals_taken
                FROM users u
                JOIN user_meals um ON u.id = um.user_id 
                JOIN meals m ON um.meal_id = m.id
                WHERE u.id = :student_id
                GROUP by m.date;", ['student_id' => $student_id]);
        }

        public function get_taken_meals_per_day(){
            return $this->query("SELECT
                    DATE(um.created_at) as `date`,
                    COUNT(*) as total
                FROM user_meals um
                GROUP BY DATE(um.created_at)
                ORDER BY DATE(um.created_at) DESC
                LIMIT 7;",[]);
        }

        public function take_meal($user_id, $meal_id){
            return $this->query("INSERT INTO user_meals (user_id, meal_id) VALUES (:user_id, :meal_id);", 
            ['user_id' => $user_id, 'meal_id' => $meal_id]);
        }

        public function delete_taken_meal($user_meal_id){
            return $this->query_unique(
                "DELETE FROM user_meals WHERE id = :id"
            ,["id" => $user_meal_id]);
        }

        public function get_all_meals(){
            return $this->query("
                SELECT
                    m.id,
                    m.name,
                    m.`type`,
                    m.description,
                    m.`date` 
                FROM meals m;
            ",[]);
        }

    }
    

?>