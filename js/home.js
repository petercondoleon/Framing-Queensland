/* Home Page JavaScript */

/**
 * Executes when the document is ready.
 */
$(document).ready(function() {
    animateLogo();
});

/*
 * Gets the sky design logo and plays the blink animation.
 */
function animateLogo() {
    $('#skyDesignLogo img').attr("src", "/svg/logo2.svg");
    setTimeout(function() {
        $('#skyDesignLogo img').attr("src", "/svg/logo3.svg");
    }, 20);
    setTimeout(function() {
        $('#skyDesignLogo img').attr("src", "/svg/logo2.svg");
    }, 55);
    setTimeout(function() {
        $('#skyDesignLogo img').attr("src", "/svg/logo1.svg");
    }, 75);
    // Generate random repeat time between 5s and 15s
    var timeout = Math.floor(Math.random() * 10000) + 5000;
    setTimeout(animateLogo, timeout);
}
