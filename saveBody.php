<?php
$htmlContent = $_POST['htmlContent'];

$filePath = "index.html";
$file = fopen($filePath, "w");
if ($file) {
    fwrite($file, $htmlContent);
    fclose($file);
    echo "HTML content saved to index.html successfully.";
} else {
    echo "Error opening file.";
}
?>
