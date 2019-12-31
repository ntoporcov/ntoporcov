<?php

$password = $_POST['password'];
$domain = $_SERVER['HTTP_HOST'];

$passwordCheck = 'toporcov';

if($password !== $passwordCheck){
    header("Location:https://ntoporcov.com");
}

?>

<!doctype html>
<html lang="en">

<head>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-60234062-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-60234062-1');
    </script>



    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Nic's Snippets</title>

    <link rel="shortcut icon" href="https://ntoporcov.com/img/favicon.ico" type="image/x-icon"/>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/terminal.css" rel="stylesheet">
    <link href="css/svg-with-js.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,700|Montserrat:300,400,700" rel="stylesheet">
</head>

<body>
<div class="container p-5 text-center">

    <div class="row">
        <div class="col-12">
            <h1>Welcome, Nic</h1>
            <span>Here are all your snippets</span>
        </div>
    </div>

    <div class="row pt-5 pb-5">
        <div class="col-12">
            <h2>Standard HTML Stuff</h2>
            <p>Just stuff that you need to type every time when you start a new document</p>
        </div>
        <div class="col-12">
            <label>
                <textarea name="standard format" style="height: 600px" class="p-4" disabled="disabled" >
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- SEO Stuff-->
    <title>Title Goes Here</title>
    <meta property="description" content="DESCRIPTION GOES HERE">
    <meta property="og:title" content="TITLE GOES HERE">
    <meta property="og:description" content="DESCRIPTION GOES HERE">
    <meta property="og:url" content="URL GOES HERE">

    <meta property="og:image" content="thumbnail.jpg">
    <meta name="image" itemprop="image" content="thumbnail.jpg">
    <meta name="thumbnail" itemprop="thumbnailUrl"  content="thumbnail.jpg">

    <link rel="shortcut icon" href="icon.ico" type="image/x-icon"/>

    <!-- HEAD Links go here -->
</head>
<body>

<!--In Body Scripts go Here-->
</body>
</html></textarea>
            </label>
        </div>
    </div>

    <div class="row pt-5 pb-5">
        <div class="col-12">
            <h2>Bootstrap 4.3.1 CDN Link</h2>
            <p>Easy to get to <a href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">CDN Link</a></p>
        </div>
        <div class="col-12">
            <label>
                <textarea name="standard format" style="height: 75px" class="p-4" disabled="disabled">
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet"></textarea>
            </label>
        </div>
    </div>

    <div class="row pt-5 pb-5">
        <div class="col-12">
            <h2>JQuery 3.4.1 CDN Link</h2>
            <p>Easy to get to <a href="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js">CDN Link</a></p>
        </div>
        <div class="col-12">
            <label>
                <textarea name="standard format" style="height: 75px" class="p-4" disabled="disabled">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script></textarea>
            </label>
        </div>
    </div>

</div>


<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/snippets.js"></script>
</body>
</html>