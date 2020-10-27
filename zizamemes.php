<head>
    <link href="css/bootstrap.min.css?version=3" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Mansalva|Nothing+You+Could+Do&display=swap" rel="stylesheet">
</head>

<body>

<div class="container p-3">
    <div class="row justify-content-center">
        <div class="col-12 mb-5">
            <h1 class="text-center">Ziza Memes</h1>
            <h5 class="text-center" style="opacity: .3">I love you, Ziza</h5>
        </div>
        <?php
            $memes = glob('./zizadir/*.{png,jpeg,jpg,gif}',GLOB_BRACE|SORT_STRING);
            foreach (array_reverse($memes) as $meme){
                echo '
                <div class="col-10 col-md-7 mb-4">
                    <img
                        class="img-fluid text-center"
                        src="'.$meme.'"
                        >
                </div>';
            }
        ?>
    </div>
</div>

</body>
