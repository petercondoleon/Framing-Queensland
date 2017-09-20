/*
 * Executes when the document is ready.
 */
$(document).ready(function() {
    homepageImagesSetup(loadSLQImages(6, [0]));
    rotateImages();
});

/*
 * Basic loading screen dismiss animation
 */
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


/*
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
/* Timer and Overlay */
function start() {
    var elem = document.getElementById("timePassed"); 
    var width = 0;
    var id = setInterval(frame, 1000);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width = width + 5; 
            elem.style.width = width + '%'; 
        }
    }
}
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    start()
}