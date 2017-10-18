/*************************************
Homepage handling

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
/**
 * Executes when the document is ready.
 */
$(document).ready(function () {
    loadSLQImagesHomepage(6);
    animateLogo();
    setupHelpMenu();
});

/*
 * Gets the sky design logo and plays the blink animation.
 */
function animateLogo() {
    $('#skyDesignLogo img').attr("src", "../img/svg/logo2.svg");
    setTimeout(function () {
        $('#skyDesignLogo img').attr("src", "../img/svg/logo3.svg");
    }, 40);
    setTimeout(function () {
        $('#skyDesignLogo img').attr("src", "../img/svg/logo2.svg");
    }, 110);
    setTimeout(function () {
        $('#skyDesignLogo img').attr("src", "../img/svg/logo1.svg");
    }, 150);
    // Generate random repeat time between 5s and 15s
    var timeout = Math.floor(Math.random() * 10000) + 5000;
    setTimeout(animateLogo, timeout);
}

/**
 * Sets up homepage with images.
 * @param {Object[]} jsonImages array of objects containing images
 */
function homepageImagesSetup(jsonImages) {
    $("#photoCall img").replaceWith("<ul></ul>");
    for (var i = 0; i < jsonImages.length; i++) {
        console.log(jsonImages[i].image);
        $("#photoCall ul").append(
            "<li>" + insertImage(jsonImages[i].image, 200) + "</li>"
        )
    }
}

/**
 * Provides handlers for opening and closing the help menu.
 */
 function setupHelpMenu() {
     // Handle the help button being pressed
     $("#helpButton").click(function () {
         setHelpMenu(false);
     });
     // Handle canceling the help screen
     $("#instructionsContainer").click(function () {
         setHelpMenu(true);
     });
 }

/**
 * Set the appearance of the help menu on the home page.
 * @param {Boolean} hidden false will show the menu, true will hide the menu
 */
function setHelpMenu(hidden) {
    if (hidden) {
        // Hide the menu

        $("#instructionsContainer").animate({
            bottom: "100%"
        }, 300);
        setTimeout(function () {
            $("#instructionsContainer").css('visibility', "hidden");
        }, 300);
        blur($("#home"), 0, 0.3);
    } else {
        // Show the menu
        $("#instructionsContainer").css('visibility', "visible");
        $("#instructionsContainer").animate({
            bottom: "0%"
        }, 300);
        blur($("#home"), 10, 0.3);
    }
}
