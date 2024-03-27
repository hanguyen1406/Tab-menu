<?php
include "sever.php";

$id = $_POST['id'];

try {
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "delete from ebook where id=".$id;
    $result = $conn->query($sql);

    if ($result === false) {
        echo "error";
    } else {
        echo "success";
    }

} catch(PDOException $e) {
    // If connection fails, catch and display the error
    echo "error";
}

$conn->close();

?>
