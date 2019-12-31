let input = $('input');
let command = $(document).find('.command');
let terminalLocation = ['root'];

function focusOnInput(){
    input.focus();
}

$(document).ready(function () {
    focusOnInput();
});

$(window).on('click touchstart',function () {
    focusOnInput();
});

input.on('keyup',function (e) {
    let typed = $(input).val();
    command.html(typed);

   command.addClass('typing');
   setTimeout(function () {
       command.removeClass('typing');
   },500);

   if(e.which === 32){
       command.html(decodeURI(typed)+'&nbsp;');
   }

   if(e.which === 9){
       let typedArr = typed.split(' ');
       if (typedArr.length > 1){
           if(typedArr[0] === 'cd' ||  typedArr[0] === 'cat')
           $.ajax({
               method: "POST",
               url: "autocomplete.php",
               data: {
                   tab: typedArr[1],
                   location: terminalLocation
               },
           })
               .done(function(data) {
                   if(data.length > 0){
                       let newValue = typedArr[0]+' '+data;
                       $(document).find('.command').html(newValue);
                       $(input).val(newValue);
                       focusOnInput();
                   }
               });
       }
   }

    $([document.documentElement, document.body]).animate({
        scrollTop: $(document).find('.response').last().offset().top
    });
});


$('button').on('focus',function () {
   focusOnInput();
});

$('form').on('submit',function (e) {
    e.preventDefault();
    let typed = $(input).val();
    let typedArray = typed.split(' ');


    $.ajax({
        method: "POST",
        url: "backend.php",
        data: {
            command: typedArray,
            location: terminalLocation
        },
    })
        .done(function(data) {
            let response = JSON.parse(data);
            let message;

            switch (response.command[0]) {
                default:
                    message = response.msg;
                    break;

                case 'cd':
                    if(response.msg === null){
                        message = response.location.join('/');
                        terminalLocation = response.location;
                    }else{
                        message = response.msg;
                    }
                    break;

                case 'color':
                    $('body').attr('style','color:'+response.msg);
                    message = 'New Color: '+response.msg;
                    break;

                case 'run':
                    if(response.command[1] === 'snippets'){
                        $('body').append(
                            '<form method="post" id="snippetsForm" action="../snippets" style="display: none"><input type="hidden" name="password" value="toporcov"></form>'
                        );
                        document.getElementById('snippetsForm').submit();
                    }
                    message = 'Redirecting...'
            }

            function getVisitorLocation(){
                let lastElement = response.location[(response.location.length)-1];

                if (lastElement === 'root'){
                    return '~';
                }else{
                    return lastElement;
                }
            }

            command.removeClass('command');
            $('#newrows').append(
                '<span class="response">'+message+'</span>' +
                '<span><span>visitor:'+getVisitorLocation()+' user$&nbsp;</span><span class="command"></span></span>\n'
            );
            input.val('');
            command = $(document).find('.command');
            $('.command').focus();
        });
});


