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
                    m.id as meal_id,
                    m.type,
                    m.name,
                    m.description,
                    um.id as user_meal_id,
                    um.created_at as taken_at,
                    CASE 
                        WHEN um.id IS NOT NULL THEN true 
                        ELSE false 
                    END as taken
                FROM meals m
                LEFT JOIN user_meals um ON m.id = um.meal_id AND um.user_id = :id
                WHERE m.date = CURRENT_DATE();",
            ["id" => $user_id]);
        }

        //this is meals that student has taken this month
        // date -> how many meals (e.g oct 10 -> 10)
        public function get_student_taken_meals($student_id){
            return $this->query("SELECT DISTINCT
                    DATE(m.date) as `date`,
                    COUNT(*) number_of_meals_taken
                FROM users u
                JOIN user_meals um ON u.id = um.user_id 
                JOIN meals m ON um.meal_id = m.id
                WHERE u.id = :student_id
                GROUP BY DATE(m.date)
                ORDER BY DATE(m.date) DESC
                LIMIT 15;", ['student_id' => $student_id]);
        }

        //how many meals students have taken per 
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
            $query = "INSERT INTO user_meals (user_id, meal_id) VALUES (:user_id, :meal_id);";
            $stmt = $this->connection->prepare($query);
            $stmt->bindValue(':user_id', $user_id); 
            $stmt->bindValue(':meal_id', $meal_id); 
            $stmt->execute();
            
            return [
                'user_meal_id' => $this->connection->lastInsertId(),
                'user_id' => $user_id,
                'meal_id' => $meal_id
            ];
        }

        public function delete_taken_meal($user_meal_id){
            $stmt = $this->connection->prepare("DELETE FROM user_meals WHERE id = :id");
            $stmt->bindValue(':id', $user_meal_id); 
            return $stmt->execute();
        }

    }
    

?>