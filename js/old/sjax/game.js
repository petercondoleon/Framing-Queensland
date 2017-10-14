$(document).ready(function() {
    setupGamePage(6, loadSLQImages(100,[0]));
});

/**
 * Sets up gamepage with an image.
 * @param {integer} #rounds that a user will play
 */
function setupGamePage(rounds, slqImages) {
    // list of images for the game
    var gameImages = [];

    // grab images for game
    for (var i = 0; i < rounds; i++) {
        // Generate image index
        var index = Math.floor(Math.random() * slqImages.length);
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
