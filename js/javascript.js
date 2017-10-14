/*************************************
universal functions and/or global variables

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
/**
 * Executes when the document is ready.
 */
$(document).ready(function () {
    loadingScreenSetup(false);
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
    $(".loadingScreen").click(function () {
        $(this).animate({
            bottom: "100%"
        }, 500);
        if (isGamepage) {
            startBlurTimer();
        }
    });
}
