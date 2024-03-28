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
    $sql = "UPDATE ebookpublish t2 JOIN ebook t1 ON t2.id = t1.id SET t2.html = t1.html WHERE t2.id = ".$index;
    if ($conn->query($sql) === TRUE) {
        echo "publish successfully";
    } else {
        echo "Error : " . $conn->error;
    }
} catch(PDOException $e) {
    echo "error";
}

$conn->close();

?>
