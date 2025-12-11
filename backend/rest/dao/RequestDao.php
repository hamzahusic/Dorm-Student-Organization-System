<?php
require_once __DIR__ . "/BaseDao.php";

    class RequestDao extends BaseDao{

        protected $table_name;

        public function __construct()
        {
            $this->table_name = "requests";
            parent::__construct($this->table_name);
        }

        public function get_all_request($user_id = null){
            $query = "SELECT DISTINCT
                    r.id,
                    r.title,
                    r.description,
                    r.status,
                    r.created_at,
                    CONCAT(u.first_name, ' ', u.last_name ) as name,
                    u.room_id as room_number
                FROM requests r
                JOIN users u on r.user_id = u.id";

            if($user_id !== null){
                $query = $query . " WHERE r.user_id = :user_id";
                return $this->query($query,['user_id' => $user_id]);
            }

            return $this->query($query,[]);
        }

        public function get_request_information($id, $user_id = null){
            $query = "SELECT DISTINCT
                    r.id,
                    r.title,
                    r.description,
                    r.status,
                    r.created_at,
                    CONCAT(u.first_name, ' ', u.last_name ) as name,
                    u.room_id as room_number
                FROM requests r
                JOIN users u on r.user_id = u.id
                WHERE r.id = :id";

            if($user_id !== null){
                $query = $query . " AND r.user_id = :user_id";
                return $this->query_unique($query,['id' => $id, 'user_id' => $user_id]);
            }

            return $this->query_unique($query,['id' => $id]);
        }

    }
    

?>