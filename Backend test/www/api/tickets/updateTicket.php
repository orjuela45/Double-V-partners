<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: PUT");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Imports
include_once '../../config/database.php';
include_once '../../class/tickets.php';

$database = new Database();
$db       = $database->getConnection();

$ticket = new Tickets($db);

$data       = json_decode(file_get_contents("php://input"));
$ticket->id = (isset($_GET['id']) && $_GET['id']) ? $_GET['id'] : null;

$result = $ticket->updateTicket($data);

http_response_code($result["status"]);
echo json_encode($result);