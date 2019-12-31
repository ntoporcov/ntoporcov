<?php

include 'resume.php';

$tab = $_POST['tab'];
$location = $_POST['location'];

$charN = strlen($tab);

$currentLocation='root';

switch (count($location)){
    case 1:
        $currentLocation = $resume[$location[0]];
        break;
    case 2:
        $currentLocation = $resume[$location[0]] [$location[1]];
        break;
    case 3:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]];
        break;
    case 4:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]] [$location[3]];
        break;
    case 5:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]] [$location[3]] [$location[4]];
        break;
    case 6:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]] [$location[3]] [$location[4]] [$location[5]];
        break;
}

$fullKey='';

foreach (array_keys($currentLocation) as $key){

    $keyCut = substr($key,0,$charN);

    if ($keyCut === $tab){
        $fullKey = $key;
    }
}

echo $fullKey;