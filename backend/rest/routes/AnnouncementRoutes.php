<?php
//I will protects all these routes to be only for admin when we implement authorization
Flight::route('GET /announcements', function(){
    Flight::json(Flight::announcementService()->get_all_announcements());
});

Flight::route('GET /announcement/@id', function($id){
    Flight::json(Flight::announcementService()->get_announcement($id));
});

Flight::route('POST /announcement', function(){
    $data = Flight::request()->data->getData();
    $result = Flight::announcementService()->add($data);

    Flight::json($result);
});

Flight::route('PUT /announcement', function(){
    $data = Flight::request()->data->getData();
    $result = Flight::announcementService()->update($data,$data['id']);

    Flight::json($result);
});

Flight::route('DELETE /announcement/@id', function($id){
    $result = Flight::announcementService()->delete($id);
    Flight::json($result);
});

?>