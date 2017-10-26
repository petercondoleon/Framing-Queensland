/*************************************
Gameplay handling

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
// global variables
var apiKeywordsData,
    currentScore = 0;
    totalGameScore = 0;

/**
 * Executes when the document is ready.
 */
$(document).ready(function () {
    "use strict";
    loadingScreenSetup(true);
    // data set size reduced to 6 for testing
    var datasetSize = 10000;
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
    currentScore = 0;
    totalGameScore = 0;
    // grab images for game
    for (var i = 0; i < rounds; i++) {
        // Generate image index
        var index = Math.floor(Math.random() * imageCount);
        gameImages.push(slqImages[index]);
    }
    setupInputTags();
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
        $("#roundValue").text(round+1);
        $('#guess form input').importTags('');
        if (round < rounds) {
            console.log("Round: " + round);
            loadgameImage(gameImages[round]);
            keywordAPICall(gameImages[round]);
            if (!isLoading && imagesLoaded) {
                //Time of the rounds following the first
                startBlurTimer(10000);
            // This else statement is called for the first round as the timer is
            //  started from the end of the loadingscree
            } else {
                imagesloadingStateSetter(true);
            }
            // TODO:
            // loadavailablePowerups();

        } else if (round == rounds) {
            // GameOver
            console.log("Game Over!");
            showGameoverMenu(true);
        }
    }
    startGame.startRound = startRound;
    startRound();
}

/**
 * loads an image object into the gameframe and post gameframe
 * @param {string} image an imageURL
 */
function loadgameImage(image) {
    "use strict";
    try {
        var photo = insertImage(image.image, 400);
        $("#gameFrame").attr("src", $(photo).attr("src"));
        // delay on post game image changing as not to reveal the next image
        setTimeout(function () {
            $("#roundImage img").attr("src", $(photo).attr("src"));
        },1000);
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
    // all variables are adjustable without effecting visual consistentancy
    var elem = document.getElementById("timePassed"),
        width = 0,
        maxwidth = 100,
        intervals = 1,
        intervalTime = time / (maxwidth / intervals),
        id = setInterval(frame, intervalTime);
    elem.style.transition = "all " + (intervalTime / 1000) * 2 + "s";
    function frame() {
        // Update the time displayed in the timer
        $("#timerValue").text(parseFloat((time/1000)*(1-width/100)).toFixed(2));
        if (width == 0) {
            // sets correct colour and width (0px) for recalls
            elem.style.backgroundColor = "#8ae8a0";
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
            console.log("Round Over!");
            setupNextRoundButton();
            var roundScore = compareHits(apiKeywordsGetter(),collectGuesses());
            scoreSetter(roundScore);
            totalScoreSetter(totalScoreGetter()+roundScore);
            // Delay presenting the round over menu
            setTimeout(function () {
                showRoundoverMenu(true);
            }, 1000);
            clearInterval(id);
        } else {
            width = width + intervals;
            elem.style.width = width + '%';
            blur($("#gameFrame"), ((maxwidth - width) / intervals) / (6 /
                intervals), 0.1);
        }
    }
}

/**
 * Sets up empty inputTags box
 */
function setupInputTags() {
    $('#guess form input').tagsInput({
        "defaultText":"Make a guess!",
    });
}

/**
 * Collects the current guesses in guess tag inputs
 * @return {string[]} guesses made
 */
function collectGuesses() {
    "use strict";
    var guesses = [];
    $("#guess form div span").each(function () {
        guesses.push($("span",this).text());
    });
    return guesses;
}

/**
 * Sets internal keywords property to passed jsonObject,
 * sets interal keyword load check to true
 * @param {JSON} keywords the keyword data from api
 */
function apiKeywordsSetter(keywords) {
    apiKeywordsData = keywords;
}

/**
 * returns the current api keywords
 * @return {JSON} the results from image recognition API
 */
function apiKeywordsGetter() {
    return apiKeywordsData;
}

/**
 * sets the current gamescore
 * @param {integer} score current score
 */
function scoreSetter(score) {
    currentScore = score;
}

/**
 * returns the current gamescore
 * @return {integer} current score
 */
function scoreGetter() {
    return currentScore;
}

/**
 * sets the current gamescore
 * @param {integer} totalScore current score
 */
function totalScoreSetter(totalScore) {
    totalGameScore = totalScore;
}

/**
 * returns the current gamescore
 * @return {integer} current score
 */
function totalScoreGetter() {
    return totalGameScore;
}

/**
 * Sets up gameover screen functionality
 */
function setupNextRoundButton() {
    "use strict";
    $("#nextRound button").on("click.startNextRound", function () {
        // Unbind action as soon as clicked to prevent ending the round early
        $("#nextRound button").off("click.startNextRound");
        startGame.startRound();
        showRoundoverMenu(false);
    });
}

/**
 * Set the appearance of the round over menu on the game page.
 * @param {Boolean} show true will show the menu, false will hide the menu
 */
function showRoundoverMenu(show) {
    "use strict";
    if (show) {
        // Show the menu
        $("#roundoverScreen").css('visibility', "visible");
        $("#roundoverScreen").animate({
            bottom: "0%"
        }, 500);
        // Append user and API guesses
        collectGuesses().forEach(function(x){
            if (x) {
                $('#userKeywords ul').append("<li>"+x+"</li>");
                if ((checkGuessHit(apiKeywordsGetter(), x))) {
                    $('#userKeywords ul li').last().css("background-color", "#8ae8a0");
                }
            }
        });
        apiKeywordsGetter().forEach(function(x){
            $('#apiKeywords ul').append("<li>" + x.name +
            " = " + (Math.floor(100*x.value)) + "</li>");

            if ((checkKeywordHit(collectGuesses(), x.name))) {
                $('#apiKeywords ul li').last().css("background-color", "#8ae8a0");
            }

        });
        // Append score
        $("#currentScore").html("<p>"+scoreGetter()+"</p>");
        $("#scoreValue").html("<p>"+totalScoreGetter()+"</p>");
    } else {
        // Hide the menu
        $("#roundoverScreen").animate({
            bottom: "100%"
        }, 500);
        setTimeout(function () {
            $("#roundoverScreen").css('visibility', "hidden");
        }, 500);
        // clear keyword data
        $('#userKeywords ul').html("");
        $('#apiKeywords ul').html("");
        $('#guess form input').importTags('');
        apiKeywordsData = undefined;
    }
}

/**
 * Set the appearance of the game over menu on the game page.
 * @param {Boolean} show true will show the menu, false will hide the menu
 */
function showGameoverMenu(show) {
    "use strict";
    if (show) {
        // Show the menu
        $("#gameoverScreen").css('visibility', "visible");
        $("#gameoverScreen").animate({
            bottom: "0%"
        }, 500);
        $("#scoring h3").html("<p>"+"Final Score: "+totalScoreGetter()+"</p>");
    } else {
        // Hide the menu
        $("#gameoverScreen").animate({
            bottom: "100%"
        }, 500);
        setTimeout(function () {
            $("#gameoverScreen").css('visibility', "hidden");
        }, 500);
    }
}
