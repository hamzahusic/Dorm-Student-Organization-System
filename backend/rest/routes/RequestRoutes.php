<?php

Flight::route('GET /requests', function(){
    //when we do authorization I will update get_all method to get result based on role
    Flight::json(Flight::requestService()->get_all());
});

Flight::route('GET /request/info/@id', function($id){
    Flight::json(Flight::requestService()->get_by_id($id));
});

Flight::route('POST /request', function(){
    $data = Flight::request()->data->getData();
    $result = Flight::requestService()->add($data);

    Flight::json($result);
});

Flight::route('PUT /request', function(){
    //when we do authorization I will edit update method to update based on role
    //e.g only admin can change status of request
    $data = Flight::request()->data->getData();
    $result = Flight::requestService()->update($data,$data['id']);

    Flight::json($result);
});

Flight::route('DELETE /request/@id', function($id){
    $result = Flight::requestService()->delete($id);
    Flight::json($result);
});

?>