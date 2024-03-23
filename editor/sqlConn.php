<?php

$servername = "103.200.23.160"; // Replace with your MySQL server hostname or IP address
$username = "hanguye4_admin"; // Replace with your MySQL username
$password = "Hanhat56789"; // Replace with your MySQL password
$database = "hanguye4_guitar"; // Replace with your MySQL database name
$id = $_POST['id'];

try {
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "select * from Ebook where id=".$id;
    $result = $conn->query($sql);

    if ($result === false) {
        echo "error";
    } else {
        while ($row = $result->fetch_assoc()) {
            echo "{\"index\": ".$row["html"]."}";
        }
    }
    
    // echo "Connected successfully";

} catch(PDOException $e) {
    // If connection fails, catch and display the error
    echo "error";
}

$conn->close();

?>
