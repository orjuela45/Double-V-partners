<?php

class Database
{
  private $host     = 'db';
  private $user     = 'root';
  private $password = "p4rtn3rs";
  private $database = "double-v-partners-database";

  public function getConnection()
  {
    $conn = new mysqli($this->host, $this->user, $this->password, $this->database);
    if ($conn->connect_error) {
      die("Error intentado conectar a la base de datos: " . $conn->connect_error);
    } else {
      return $conn;
    }
  }
}
