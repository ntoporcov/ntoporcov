<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"/>

    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Nicolas Toporcov</title>
    <meta property="og:title" content="Nic Toporcov Resume Terminal">

    <meta property="og:image" content="https://ntoporcov.com/img/meta-cover.png">
    <meta name="image" itemprop="image" content="https://ntoporcov.com/img/meta-cover.png">
    <meta name="thumbnail" itemprop="thumbnailUrl"  content="https://ntoporcov.com/img/meta-cover.png">
    <meta property="twitter:image"  content="https://ntoporcov.com/img/meta-cover.png">

    <link rel="shortcut icon" href="https://ntoporcov.com/img/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" href="/css/terminal.css" type="text/css"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"/>

</head>

<body style="color:<?=$_GET['color']?>">
<span class="response">Welcome to Nic's Terminal Resume 1.0! This terminal was a fun idea I had to allow for a more interactive way to view my resume and the things that matter the most to you.</span>
<span><span>visitor:~ user$&nbsp;</span><span class="command"></span></span>
<div id="newrows"></div>
<form>
    <input>
    <button type="submit"></button>
</form>
<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/terminal.js"></script>
</body>
</html>