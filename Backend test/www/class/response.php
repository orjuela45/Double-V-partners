<?php
class Response
{

  public function __construct(){}

  static function successResponse($message, $data= [], $status = 200){
    return [
      "data" => $data,
      "message" => $message,
      "status" => $status
    ];
  }

  static function errorResponse($message, $data= [], $status = 500){
    return [
      "data" => $data,
      "message" => $message,
      "status" => $status
    ];
  }

  static function notFoundResponse($message, $data= [], $status = 404){
    return [
      "data" => $data,
      "message" => $message,
      "status" => $status
    ];
  }

  static function badRequestResponse($message, $data= [], $status = 404){
    return [
      "data" => $data,
      "message" => $message,
      "status" => $status
    ];
  }

}