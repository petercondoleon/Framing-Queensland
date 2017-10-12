/* Home Page JavaScript */

/**
 * Executes when the document is ready.
 */
$(document).ready(function() {
    loadSLQImagesHomepage(6);
    animateLogo();
});

/*
 * Gets the sky design logo and plays the blink animation.
 */
function animateLogo() {
    $('#skyDesignLogo img').attr("src", "../img/svg/logo2.svg");
    setTimeout(function() {
        $('#skyDesignLogo img').attr("src", "../img/svg/logo3.svg");
    }, 40);
    setTimeout(function() {
        $('#skyDesignLogo img').attr("src", "../img/svg/logo2.svg");
    }, 110);
    setTimeout(function() {
        $('#skyDesignLogo img').attr("src", "../img/svg/logo1.svg");
    }, 150);
    // Generate random repeat time between 5s and 15s
    var timeout = Math.floor(Math.random() * 10000) + 5000;
    setTimeout(animateLogo, timeout);
}

/**
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
