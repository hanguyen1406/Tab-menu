<?php
$jsonData = file_get_contents('php://input');
$jsonData = json_decode($jsonData, true);

$noli = $jsonData['noli'];
$data = $jsonData['tabCt'];

$servername = "103.200.23.160"; // Replace with your MySQL server hostname or IP address
$username = "hanguye4_admin"; // Replace with your MySQL username
$password = "Hanhat56789"; // Replace with your MySQL password
$database = "hanguye4_guitar"; // Replace with your MySQL database name

try {
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $stmt = $conn->prepare("INSERT INTO Ebook (id, html) VALUES (?, ?)");
    $stmt->bind_param("ss", $noli, $data);
    $data = json_encode($data);
    $stmt->execute();
    echo "Insert ebook ".$noli." successfully";
} catch(PDOException $e) {
    echo "error";
}

$stmt->close();
$conn->close();

?>
