
//helpers...

(function(){
    //saving the original console.log function
    var oldConsoleLog = console.log;

    //overriding console.log function
    console.log = function() {

        if(window.console && debug == true) {
	        oldConsoleLog.apply(console, arguments);
	    }

    }
})();


var trueWidthHeight = function(imgObj) {
	$("<img/>") // Make in memory copy of image to avoid css issues
    .attr("src", $(imgObj).attr("src"))
    .load(function() {
        $(imgObj).attr("data-tW", this.width);// Note: $(this).width() will not
        $(imgObj).attr("data-tH", this.height);// work for in memory images.
    });

}






var translateCSS = function(tfrm) {
    var rt = {"-webkit-transform":tfrm, 
    "-moz-transform":tfrm, 
    "-0-transform":tfrm, 
    "-ms-transform":tfrm,
    "transform":tfrm}
    return rt;
}


export {trueWidthHeight}