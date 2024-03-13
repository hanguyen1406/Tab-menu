<?php
$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

$index = $data['index'];
$filePath = "../user/htmlcode/".($index).".json";
$file = fopen($filePath, "w");

if ($file) {
    fwrite($file, json_encode($data['data']));
    fclose($file);
    echo "Pulish ebook ".$index." successfully.";
} else {
    echo "Error opening file.";
}
?>
