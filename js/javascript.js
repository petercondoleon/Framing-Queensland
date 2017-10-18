
/*************************************
universal functions and/or global variables

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
var isLoading = true;

/**
 * Executes when the document is ready.
 */
$(document).ready(function () {
    //let loadingScreenElement = document.createRange().createContextualFragment
    //('<div class="loadingScreen">');
    //if (document.contains(loadingScreenElement)) {
    loadingScreenSetup(false);
    // Used to notify a page that loading screen has been removed.
});

/**
 * loads an image at a give html dom pos
 * @param {string} image source
 * @param {integer} image width
 * @return {string} <img/> tag form of parsed img string
 */
function insertImage(image, width) {
    return '<img src=' + '"' + image + '"' + 'width=' + width + '/>';
}

/**
 * Transform html elements by slightly randomly roatating and adjusting them.
 * @param  {string} htmlElement a string a HtmlDOM position
 * @return {undefined}
 */
function rotateImages(htmlElement) {
    $(htmlElement).each(function () {
        var angle = Math.floor(Math.random() * 60) - 30; // randomise angle
        $(this).css("transform", "rotate(" + angle + "deg)");
        var width = Math.floor(Math.random() * 100) + 150; // randomise width
        $(this).css("width", width + "px");
    });
}

/**
 * Loading screen handling
 * @param  {Boolean} isGamepage loading screen is the premise to the gamepage
 * @return {undefined}
 */
function loadingScreenSetup(isGamepage) {
    setTimeout(function () {
        if (!isLoading) {
            $("#loadingText").text("Loaded");
            $("#loadingSpinner").attr("src", "../img/gif/loaded.gif");
            $(".loadingScreen").click(function () {
               $(this).animate({
                   bottom: "100%"
               }, 500);
               if (isGamepage) {
                   startBlurTimer(10000);
               }
           });
       } else {
           loadingScreenSetup(isGamepage);
       }
   },1000 );
}

/**
 * Blur objects
 * @param  {Object} object the jquery object
 * @param  {Number} radius the blur radius to set
 * @param  {Number} duration the time taken to blur
 * @return {undefined}
 */
function blur(object, radius, duration){
  var filterValue = 'blur(' + radius + 'px)';
  var transitionValue = 'all ' + duration + 's ease-out';
  object.css({
      'filter': filterValue,
      'webkitFilter': filterValue,
      'mozFilter': filterValue,
      'transition': transitionValue,
      '-webkit-transition': transitionValue,
      '-moz-transition': transitionValue
  });

}
