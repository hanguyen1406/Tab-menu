<?php
$jsonData = file_get_contents('php://input');
$jsonData = json_decode($jsonData, true);
$filePath = "./htmlcode/config.json";

$file1 = fopen($filePath, "w");
$noli = $jsonData['noli']['noli'];
$file2 = fopen("./htmlcode/".$noli.".json", "w");
$data = $jsonData['tabCt'];
if ($file1) {
    fwrite($file1, json_encode($jsonData['noli'], true));
    fwrite($file2, json_encode($data));
    fclose($file1);
    fclose($file2);
    echo "Saved config";
} else {
    echo "Error";
}
?>
