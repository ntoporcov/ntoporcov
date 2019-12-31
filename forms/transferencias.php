<?php

$fail = $_GET['fail'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Formulários de Transferencias</title>

    <!-- Bootstrap -->
    <link href="../css/bootstrap.min.css" rel="stylesheet">
    <link href="../css/styles.css" rel="stylesheet">
    <link href="css/styles.css" rel="stylesheet">
</head>

<body style="min-height: 100vh;background-color: #33ccb4">

<div class="container h-100" style="padding-top: 150px">
    <div class="row justify-content-center">
        <div class="col-10 col-md-6 col-xl-6 bg-white shadow-down-light p-5">
            <div class="row">
                <div class="col-12 text-center">
                    <h1>Relatório de Transfêrencia</h1>
                </div>
            </div>
            <form method="post" class="w-100">
                <div class="contactForm row justify-content-center">
                    <div class="col-12 col-md-7">
                        <span>N# de Alunos Transferidos</span>
                        <input type="number" min="0" id="transferNumber" placeholder="N# de Alunos Transferidos" autocomplete="false" required="required">
                    </div>
                    <div class="col-12">
                        <hr>
                    </div>
                    <div class="col-12 pb-5">
                        <div class="row reasonRow">

                        </div>
                    </div>
                    <div class="col-12 col-md-8">
                        <input id="submit" type="submit" value="Enviar Relatório">
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script src="../js/jquery-3.3.1.min.js"></script>
<script src="js/scripts.js"></script>

</body>

</html>