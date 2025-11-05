<?php

Flight::route('GET /rooms', function(){
    Flight::json(Flight::roomService()->get_all_rooms());
});

Flight::route('GET /room/info/@id', function($id){
    Flight::json(Flight::roomService()->get_room_information($id));
});

Flight::route('POST /room', function(){
    $data = Flight::request()->data->getData();
    $result = Flight::roomService()->add($data);

    Flight::json($result);
});

Flight::route('PUT /room', function(){
    $data = Flight::request()->data->getData();
    $result = Flight::roomService()->update($data,$data['id']);

    Flight::json($result);
});

Flight::route('DELETE /room/@id', function($id){
    $result = Flight::roomService()->delete($id);
    Flight::json($result);
});

?>