<?php
header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
header('Access-Control-Allow-Credentials: true');

$jsonContent = file_get_contents('./barbara.json');

echo $jsonContent;