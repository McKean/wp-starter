/**
 * Created by peak2top
 */


$(document).ready(function($){
    $('.slick').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        nextArrow: '.gallery .next',
        prevArrow: '.gallery .prev',
        centerPadding: 0,
        autoplay: true,
        autoplaySpeed: 8000
    });

    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: '.gallery .next',
        prevArrow: '.gallery .prev',
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
    });

    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
         var $target = $(this.hash);
         scrollTo($target);
    });

});

$('.menu .button').on('mousedown', function() {
    $(this).find('i').toggleClass('ion-close');
    $(this).find('i').toggleClass('ion-navicon-round');
    $('.menu .menu-main-menu-container ul').slideToggle();
});


function scrollTo(target) {
    $('html, body').animate({
        scrollTop: target.offset().top
    }, 400);
}

$(function () { // wait for document ready
    // init
    var controller = new ScrollMagic.Controller();

    // define movement of panels
    var wipeAnimation = new TimelineMax()
        .fromTo("section.panel.blue", 1, {y: "0%"}, {y: "-20%", ease: Linear.easeNone, delay: 0.5}, '-=0')
        .fromTo("section.panel.turqoise", 1, {y: "100%"}, {y: "-40%", ease: Linear.easeNone, delay: -1.0})
        .fromTo("section.panel.green",    1, {y:  "100%"}, {y: "-40%", ease: Linear.easeNone, delay: -0.3})
        .fromTo("section.panel.bordeaux", 1, {y: "100%"}, {y: "-50%", ease: Linear.easeNone, delay: 0.8});

    // create scene to pin and link animation
    new ScrollMagic.Scene({
            triggerElement: "#pinContainer",
            // triggerHook: "onLeave",
            duration: "300%"
        })
        // .setPin("#pinContainer")
        .setTween(wipeAnimation)
        .addIndicators() // add indicators (requires plugin)
        .addTo(controller);
});
