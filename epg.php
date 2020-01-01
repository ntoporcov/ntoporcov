<?php
$username=$_GET['username'];
$password=$_GET['password'];
$url = htmlspecialchars_decode('http://nitro.ltd:25461/xmltv.php?username=WkdQUwvcym&password=JLQp2oor9y')
$xml = file_get_contents($url);
echo $xml;
?>
