$('label').on('click',function () {
    $('.copyConfirmation').remove();
    $('.copied').removeClass('copied');
    $(this).find('textarea').focus().addClass('copied');
    document.execCommand('selectAll');
    document.execCommand('copy');

    $(this).parent().append('<span class="copyConfirmation">Copied</span>')
});