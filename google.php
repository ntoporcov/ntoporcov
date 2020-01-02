<?php

$term = $_GET['q'];
$google = file_get_contents('http://suggestqueries.google.com/complete/search?client=chrome&q='.$term);

$suggestion = json_decode($google)[1][0];

echo $suggestion;
