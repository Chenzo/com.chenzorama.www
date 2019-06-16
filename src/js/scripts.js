import { intializeHero } from './modules/heros.js';
//import { trueWidthHeight } from './modules/helpers.js';


//Perhaps gulp should toggle this?
var debug = true;
var stickyNavTop;
var isStuck = false;



$(function(){

    intializeHero();

    $(".one-hero .js-hero-preload").each(function(idx, el) {
        var _this = $(this);
        preloadImage($(this).data('src'), function(imgObj) {
            $(_this).attr("src", imgObj.src);
           // $(_this).attr("ow", $(_this).width());
            trueWidthHeight(_this);
            checkForTooShort($(_this).parent(), $(_this));
        })

    });

    $(window).resize(function() {
        $(".one-hero .js-hero-preload").each(function(idx, el) {
            var _this = $(this);
            checkForTooShort($(_this).parent(), $(_this));
        });

        //stickyNavTop = $(".hero-space").outerHeight(); + $(".hero-space").offset().top;
        //stickyNav();
        getScrollY();
    });


    $(".hmbrger").on("click", function(evt){
        var $hbr = $(".hmbrger .hamburger");
        var $navbuts = $(".nav-buttons");
        if ($hbr.hasClass("is-active")) {
            $hbr.removeClass("is-active");
            $navbuts.removeClass("open");
        } else {
            $hbr.addClass("is-active");
            $navbuts.addClass("open");

        }
    });

    $(".js-open-contact").on("click", function(evt) {
        evt.preventDefault();
        $("body").addClass("modal-open");
        $(".contact-modal").addClass("opened");
    });

    $(".js-close-contact").on("click", function(evt) {
        evt.preventDefault();
        $("body").removeClass("modal-open");
        $(".contact-modal").removeClass("opened");
    })

    /*var $grid = $('.corp_logos').masonry({
      itemSelector: 'span',
      columnWidth: 200
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });*/

    var $grid = $('.corp_logos').packery({
        itemSelector: 'span',
        gutter: 40,
        percentPosition: true
    });

    $('<img/>').attr('src', '/images/cnzo_work_logos_sprite.png').one('load', function(){
       $(this).remove(); 
       $grid.packery();
    });

    $('.js-ajax-contact').on('click', function (e) {
          e.preventDefault();
          jaxForm($(".js-contact-form"));
    });


});


var stickyNav = function(scrollTop){
    //var scrollTop = $(window).scrollTop();
    if (scrollTop > stickyNavTop) { 
        $('nav').addClass('sticky');
        $(".hmbrger").removeClass("floating");
        $('nav div.cramalogo').addClass('stuck');
        isStuck = true;
    } else {
        $('nav').removeClass('sticky'); 
        $(".hmbrger").addClass("floating");
        $('nav div.cramalogo').removeClass('stuck');
        isStuck = false;
    }

    if (scrollTop > 60) {
        $(".hmbrger").addClass("bannerfix");
    } else {
        $(".hmbrger").removeClass("bannerfix");
    }
};

/*var paralaxHero = function(scrollTop) {
    
    var heroHeight = $(".hero-space").height();
    var heroImageHeight = $(".one-hero").height();
    console.log("paralax " + heroHeight, heroImageHeight);

}

*/

function checkForTooShort(space, img) {
    if ($(img, "img").height() <= $(space).height()) {
        $(space).addClass("tooShort");
    } else {
        $(space).removeClass("tooShort");
    }

    if ($(space).hasClass("tooShort") && ($(img, "img").width() <= $(space).width())) {
        $(space).removeClass("tooShort");
    }
}


function preloadImage(src, cb) {

    var imgObj = {"w" : 0, "h" : 0, "src" : src};
    $("<img/>")
    .attr("src", src)
    .load(function() {
        imgObj.w = this.width;   
        imgObj.h = this.height;
        cb(imgObj);
    });


}


var trueWidthHeight = function(imgObj) {
	$("<img/>") // Make in memory copy of image to avoid css issues
    .attr("src", $(imgObj).attr("src"))
    .load(function() {
        $(imgObj).attr("data-tW", this.width);// Note: $(this).width() will not
        $(imgObj).attr("data-tH", this.height);// work for in memory images.
    });

}






var latestKnownScrollY = 0,
    ticking = false;

function getScrollY() {
    latestKnownScrollY = (window.scrollY || window.pageYOffset);
    requestTick();
}

function requestTick() {
    if(!ticking) {
        requestAnimationFrame(update);
    }
    ticking = true;
}

function update() {
    ticking = false;

    var currentScrollY = latestKnownScrollY;

    stickyNavTop = $(".hero-space").outerHeight() + ($(".hero-space").offset().top);
    stickyNav(currentScrollY);

    //paralaxHero(currentScrollY);
}


function jaxForm(theForm) {
    $fData = theForm;
    $(".js-ajax-contact span").text("SUBMITTING...");
    console.log($fData.serialize());

    $.ajax({
        type: 'post',
        url: 'actions/contact_action',
        data: $fData.serialize(),
        success: function (data) {
            var dt = JSON.parse(data);
            //console.log(dt.code);
            $(".form_holder").css({"opacity" : "0"});
            $(".thanks_holder").show();
        }
    });
}

//window.addEventListener('resize', getScrollY, false);
window.addEventListener('scroll', getScrollY, false);
getScrollY(); //do it once to start.


