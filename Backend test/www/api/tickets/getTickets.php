<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../../config/database.php';
include_once '../../class/tickets.php';

$database = new Database();
$db = $database->getConnection();

$tickets = new Tickets($db);

$tickets->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : 0;
$page = (isset($_GET['page']) && $_GET['page']) ? $_GET['page'] : 0;
echo $_GET['page'];

if(isset($_GET['id'])){
  $result = $tickets->getTicketById();
} else {
  $result = $tickets->getTickets($page);
}

http_response_code($result["status"]);
echo json_encode($result);
