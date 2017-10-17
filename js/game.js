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
$(document).ready(function() {
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
    while (round < rounds) {
        round++;
        console.log("Round: " + round);
        if (round == rounds) {
            console.log("Gameover!");
            break;
        } else {
            loadgameImage(round, gameImages);
            //function waitForLoadingScreen() {
                //if (!)
            // TODO:
            // loadavailablePowerups();
            // jquery selector $.(this)
        }
    }
}

/**
 * loads the image for the corresponding round
 * @param {integer} round number
 * @param {Array} images an array of objects containing images
 */
function loadgameImage(round, images) {
    // @requre -1 < round < images.length
    if (round < 0 || round > images.length) {
        console.log("Error: Round must be greater than -1 and less than the " +
        "images array length");
    } else {
        try {
            var photo = insertImage(images[round].image, 400);
            $("#gameFrame").attr("src", $(photo).attr("src"));
            // store image in local storage
            sessionStorage.setItem("lastGameImage", photo);
        } catch (err) {
            console.log("Error: Cannot set gameFrame source to the game image.")
        }
    }
}

/**
 * Starts Blur and timer!
 * @param  {integer} time how long the user has to guess in milliseconds.
 * @return {undefined}
 */
function startBlurTimer(time) {
    var elem = document.getElementById("timePassed"),
        width = 0,
        maxwidth = 100,
        intervals = 5,
        intervalTime = time / (maxwidth / intervals),
        id = setInterval(frame, intervalTime);
    function frame() {
        if (width == (maxwidth / 2)) {
            elem.style.backgroundColor = "yellow";
        }
        if (width >= maxwidth) {
            elem.style.backgroundColor = "red";
            clearInterval(id);
        } else {
            width = width + intervals;
            elem.style.width = width + '%';
            document.getElementById("gameFrame").style.filter = "blur(" +
                (maxwidth - width) / intervals + 'px' + ")";
        }
    }
}
