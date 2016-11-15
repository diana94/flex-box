$(document).ready(function(){

    var heightMenu = 0;

    $('.hamburger').click(function() {
        heightMenu = $('header .nav-bar').innerHeight();
        $(this).toggleClass('open');
        $('header .nav-bar_wr').toggleClass('open');
        $('header .nav-bar_wr').css('height', '');
        $('header .nav-bar_wr.open').css('height', heightMenu);

    });

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll > 0) {
            $(".container.header").addClass("active");
        } else {
            $(".container.header").removeClass("active");
        }
    });
});
