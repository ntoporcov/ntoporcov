
//contact form little thingies

let allInputs = $('.contactForm input,.contactForm textarea');
let transferN = $('#transferNumber');
let email = $('#email');
let msg = $('#message');

allInputs.focus(function () {
    $(this).parent().addClass('on');
    if($(this).attr('data-placeholder')===undefined){
        $(this).attr('data-placeholder',$(this).attr('placeholder'));
    }
    $(this).attr('placeholder','');
});

allInputs.blur(function () {
    if($(this).val().length===0){
        $(this).parent().removeClass('on');
        $(this).attr('placeholder',$(this).attr('data-placeholder'))
    }
});

transferN.on('change keyup',function () {
    $('.reasonRow').html('');

    let amount = transferN.val();

    for (i = 1; i <= amount; i++){
        $('.reasonRow').append(
            '<div class="col-12">\n' +
            '    <p class="font-weight-bold">Razão de Transferência | Aluno '+i+'</p>\n' +
            '    <div class="form-check">\n' +
            '        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>\n' +
            '        <label class="form-check-label" for="exampleRadios1">\n' +
            '            Razão 1\n' +
            '        </label>\n' +
            '    </div>\n' +
            '    <div class="form-check">\n' +
            '        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">\n' +
            '        <label class="form-check-label" for="exampleRadios2">\n' +
            '            Razão 2\n' +
            '        </label>\n' +
            '    </div>\n' +
            '    <hr>\n' +
            '</div>'
        )
    }
});