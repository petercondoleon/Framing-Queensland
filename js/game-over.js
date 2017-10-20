/*************************************
Gameover page

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
    setGameOverImage();
});

/**
 * Sets the last rounds image
 */
function setGameOverImage() {
    "use strict";
    $("#gameOverFrame").attr("src", $(sessionStorage.getItem("lastGameImage"))
    .attr("src"));
}
