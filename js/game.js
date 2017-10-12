$(document).ready(function() {
    loadSLQImagesGame(40000,6,[0]);
});

/**
 * Sets up gamepage with an image.
 * @param {integer} #rounds that a user will play
 */
function setupGamePage(rounds, slqImages, imageCount) {
    // list of images for the game
    var gameImages = [];

    // grab images for game
    for (var i = 0; i < rounds; i++) {
        // Generate image index
        var index = Math.floor(Math.random() * imageCount);
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

/*
 * Timer and blur effect
 */
function start() {
    var elem = document.getElementById("timePassed");
    var width = 0;
    var id = setInterval(frame, 1000);
    function frame() {
        if (width == 50) {
            elem.style.backgroundColor  = "yellow";
        }
        if (width >= 100) {
            elem.style.backgroundColor  = "red";
            clearInterval(id);
        } else {
            width = width + 5;
            elem.style.width = width + '%';
            document.getElementById("gameFrame").style.filter = "blur(" + (100 - width)/5 + 'px' + ")";
        }
    }
}

/*
 * Overlay
 */
function on() {
    document.getElementById("overlay").style.display = "block";
}
function off() {
    document.getElementById("overlay").style.display = "none";
    start()
}
