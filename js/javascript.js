/*
 * Execute when the document is ready
 */
$(document).ready(function() {
  setupUniversalNav();
});

/*
 * Navigation Bar
 */
 function setupUniversalNav() {
    $("#universalNav").html(
      '<ul>\
        <li><a href="../index.html">Home</a></li>\
        <li><a href="game.html">Play</a></li>\
        <li><a href="account.html">Profile</a></li>\
        <li><a href="leaderboard.html">Leaderboard</a></li>\
      </ul>'
    );
 }
