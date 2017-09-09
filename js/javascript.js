/*
 * Executes when the document is ready.
 */
$(document).ready(function() {
  setupUniversalNav();
});

/*
 * Sets the contents of the navigation bar.
 */
 function setupUniversalNav() {
    $("#universalNav").html(
      '<ul>\
        <li><a href="../index.html">Home</a></li>\
        <li><a href="game.html">Play</a></li>\
        <li><a href="account.html">Profile</a></li>\
        <li><a href="leaderboard.html">Leaderboard</a></li>\
        <li><a href="skydesign.html">About</a></li>\
      </ul>'
    );
 }
