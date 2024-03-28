<?php
include "sever.php";

$jsonData = file_get_contents('php://input');
$jsonData = json_decode($jsonData, true);

$noli = $jsonData['noli'];
$data = $jsonData['tabCt'];

try {
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $stmt = $conn->prepare("INSERT INTO ebook (id, html) VALUES (?, ?)");
    $stmt->bind_param("ss", $noli, $data);
    $data = json_encode($data);
    $stmt->execute();
    $stmt2 = $conn->prepare("INSERT INTO ebookpublish (id, html) VALUES (?, ?)");
    $stmt2->bind_param("ss", $noli, $data);
    $stmt2->execute();
    echo "Insert ebook ".$noli." successfully";
} catch(PDOException $e) {
    echo "error";
}

$stmt->close();
$conn->close();

?>
