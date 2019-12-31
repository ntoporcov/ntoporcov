<head>
    <link href="css/bootstrap.min.css?version=3" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Gloria+Hallelujah|Mansalva|Nothing+You+Could+Do&display=swap" rel="stylesheet">
</head>

<body>
<div class="m-5 d-flex flex-wrap">
    <p class="w-100">Add Text Below</p>
    <textarea style="width: 500px;resize: none" onkeyup="updateVal(this)"></textarea>
    <button onclick="fontChange(1)">A+</button>
    <button onclick="fontChange(-1)">A-</button>
    <select onchange="fontFamChange($(this).val())">
        <option>Mansalva</option>
        <option>Gloria Hallelujah</option>
        <option>Nothing You Could Do</option>
    </select>
</div>

<style>
    .textBox{
        display: flex;
        align-items: center;
        height: 120px;
        width: 171px;
        position: relative;
        top: -174px;
        left: 143px;
        text-align: center;
    }
    .textBox span{
        height: fit-content;
        width: 241px;
    }
</style>


<div class="container-fluid">
    <div class="row">
        <div class="col-12">
            <img
                    class="img-fluid"
                    style="max-width: 470px;position: relative;top: -30px;"
                    src="img/tutu.png"
                    alt="man holding sign">
            <div class="textBox" style="font-family: 'Mansalva', cursive;">
                <span style="font-size: 20px"></span>
            </div>
        </div>
    </div>
</div>


<script src="js/jquery-3.3.1.min.js"></script>

<script>
    function updateVal(that){
        let value = $(that).val().replace("\n", "<br>");
        $('span').html(value);
    }
    function fontChange(change) {
        let currentSize = parseInt($('span').css('font-size').split('px')[0]);
        let newSize = currentSize + parseInt(change);
        $('span').attr('style','font-size:'+newSize+'px')
    }
    function fontFamChange(value) {
        $('.textBox').attr('style','font-family: "'+value+'", cursive;')
    }
</script>
</body>
