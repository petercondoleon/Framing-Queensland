$(document).ready(function() {
    var rounds = 1;
    setupGamePage(1);
});

/**
 * Sets up gamepage with an image.
 * @param {integer} #rounds that a user will play
 */
function setupGamePage(rounds) {
    // list of images for the game
    var gameImages = [];

    // grab images for game
    for (var i = 0; i < rounds; i++) {
        var slqImages = loadSLQImages(100, [0]),
            // Generate image index
            index = Math.floor(Math.random() * 100);
        gameImages.push(slqImages[index]);
    }
    for (var i = 0; i < rounds; i++) {
        loadgameImage(i,gameImages);
        startRound();
    }
}

/**
 * loads the image for the corresponding round
 * @param {integer} round number
 * @param {Object[]} an array of objects containing images
 * @requre -1 < round < jsonImages.length
 */
function loadgameImage(round, images) {
    try {
        var photo = insertImage(images[round].image, 400);
        $("#gameFrame").attr("src", $(photo).attr("src"));
        // store image in local storage
        sessionStorage.setItem("lastGameImage", photo);
    } catch (err) {
        // @Peter not sure what this is doing?
        var photo = insertImage(images[round].image, 400);
        $("#gameFrame").attr("src", $(photo).attr("src"));
        // store image in local storage
        sessionStorage.setItem("lastGameImage", photo);
    }
}

/**
 * Starts Round
 */
function startRound() {
    // Starts Round
    // keywords, powerups, etc
}