//Browser Stuff

var is_opera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
var is_chrome = !!window.chrome && !is_opera;
var is_explorer= typeof document !== 'undefined' && !!document.documentMode && !isEdge;
var is_firefox = typeof window.InstallTrigger !== 'undefined';
var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

if(is_safari){
    $('.nav').attr('style','margin-top: 40px;');
}

if(is_firefox && navigator.platform.indexOf('Win') > -1){
    $('.nav').attr('style','margin-top: 40px;');
}


$(window).on("scroll", function() {
    let cover = $('#cover');
    //gets window position
    let position = parseInt($(window).scrollTop());

    //variables for cover animation
    let scaleVal = (1 + (position/5)/3);
    let rotateVal = (1 + position-225)/4;
    let upVal = (1 + ((position-990)/50));

    //Just controls cover animation

    //prevent overscroll on mobile
    if(position<0){
        cover.attr('style', '');
    }else{
        //if scale is below this, grow it
        if(scaleVal<64){
            //after scale is larger than this, start to rotate it
            if (scaleVal>17){
                cover.attr('style', 'transform:scale('+scaleVal+')rotate(-'+rotateVal+'deg)translateY(0);');

                if(rotateVal>180){
                    cover.attr('style', 'transform:scale('+scaleVal+')rotate(-180deg)translateY(0);');
                }
                //
            }else if (scaleVal<17){
                cover.attr('style', 'transform:scale(' + scaleVal + ')rotate(0)translateY(0);');
            }

            // after scale hits 60, just bring it up
        }else{
            //then just scroll it up
            cover.attr('style', 'transform:scale(64)rotate(-180deg)translateY('+upVal+'px)');
        }

        // // controls nav menu
        if (position>1000){
            $('.nav').addClass('on');
        }else{
            $('.nav').removeClass('on');
        }

        let heightDiff = 550;
        let aboutPosition = $('#about').offset().top - heightDiff;
        let skillsPosition = $('#skills').offset().top - heightDiff;
        let experiencePosition = $('#experience').offset().top - heightDiff;
        let projectsePosition = $('#projects').offset().top - heightDiff;
        let formPosition = $('#form').offset().top - heightDiff;

        if(position > aboutPosition && position < skillsPosition){
            $('.nav-item:nth-child(1)').addClass('on');
        }else{
            $('.nav-item:nth-child(1)').removeClass('on');
        }

        if(position > skillsPosition && position < experiencePosition){
            $('.nav-item:nth-child(2)').addClass('on');
        }else{
            $('.nav-item:nth-child(2)').removeClass('on');
        }

        if(position > experiencePosition && position < projectsePosition){
            $('.nav-item:nth-child(3)').addClass('on');
        }else{
            $('.nav-item:nth-child(3)').removeClass('on');
        }

        if(position > projectsePosition && position < formPosition){
            $('.nav-item:nth-child(4)').addClass('on');
        }else{
            $('.nav-item:nth-child(4)').removeClass('on');
        }

        if(position > formPosition){
            $('.nav-item:nth-child(5)').addClass('on');
        }else{
            $('.nav-item:nth-child(5)').removeClass('on');
        }
    }
});

$('.nav-item').on('click',function (e) {
    let target = $(this).find('a').attr('href');
    let source = $(this).find('a');

    if(target.indexOf("#")>=0){
        e.preventDefault();
        if (source.hasClass('scrollDown')){
            $('html, body').animate({
                scrollTop: $(target).offset().top-150
            }, 1000);
        }
    }
});

$('#scrollBtn').on('click',function (e) {
   e.preventDefault();
    $('html, body').animate({
        scrollTop: $(".content-container").offset().top-200
    }, 1000);
});

// shows assistant for scroll
$(document).ready(function () {
    setTimeout(function () {
            $('.scrollAssistant').addClass('on');
    },500);
});


// skill toggles functionality
$(document).ready(function () {
    let skillBox = $('.skillBox');

    skillBox.filter('.advanced').each(function(i) {
        $(this).find('.appendHere').append('<i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>')
    });
    skillBox.filter('.intermediate').each(function(i) {
        $(this).find('.appendHere').append('<i class="fas fa-star"></i><i class="fas fa-star"></i>')
    });
    skillBox.filter('.basic').each(function(i) {
        $(this).find('.appendHere').append('<i class="fas fa-star"></i>')
    });
});

$('.toggle').on('click',function () {
    let skillLevel = $(this).parents('.toggleBox').data('skill-level');
    let thisElement = $(this);

    $(this).toggleClass('on');

    $('.'+skillLevel).toggleClass('d-none');

    let currentCount = parseInt($('.toggleCenter').attr('data-toggle-count'));

    if(thisElement.hasClass('on')){
        $('.toggleCenter').attr('data-toggle-count',currentCount+1);
        $('.skillRow').removeClass('d-none');
        $('.skillText').addClass('d-none');
    }else if(currentCount===1){
        $('.skillRow').addClass('d-none');
        $('.toggleCenter').attr('data-toggle-count',currentCount-1);
        $('.skillText').removeClass('d-none');
    }else {
        $('.toggleCenter').attr('data-toggle-count',currentCount-1);
    }
});

$('.toggleBox').hover(function () {
    let skillLevel = $(this).data('skill-level');

   $('.'+skillLevel).toggleClass('on');
});


// project little things
$('.projectTitle').on('click',function () {
    $(this).parents('.projectExpand').find('.collapse').collapse('toggle');
});

$('.projectContent').on('hidden.bs.collapse', function () {
    $(this).parents('.projectExpand').find('svg').attr('data-prefix','far').attr('data-icon','chevron-circle-down')
});
$('.projectContent').on('show.bs.collapse', function () {
    $(this).parents('.projectExpand').find('svg').attr('data-prefix','fas').attr('data-icon','chevron-circle-up')
});

//contact form little thingies

let allInputs = $('.contactForm input,.contactForm textarea');
let name = $('#name');
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

$('.contactForm').on('submit',function (e) {
    e.preventDefault();

    if(name.val().length>0 && email.val().length>0 && msg.val().length>0){
        $.ajax({
            type: "POST",
            url: 'form.php',
            data:{
                'name':name.val(),
                'email':email.val(),
                'msg':msg.val()
            },
            success: function (data) {
                if(data==='success'){
                    $('#submit').parent().remove();
                    $('.successMsg').removeClass('d-none').addClass('d-flex');
                }else if(data==='fail'){
                    $('#submit').parent().remove();
                    $('.errorMsg').removeClass('d-none').addClass('d-flex');
                }
            },
            dataType:'text'
        });
    }
});



console.log(
  '\n' +
    ' -----     -----    ----      \n' +
    '|*****|   |*****|  |****|     \n' +
    '|*****|   |*****|   ----      \n' +
    '|******---******|   ____      \n' +
    '|***************|  |****|     \n' +
    '|******---******|  |****|     \n' +
    '|*****|   |*****|  |****|     \n' +
    '|*****|   |*****|  |****|     \n' +
    ' -----     -----    ----      \n' +
    '\n' +
    'I\'m glad you\'re looking further :D \n' +
    'Feel free to email me too at ntoporcov@me.com'
);