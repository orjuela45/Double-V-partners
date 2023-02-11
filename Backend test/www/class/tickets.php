<?php

require_once 'Response.php';

class Tickets
{
  private $ticketsTable = "tickets";
  private $conn;
  public $id;
  public $user_name;
  public $status;
  public $date_created;
  public $date_updated;

  public function __construct($db)
  {
    $this->conn = $db;
  }

  function getTickets($page = 0, $limit = 4)
  {
    $page = $page * $limit;
    $stmt = $this->conn->prepare("SELECT * FROM " . $this->ticketsTable . " LIMIT ? OFFSET ?");
    $stmt->bind_param("ii", $limit, $page);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $ticketRecords = array();
      $ticketRecords["tickets"] = array();
      while ($ticket = $result->fetch_assoc()) {
        extract($ticket);
        $ticketInfo = array(
          "id" => $id,
          "user_name" => $user_name,
          "status" => $status,
          "date_created" => $date_created,
          "date_updated" => $date_updated
        );
        array_push($ticketRecords["tickets"], $ticketInfo);
      } 
      return Response::successResponse("Tickets consultados", $ticketRecords);
    } else {
      return Response::notFoundResponse("No hay tickets");
    }
  }

  function getTicketById()
  {
    if (!$this->id) {
      return Response::badRequestResponse("El id es necesario");
    }
    $stmt = $this->conn->prepare("SELECT * FROM " . $this->ticketsTable . " WHERE id = ?");
    $stmt->bind_param("i", $this->id);

    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      $ticketInfo = [];
      while ($ticket = $result->fetch_assoc()) {
        extract($ticket);
        $ticketInfo = array(
          "id" => $id,
          "user_name" => $user_name,
          "status" => $status,
          "date_created" => $date_created,
          "date_updated" => $date_updated
        );
      } 
      return Response::successResponse("Tickets consultados", $ticketInfo);
    } else {
      return Response::notFoundResponse("No existe el ticket con id " . $this->id);
    }
  }

  function createTicket($data)
  {
    if (!isset($data->user_name) || empty($data->user_name)) {
      return Response::badRequestResponse("El nombre de usuario es obligatorio");
    }

    $stmt = $this->conn->prepare("INSERT INTO " . $this->ticketsTable . "(user_name) VALUES(?)");
    $this->user_name = htmlspecialchars(strip_tags($data->user_name));
    $stmt->bind_param("s", $this->user_name);

    if (!$stmt->execute()) {
      return Response::errorResponse("No se pudo crear el ticket");
    }
    return Response::successResponse("Ticket creado");
  }

  function deleteTicket()
  {
    $ticketResponse = $this->getTicketById();

    if ($ticketResponse["status"] !== 200){
      return $ticketResponse;
    }

    $stmt = $this->conn->prepare("DELETE FROM " . $this->ticketsTable . " WHERE id = ?");
    $this->id = htmlspecialchars(strip_tags($this->id));
    $stmt->bind_param("i", $this->id);

    if (!$stmt->execute()) {
      return Response::errorResponse("No se pudo eliminar el ticket");
    }
    return Response::successResponse("Ticket eliminado");
  }

  function updateTicket($data)
  {
    $ticketResponse = $this->getTicketById();
    if ($ticketResponse["status"] !== 200){
      return $ticketResponse;
    }
    if(empty($data->user_name)){
      return Response::badRequestResponse("El nombre de usuario no puede ser vacio");
    }
    if(isset($data->status) && ($data->status !== 0 && $data->status !== 1)){
      return Response::badRequestResponse("El status solo puede ser 0 o 1");
    }

    $stmt = $this->conn->prepare("UPDATE " . $this->ticketsTable . " SET user_name = ?, status = ? WHERE id= ?");
    $this->user_name = htmlspecialchars(strip_tags($data->user_name));
    $this->status = htmlspecialchars(strip_tags($data->status));
    $this->id = htmlspecialchars(strip_tags($this->id));
    $stmt->bind_param("sii", $this->user_name, $this->status, $this->id);

    if (!$stmt->execute()) {
      return Response::errorResponse("No se pudo actualizar el ticket");
    }
    return Response::successResponse("Ticket actualizado");
  }

  function closeTicket()
  {
    $ticketResponse = $this->getTicketById();
    if ($ticketResponse["status"] !== 200){
      return $ticketResponse;
    }

    $stmt = $this->conn->prepare("UPDATE " . $this->ticketsTable . " SET status = 0 WHERE id= ?");
    $this->id = htmlspecialchars(strip_tags($this->id));
    $stmt->bind_param("i", $this->id);

    if (!$stmt->execute()) {
      return Response::errorResponse("No se pudo cerrar el ticket");
    }
    return Response::successResponse("Ticket cerrado");
  }
}
