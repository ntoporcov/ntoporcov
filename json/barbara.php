<?php
include "allowCORS.php";

$jsonContent = file_get_contents('./barbara.json');

echo $jsonContent;