/**
 * Executes when the document is ready.
 */
$(document).ready(function() {
// Any function calls that are universal for all pages, or global variable declarations
});

/**
 * Basic loading screen dismiss animation
 */
$("#loadingScreen").click(function() {
  $(this).animate({bottom: "100%"}, 500);
  start();
});

/**
 * loads an image at a give html dom pos
 * @param {string} image source
 * @param {integer}image width
 * @return {string} <img/> tag form of parsed img string
 */
function insertImage(image, width) {
    return '<img src='+'"'+image+'"'+'width='+width+'/>';
}

/**
 * Give images on home page a random rotation.
 */
 function rotateImages() {
   $("#photoStack img").each(function() {
     var angle = Math.floor(Math.random() * 60) - 30; // Generate random angle
     $(this).css("transform", "rotate(" + angle + "deg)");
     var width = Math.floor(Math.random() * 100) + 150; // Generate random width
     $(this).css("width", width+"px");
   });
 }
