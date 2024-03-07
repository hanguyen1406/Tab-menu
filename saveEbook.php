<?php
$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$index = $data['index'];
$filePath = "htmlcode/".($index).".json";
$file = fopen($filePath, "w");

if ($file) {
    fwrite($file, json_encode($data['data']));
    fclose($file);
    echo "Save ebook ".$index." successfully.";
} else {
    echo "Error opening file.";
}
?>
