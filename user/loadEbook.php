<?php
include "../editor/sever.php";
$id = $_POST['id'];

try {
    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "select * from ebookpublish where id=".$id;
    $result = $conn->query($sql);

    if ($result === false) {
        echo "error";
    } else {
        while ($row = $result->fetch_assoc()) {
            echo "{\"index\": ".$row["html"]."}";
        }
    }

} catch(PDOException $e) {
    // If connection fails, catch and display the error
    echo "error";
}

$conn->close();


?>