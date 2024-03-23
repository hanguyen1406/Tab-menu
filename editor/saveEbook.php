<?php
$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$servername = "103.200.23.160"; // Replace with your MySQL server hostname or IP address
$username = "hanguye4_admin"; // Replace with your MySQL username
$password = "Hanhat56789"; // Replace with your MySQL password
$database = "hanguye4_guitar"; // Replace with your MySQL database name

$index = $data['index'];

try {
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $data = $data['html'];
    $stmt = $conn->prepare("update Ebook set html=? where id=?");
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
