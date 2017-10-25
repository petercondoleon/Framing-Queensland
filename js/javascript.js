
/*************************************
universal functions and/or global variables

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
// global variables
var isLoading = true;
var imagesLoaded = false;

/**
 * Executes when the document is ready.
 */
$(document).ready(function () {
    loadingScreenSetup(false);
    setupNavigation();
});

/**
 * Sets internal varaible for loading screen to passed boolean
 * @param {Boolean} isLoading the loadingscreen state
 */
function loadingscreenStateSetter(isLoadingState) {
    if (typeof isLoadingState === 'boolean') {
            isLoading = isLoadingState;
    } else {
        console.log("Error: Passed value must be a boolean!");
    }
}

/**
 * Sets internal varaible for game frame state to passed boolean
 * @param {Boolean} imagesLoadedState if the images are loaded
 */
function imagesloadingStateSetter(imagesLoadedState) {
    if (typeof imagesLoadedState === 'boolean') {
            imagesLoaded = imagesLoadedState;
    } else {
        console.log("Error: Passed value must be a boolean!");
    }
}

/**
 * Loads an image at a given html dom pos
 * @param {string} image source
 * @param {integer} image width
 * @return {string} <img/> tag form of parsed img string
 */
function insertImage(image, width) {
    "use strict";
    return '<img src=' + '"' + image + '"' + 'width=' + width + '/>';
}

/**
 * Transform html elements by slightly randomly roatating and adjusting them.
 * @param  {string} htmlElement a string a HtmlDOM position
 */
function rotateImages(htmlElement) {
    "use strict";
    $(htmlElement).each(function () {
        var angle = Math.floor(Math.random() * 60) - 30; // randomise angle
        $(this).css("transform", "rotate(" + angle + "deg)");
        var width = Math.floor(Math.random() * 100) + 150; // randomise width
        $(this).css("width", width + "px");
    });
}

/**
 * Loading screen handling
 * @param  {Boolean} isGamepage loading screen is the premise to the gamepage
 */
function loadingScreenSetup(isGamepage) {
    "use strict";
    setTimeout(function () {
        if (!isLoading && imagesLoaded) {
            $("#loadingText").text("Click To Play");
            $("#loadingImage").attr("src", "../img/gif/loaded.gif");
            $("#loadingScreen").css("cursor", "pointer");
            $("#loadingScreen").click(function () {
                setTimeout(function () {
                    $("#loadingScreen").css('visibility', "hidden");
                }, 500);
               $(this).animate({
                   bottom: "100%"
               }, 500);
               if (isGamepage) {
                   startBlurTimer(10000);
               }
           });
       } else {
           loadingScreenSetup(isGamepage);
       }
    // how often the loading screen checks if the data is loaded
    },2000 );
}

/**
 * Blur objects
 * @param  {Object} object the jquery object
 * @param  {Number} radius the blur radius to set
 * @param  {Number} duration the time taken to blur
 */
function blur(object, radius, duration){
    "use strict";
    var filterValue = 'blur(' + radius + 'px)';
    var transitionValue = 'all ' + duration + 's ease-out';
    object.css({
        'filter': filterValue,
        'webkitFilter': filterValue,
        'mozFilter': filterValue,
        'transition': transitionValue,
        '-webkit-transition': transitionValue,
        '-moz-transition': transitionValue
    });
}

/**
 * Trys to animate colour change with a css hook from jquery.color plugin.
 * if it fails it transitions colour instantly at the end of the duration.
 * @param {element} htmlElement a DOM element
 * @param {string} colour the colour of the new backgroundColor (standard css string convention)
 * @param {integer} duration number of milliseconds the transition ouccurs over
 */
function animateColourChange(htmlElement , colour, duration){
    "use strict";
    var JQObject = $(htmlElement);
    try {
        JQObject.animate({
            backgroundColor: colour
        }, duration);
    } catch (err) {
        console.log("Error: cannot transition timer colour"+
         " over-time because the browser doesn't support it!");
         setTimeout(function () {
             htmlElement.style.backgroundColor = colour;
         }, duration);
    }
}

/**
 * Compares the an array of strings with api guesses
 * @param  {JSON} jsonObjectKeywords Object containing .name and .score property
 * @param  {string[]} arrayKeywords array of strings containg keywords
 * @return {integer} the player score
 */
function compareHits(jsonObjectKeywords, arrayKeywords){
    var score = 0;
    // this line of code is here to ensure the object is a correct JSON.
    console.log(jsonObjectKeywords);
    var jsonObjectCon = JSON.parse(JSON.stringify(jsonObjectKeywords));
    // if keywords aren't found keep waiting till they are
    if (typeof (jsonObjectKeywords) === 'undefined') {
        setTimeout(function () {
            compareHits(apiKeywordsGetter(),collectGuesses());
        }, 3000);
        console.log("keyword API taking along time to respond!");
    } else {
        if (arrayKeywords.length >= 1) {
        $(arrayKeywords).each(function () {
            var guess = (this.toLowerCase()).trim();
                $(jsonObjectCon).each(function () {
                var keyword = (this.name).trim();
                if (guess == keyword) {
                        score = score + Math.floor(100*this.value);
                    }
                });
            }); // End of double foreach check
        }
        console.log(score);
        return score;
    }
}

/**
* Checks whether a word matches with api guesses
* @param  {JSON} jsonObjectKeywords Object containing .name and .score property
* @param  {string} text the string keyword to check
* @return {boolean} true if it matches and false otherwise
 */
function checkGuessHit(jsonObjectKeywords, text) {
    var jsonObjectCon = JSON.parse(JSON.stringify(jsonObjectKeywords));
    // if keywords aren't found keep waiting till they are
    var result = false;
    if (typeof (jsonObjectKeywords) === 'undefined') {
        setTimeout(function () {
            checkGuessHit(apiKeywordsGetter(), text);
        }, 3000);
        console.log("keyword API taking along time to respond!");
    } else {
        var guess = (text.toLowerCase()).trim();
        $(jsonObjectCon).each(function () {
            var keyword = (this.name).trim();
            if (guess == keyword) {
                result = true;
            }
        });
    }
    return result;
}

/**
 * Checks whether a guess matches any of the keywords
 * @param  {string[]} arrayKeywords array of strings containg keywords
 * @param  {string} text the string guess to check
 * @return {boolean} true if it matches and false otherwise
 */
function checkKeywordHit(arrayKeywords, text) {
    var result = false;
    if (arrayKeywords.length >= 1) {
    $(arrayKeywords).each(function () {
        var guess = (text.toLowerCase()).trim();
        var keyword = (this.toLowerCase()).trim();
        if (guess == keyword) {
                result = true;
            }
        }); // End of double foreach check
    }
    return result;
}

var navOpen = false;
function setupNavigation() {
    $("#expandIcon").click(function() {
        if (navOpen) {
            $("#expandIcon").css("transform", "rotate(-45deg)");
            $("#universalNav ul").css("top", "-150px");
            navOpen = false;
        } else {
            $("#expandIcon").css("transform", "rotate(0deg)");
            $("#universalNav ul").css("top", "0px");
            navOpen = true;
        }
    });

}
