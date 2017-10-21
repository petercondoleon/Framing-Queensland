/*************************************
Gameplay handling

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
/**
 * Executes when the document is ready.
 */
$(document).ready(function () {
    "use strict";
    loadingScreenSetup(true);
    var datasetSize = 500;
    loadSLQImagesGame(datasetSize, 6, [0]);
});

/**
 * Sets up the game page with specified rounds, imageCount and slqImages
 * @param  {integer} rounds number of guessing rounds
 * @param  {integer} imageCount number of images queried from the database
 * @param  {Object[]} slqImages array of objects containing images
 */
function setupGamePage(rounds, imageCount, slqImages) {
    "use strict";
    // list of images for the game
    var gameImages = [];
    // grab images for game
    for (var i = 0; i < rounds; i++) {
        // Generate image index
        var index = Math.floor(Math.random() * imageCount);
        gameImages.push(slqImages[index]);
    }
    startGame(rounds, gameImages);
}

/**
 * Starts Game
 * @param  {integer} rounds number of rounds
 * @param  {Array} gameImages an Array containing the game images
 */
function startGame(rounds, gameImages) {
    "use strict";
    // alows for proper indexing of elements
    var round = -1;

    function startRound() {
        round++;
        if (round < rounds) {
            console.log("Round: " + round);
            loadgameImage(gameImages[round]);
            // Loads from gameframe over the array.src to ensure
            // that the correct url is passed instead of a delivery url
            keywordAPICall($("#gameFrame").attr("src"));
            if (!isLoading && imageLoaded) {
                //Time of the rounds following the first
                startBlurTimer(5000);
            } else {
                imageLoaded = true;
            }
            // TODO:
            // loadavailablePowerups();

        } else if (round == rounds) {
            // GameOver
            console.log("Game Over!");
        }
    }
    startGame.startRound = startRound;
    startRound();
}

/**
 * loads an image object into the gameframe
 * @param {string} image an imageURL
 */
function loadgameImage(image) {
    "use strict";
    try {
        var photo = insertImage(image.image, 400);
        $("#gameFrame").attr("src", $(photo).attr("src"));
        $("#roundImage").attr("src", $(photo).attr("src"));
        // store image in local storage
        sessionStorage.setItem("lastGameImage", photo);
    } catch (err) {
        console.log("Error: Cannot set gameFrame source to the game image.");
    }
}

/**
 * Starts Blur and timer
 * @param  {integer} time how long the user has to guess in milliseconds.
 */
function startBlurTimer(time) {
    "use strict";
    // all variables can be changed without causing the timer to change
    // at different times
    var elem = document.getElementById("timePassed"),
        width = 0,
        maxwidth = 100,
        intervals = 1,
        intervalTime = time / (maxwidth / intervals),
        id = setInterval(frame, intervalTime);
    elem.style.transition = "all " + (intervalTime / 1000) * 2 + "s";

    function frame() {
        if (width == 0) {
            // sets correct colour and width (0px) for recalls
            elem.style.backgroundColor = "#90EE90";
            elem.style.width = width + '%';
        }
        // Floor 75% half width to the nearest interval
        if (width == (Math.floor(((maxwidth / 2) * 0.5) / intervals) *
        intervals)) {
            animateColourChange(elem, "#FFFF00", (time * 0.5));
        }
        // Floor 75% max width to the nearest interval
        if (width == (Math.floor((maxwidth * 0.75) / intervals) * intervals)) {
            animateColourChange(elem, "#FF0000", (time * 0.35));
        }
        if (width == maxwidth) {
            //animateColourChange(elem,"#FF0000",(intervalTime*2));
            console.log("Round Over!");
            setupGameoverScreen();
            clearInterval(id);
        } else {
            width = width + intervals;
            elem.style.width = width + '%';
            blur($("#gameFrame"), ((maxwidth - width) / intervals) / (8 /
                intervals), 0.1);
        }
    }
}

/**
 * Sets up gameover screen functionality
 */
function setupGameoverScreen() {
    "use strict";
    $("#nextRound button").on("click.startNextRound", function () {
        // Unbind action as soon as clicked to prevent ending the round early
        $("#nextRound button").off("click.startNextRound");
        startGame.startRound();
    });
}
