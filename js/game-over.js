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
    setGameOverImage();
});

/**
 * Sets the last rounds image
 */
function setGameOverImage() {
    $("#gameOverFrame").attr("src", $(sessionStorage.getItem("lastGameImage"))
    .attr("src"));
}
