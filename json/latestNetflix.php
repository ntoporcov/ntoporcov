<?php
include "allowCORS.php";

$jsonContent = file_get_contents('./latestNetflix.json');

echo $jsonContent;