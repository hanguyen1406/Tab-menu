<?php
// Check if a file was uploaded
if(isset($_FILES["imageFile"]) && $_FILES["imageFile"]["error"] == 0){
    $allowedExtensions = array("jpg", "jpeg", "png");
    $fileExtension = strtolower(pathinfo($_FILES["imageFile"]["name"], PATHINFO_EXTENSION));

    // Check file extension
    if(in_array($fileExtension, $allowedExtensions)){
        // Set destination directory
        $uploadDir = "./img/";
        $uploadPath = $uploadDir . basename($_FILES["imageFile"]["name"]);

        // Move uploaded file to server
        if(move_uploaded_file($_FILES["imageFile"]["tmp_name"], $uploadPath)){
            echo "Image uploaded successfully!";
        } else {
            echo "Error uploading image!";
        }
    } else {
        echo "Invalid file format! Please upload an image.";
    }
} else {
    echo "No image uploaded or an error occurred!";
}
?>
