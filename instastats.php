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
    <title>Instagram Stats</title>

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">    <link href="css/svg-with-js.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Comfortaa:300,700|Montserrat:300,400,700" rel="stylesheet">
</head>

<style>
    table{
        width: 100%;
    }
    thead{
        background: #292929;
        color: white;
        padding: 20px;
    }
</style>

<body>
    <div class="container p-5">
        <div class="row justify-content-center preTable">
            <div class="col-12 ">
                <h1 class="text-center">Add Your Instagram Links Here</h1>
                <p class="text-center mb-2">Only one link per line and only links in the following format:</p>
                <pre class="text-center">https://www.instagram.com/p/XYZXYZXYZXYZ/</pre>
            </div>
            <div class="col-12">
                <textarea class="w-100" id="instaLinks" rows="20" cols="10">https://www.instagram.com/p/XyZXYzXyz/
https://www.instagram.com/p/XyZXYzXyz/</textarea>
            </div>
            <div class="col-3">
                <button class="btn-primary rounded w-100 p-3" id="createTable">Create Table</button>
            </div>
        </div>
        <div class="row justify-content-center postTable d-none">
            <div class="col-12 ">
                <h1 class="text-center">Alright! We got your links.</h1>
                <p class="text-center mb-2">Now you just have to click the button below.</p>
            </div>
            <div class="col-10">
                <p class="text-center mb-2">This may take a while though, and results will appear as we get them, so sit back and hang tight. Don't close the browser, just let it do its thing and you'll see a message when we're done</p>
            </div>
            <div class="col-3 pt-4 pb-4">
                <button class="btn-danger rounded w-100 p-3" id="getData">Get Data!</button>
            </div>
            <div class="col-12 pt-5 pb-5 d-none">
                <h2 class="text-center">It started! :)</h2>
                <p class="doneMsg d-none text-center">You should be able to copy and paste this into a spreadsheet directly from the table.</p>
                <div class="progress" style="height: 40px;font-size: 18px;font-weight: 500">
                    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 1%"></div>
                </div>
            </div>
            <div class="col-12 pr-5 pl-5 pb-5">
                <table class="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Link</th>
                        <th scope="col">Likes</th>
                        <th scope="col">Comments</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        </div>
    </div>

</body>

<script src="js/jquery-3.3.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>

<script>
    let linksArr = [];

    $('#createTable').on('click',function () {
        let links = $('#instaLinks').val();
        linksArr = links.split('\n');

        $.each(linksArr,function (i,val) {
           $('tbody').append(
               '<tr>' +
               '    <td class="link">'+val+'</td>' +
               '    <td class="likes">' +
               '        <div class="spinner-border d-none" role="status">\n' +
               '            <span class="sr-only">Loading...</span>\n' +
               '        </div>' +
               '    </td>' +
               '    <td class="comments">' +
               '        <div class="spinner-border d-none" role="status">\n' +
               '            <span class="sr-only">Loading...</span>\n' +
               '        </div>' +
               '    </td>' +
               '</tr>');
        });

        $('.preTable').addClass('d-none');
        $('.postTable').removeClass('d-none');
    });

    let dataCounter = 0;

    function requestData(){
        $.ajax({
            method: "POST",
            url: "instahandler.php",
            data: {link:linksArr[dataCounter]},
            beforeSend: function() {
                let tr = $('tr:nth-child('+(dataCounter+1));

                tr.find('.likes > .spinner-border').removeClass('d-none');
                tr.find('.comments > .spinner-border').removeClass('d-none');

                $('#getData').parent().addClass('d-none');
                $('.progress').parent().removeClass('d-none');
            }
        })
            .done(function( data ) {
                let dataSplit = data.split(', ');
                let tr = $('tr:nth-child('+(dataCounter+1));
                let likes = dataSplit[0].substring(0, dataSplit[0].length - 6);
                let comments = dataSplit[1].substring(0, dataSplit[1].length - 9);

                tr.find('.likes').html(likes);
                tr.find('.comments').html(comments);

                let currentProgress = Math.round(((dataCounter+1) / linksArr.length)*100);
                $('.progress-bar').attr('style','width:'+currentProgress+'%').html(currentProgress+'%');

                dataCounter++;
                if(dataCounter<linksArr.length){
                    requestData();
                }else{
                    $('h2').html('It\'s done!');
                    $('.progress-bar').addClass('bg-success');
                    $('.doneMsg').removeClass('d-none');
                }
            });
    }

    $('#getData').on('click',function () {
        requestData();
    });

</script>