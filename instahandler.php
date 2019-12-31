
<?php

$link = $_POST['link'];

function get_http_response_code($url) {
    $headers = get_headers($url);
    return substr($headers[0], 9, 3);
}


if(get_http_response_code($link) != "200"){
    echo "BAD URL      , BAD URL         ";
}else{
    $html = file_get_contents($link);

//Drops all lines that don't matter
    $DROPbefore = strstr($html, 'property="og:description" content="');

//Drops all lines after what matters
    $DROPafter = strstr($DROPbefore, '<meta property="fb:app_id"',true);

    $contentProperty = explode('"',$DROPafter);

    $data = explode('-',$contentProperty[3]);

    echo $data[0];
}