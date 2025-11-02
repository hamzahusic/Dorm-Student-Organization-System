<?php

require_once __DIR__ . '/BaseService.php';
require_once __DIR__ . '/../dao/AnnouncementDao.php';

class AnnouncementService extends BaseService {

    public function __construct()
    {
        $dao = new AnnouncementDao();
        parent::__construct($dao);
    }

    public function get_all_announcements(){
        return $this->dao->get_all_announcements();
    }

    public function get_announcement($announcement_id){
        return $this->dao->get_announcement($announcement_id);
    }

}
?>