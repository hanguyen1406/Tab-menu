<?php
include "sever.php";

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$index = $data['index'];

try {
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $data = $data['html'];
    $stmt = $conn->prepare("update ebook set html=? where id=?");
    $stmt->bind_param("ss", $data, $index);
    $data = json_encode($data);
    $stmt->execute();
    echo "update book ".$index." vsuccessfully";
    // echo $data;
} catch(PDOException $e) {
    echo "error";
}
$conn->close();
$stmt->close();
?>
