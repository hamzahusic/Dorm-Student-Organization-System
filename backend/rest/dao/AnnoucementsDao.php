<?php
require_once __DIR__ . "/BaseDao.php";

    class AnnouncementsDao extends BaseDao{

        protected $table_name;

        public function __construct()
        {
            $this->table_name = "announcements";
            parent::__construct($this->table_name);
        }

        public function get_all_announcements(){
            return $this->query("
                SELECT
                    a.id,
                    a.title,
                    a.content,
                    CONCAT(u.first_name, ' ', u.last_name ) as name,
                    a.created_at 
                FROM users u
                JOIN announcements a on a.user_id  = u.id;
            ",[]);
        }

        public function get_announcement($announcement_id){
            return $this->query_unique(
                "SELECT
                    a.id,
                    a.title,
                    a.content,
                    CONCAT(u.first_name, ' ', u.last_name) as name,
                    a.created_at,
                    a.thumbnail
                FROM users u
                JOIN announcements a on a.user_id  = u.id
                WHERE a.id = :id;
                "    
            ,["id" => $announcement_id]);
        }
        

    }
    

?>