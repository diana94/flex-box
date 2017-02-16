$(document).ready(function(){

    var heightMenu = 0;
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
        $(".header").addClass("active");
    } else {
        $(".header").removeClass("active");
    }

    $('.hamburger').click(function() {
        heightMenu = $('.header .nav-bar').innerHeight();
        $(this).toggleClass('open');
        $('.header nav').toggleClass('open');
        $('.header nav').css('height', '');
        $('.header nav.open').css('height', heightMenu);

    });

    $(window).scroll(function() {
        scroll = $(window).scrollTop();

        if (scroll > 0) {
            $(".header").addClass("active");
        } else {
            $(".header").removeClass("active");
        }
    });
});
