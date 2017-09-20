/*
 * Executes when the document is ready.
 */
$(document).ready(function() {
    homepageImagesSetup(loadSLQImages(6, [0]));
});

$("#loadingScreen").click(function() {
  $(this).animate({bottom: "100%"}, 500);
});

/*
* Sets up homepage with images.
* @param {Object[]} an array of objects containing images
*/
function homepageImagesSetup(jsonImages) {
    $("#photoCall img").replaceWith("<ul></ul>");
    for (var i = 0; i < jsonImages.length; i++) {
        console.log(jsonImages[i].image);
        $("#photoCall ul").append(
            "<li>"+insertImage(jsonImages[i].image,200)+"</li>"
        )
    }
}

/*
* loads an image at a give html dom pos
* @param {string} image source
* @param {integer}image width
* @return {string} <img/> tag form of parsed img string
*/
function insertImage(image, width) {
    return '<img src='+'"'+image+'"'+'width='+width+'/>';

}
