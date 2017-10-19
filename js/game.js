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
    loadingScreenSetup(true);
    var datasetSize = 300;
    loadSLQImagesGame(datasetSize, 6, [0]);
});

/**
 * Sets up the game page with specified rounds, imageCount and slqImages
 * @param  {integer} rounds number of guessing rounds
 * @param  {integer} imageCount number of images queried from the database
 * @param  {Object[]} slqImages array of objects containing images
 * @return {undefined}
 */
function setupGamePage(rounds, imageCount, slqImages) {
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
 * @return {undefined}
 */
function startGame(rounds, gameImages) {
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
                startBlurTimer(10000);
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
    try {
        var photo = insertImage(image.image, 400);
        $("#gameFrame").attr("src", $(photo).attr("src"));
        $("#roundImage").attr("src", $(photo).attr("src"));
        // store image in local storage
        sessionStorage.setItem("lastGameImage", photo);
    } catch (err) {
        console.log("Error: Cannot set gameFrame source to the game image.")
    }
}

/**
 * Starts Blur and timer!
 * @param  {integer} time how long the user has to guess in milliseconds.
 * @return {undefined}
 */
function startBlurTimer(time) {
    //var elem = $("#timePassed"),
    var elem = document.getElementById("timePassed"),
        width = 0,
        maxwidth = 100,
        intervals = 0.5,
        intervalTime = time / (maxwidth / intervals),
        id = setInterval(frame, intervalTime);
        elem.style.backgroundColor = "lightgreen";
        elem.style.transition = "all " + (intervalTime/1000) + "s";
        console.log("ooo");
    function frame() {
        if (width == ((maxwidth / 2)*0.9)) {
            animateColourChange("#timePassed","yellow",1000);
            //elem.animate({
            //    backgroundColor: "red"
            //},1000);
        }
        if (width >= maxwidth*0.9) {
            animateColourChange("#timePassed","orange",1000);
        }
        if (width >= maxwidth) {
            animateColourChange("#timePassed","red",1000);
            //elem.style.backgroundColor = "red";
            console.log("Round Over!")
            setupGameoverScreen();
            clearInterval(id);
        } else {

            width = width + intervals;
            elem.style.width = width + '%';
            blur($("#gameFrame"),((maxwidth - width) / intervals)/(8/intervals),0.1);
            //document.getElementById("gameFrame").style.filter = "blur(" +
            //    (maxwidth - width) / intervals + 'px' + ")";
        }
    }
}

/**
 * Sets up gameover screen functionality
 * @return {undefined}
 */
function setupGameoverScreen () {
    $("#nextRound button").on("click.startNextRound", function() {
        // Unbind action as soon as clicked to prevent ending the round early
        $("#nextRound button").off("click.startNextRound");
        startGame.startRound();
    });
}
