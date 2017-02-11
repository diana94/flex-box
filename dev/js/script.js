$(document).ready(function(){

    var heightMenu = 0;
    var scroll = $(window).scrollTop();
    if (scroll > 0) {
        $(".page-header").addClass("active");
    } else {
        $(".page-header").removeClass("active");
    }

    $('.hamburger').click(function() {
        heightMenu = $('.page-header .nav-bar').innerHeight();
        $(this).toggleClass('open');
        $('.page-header nav').toggleClass('open');
        $('.page-header nav').css('height', '');
        $('.page-header nav.open').css('height', heightMenu);

    });

    $(window).scroll(function() {
        scroll = $(window).scrollTop();

        if (scroll > 0) {
            $(".page-header").addClass("active");
        } else {
            $(".page-header").removeClass("active");
        }
    });
});
