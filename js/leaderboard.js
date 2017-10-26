/*************************************
Leaderboard Scripting

Institution: The University of
Queensland

Course: DECO1800 Semester 2 - 2017

Author: Sky Design
*************************************/
/**
 * Executes when the document is ready.
 */
$(document).ready(function() {
    console.log("hello");
    $('#morerank').hide();
    var moreShown = false;
    $("#more").click(function() {
        if (moreShown) {
            $("#morerank").hide();
            moreShown = false;
            $("#more").css("transform", "rotate(90deg)");
        } else {
            $("#morerank").show();
            moreShown = true;
            $("#more").css("transform", "rotate(270deg)");
        }
    });
});
