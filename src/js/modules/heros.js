

var heroCount = 0;
var currentHero = 0;
var nextHero = 1;
var circomf = 0;
var heroStart = 0;
var heroTime = 4000;
var isRotating = false;
var isHovering = false;




function rotateHero(nextHero) {
    isRotating = true;
    $( ".onepip:eq(" + currentHero + ") .pipoutline").css({"stroke-dasharray" : "0 " + circomf});
        
    /*var l = $(".one-hero.active .js_left");
    var r = $(".one-hero.active .js_right");*/
    var $ns = $(".one-hero:eq(" + currentHero + ")");
    //$ns.addClass("next");
    $ns.on("transitionend", afterFade).addClass("fader");
    /*var outleft = ($(l).position().left + $(l).width()) * -1;
    var outRight = ($(r).position().left + $(r).width());
    var leftTrans = translateCSS("translateX(" + outleft + "px)");
    var rightTrans = translateCSS("translateX(" + outRight + "px)");
   
   $(l).removeClass("noTrans").css(leftTrans);
   $(r).removeClass("noTrans").on("transitionend", afterMove).css(rightTrans);*/

}


var afterFade = function() {
    //$(".one-hero.active").off("transitionend", afterFade);
    $(".one-hero:eq(" + currentHero + ")").off("transitionend", afterFade).removeClass("active");
    $(".one-hero:eq(" + nextHero + ")").addClass("active").removeClass("next fader");

    $( ".onepip:eq(" + currentHero + ")").removeClass("active");
    currentHero = nextHero;
    nextHero = (currentHero + 1 >= heroCount) ? 0 : currentHero + 1;
    $( ".onepip:eq(" + currentHero + ")").addClass("active");
    setNextHero(nextHero);
    isRotating = false;
    runHero();
}



var intializeHero = function() {
    heroCount = $(".one-hero").length;

    for (var p=0; p<heroCount; p++) {
        $(".heros_hints").append(getPipHTML(p));
    }
    $(".heros_hints #apip_0").addClass("active");

    $(".one-hero").each(function(idx, el) {
        if (idx==0) {
            $(this).addClass('active');
        } 
    });

    $(".onepip").on("click", function(evt){
        if (!isRotating) {
            console.log("isRotating: " + isRotating);
            setNextHero($(this).index());
            rotateHero(nextHero);
        }
    });

    $(".hero-space").on("mouseenter", function(evt) {
        //console.log("OVERRRRRR");
        isHovering = true;
    });

    $(".hero-space").on("mouseleave", function(evt) {
        //console.log("OUT");
        isHovering = false;
        runHero();
    });

    var d = parseInt($( ".onepip:eq(0) .pipoutline").attr("r")) * 2;
    circomf = (d * Math.PI);
    
    runHero();
}

var runHero = function() {
    heroStart = now();
    requestAnimationFrame(heroTick);
}

var now = function() {
    return window.performance ? window.performance.now() : Date.now();
}

var heroTick = function() {

    if (!isHovering) {
        var duration = now() - heroStart;
        var perc = parseInt(circomf * (duration / heroTime));
        $( ".onepip:eq(" + currentHero + ") .pipoutline").css({"stroke-dasharray" : perc + " " + circomf});
        if (duration < heroTime && !isRotating) {
            requestAnimationFrame(heroTick);
        } else {
            //nextHero = (currentHero + 1 >= heroCount) ? 0 : currentHero + 1;
            rotateHero(nextHero);
        }
    }
}


var setNextHero = function setNextHero(idx) {
    nextHero = idx;
    $(".one-hero.next").removeClass("next");
    $(".one-hero:eq(" + idx + ")").addClass("next");
}

var getPipHTML = function getPipHTML(idx) {
    var aPip = '<svg height="20" width="20" class="onepip" id="apip_' + idx + '"><circle cx="10" cy="10" r="8" class="pip" /><circle cx="10" cy="10" r="8" class="pipoutline" /></svg>';
    return aPip;
}


export {intializeHero}