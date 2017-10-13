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
    var datasetSize = 300;
    loadingScreenSetup(true);
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
    console.log(slqImages)
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
 * @param  {Object[]} gameImages an Array containing the game images
 * @return {undefined}
 */
function startGame(rounds, gameImages) {
    console.log(rounds);
    // alows for proper indexing of elements
    var round = -1;
    while (round < rounds) {
        round++;
        console.log("Round: "+round);
        if (round == rounds) {
            console.log("Gameover!");
            break;
        } else {
            console.log(gameImages);
            loadgameImage(round, gameImages);
            // TODO:
            // loadavailablePowerups();
            // jquery selector $.(this)
        }
    }
}

/**
 * loads the image for the corresponding round
 * @param {integer} round number
 * @param {Object[]} images an array of objects containing images
 * @requre -1 < round < jsonImages.length
 */
function loadgameImage(round, images) {
    try {
        var photo = insertImage(images[round].image, 400);
        $("#gameFrame").attr("src", $(photo).attr("src"));
        // store image in local storage
        sessionStorage.setItem("lastGameImage", photo);
    } catch (err) {
        console.log("Error: Cannot set gameFrame source to the game image.")
        // @Peter not sure what this is doing?
        var photo = insertImage(images[round].image, 400);
        $("#gameFrame").attr("src", $(photo).attr("src"));
        // store image in local storage
        sessionStorage.setItem("lastGameImage", photo);
    }
}

/** Timer and blur effect */
function startBlurTimer() {
    var elem = document.getElementById("timePassed"),
        width = 0,
        id = setInterval(frame, 1000);

    function frame() {
        if (width == 50) {
            elem.style.backgroundColor = "yellow";
        }
        if (width >= 100) {
            elem.style.backgroundColor = "red";
            clearInterval(id);
        } else {
            width = width + 5;
            elem.style.width = width + '%';
            document.getElementById("gameFrame").style.filter = "blur(" + (100 -
                width) / 5 + 'px' + ")";
        }
    }
}

/**
 * Overlay
 * @return {undefined}
 */
function on() {
    document.getElementById("overlay").style.display = "block";
}

function off() {
    document.getElementById("overlay").style.display = "none";
    startBlurTimer();
}
