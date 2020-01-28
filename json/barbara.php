<?php
header("Access-Control-Allow-Origin: http://www.marcosbuss.com");
header('Access-Control-Allow-Credentials: true');

$jsonContent = file_get_contents('./barbara.json');

echo $jsonContent;