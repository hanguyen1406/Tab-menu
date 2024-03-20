<?php

// MySQL database connection parameters
$servername = "103.200.23.160"; // Replace with your MySQL server hostname or IP address
$username = "hanguye4_admin"; // Replace with your MySQL username
$password = "Hanhat56789"; // Replace with your MySQL password
$database = "hanguye4_guitar"; // Replace with your MySQL database name

try {
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    $sql = "select * from Ebook";
    $result = $conn->query($sql);

    // Check if query was successful
    if ($result === false) {
        echo "Error: " . $sql . "<br>" . $conn->error;
    } else {
        // Fetch and output results
        while ($row = $result->fetch_assoc()) {
            echo $row["html"] . "<br>";
        }
    }
    echo "Connected successfully";

    // Perform your database operations here...

} catch(PDOException $e) {
    // If connection fails, catch and display the error
    echo "Connection failed: " . $e->getMessage();
}

// Close connection (PDO doesn't require explicit closing, but it's good practice)
$conn = null;

?>
