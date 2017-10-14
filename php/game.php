<?php
    // Include meta tags
    include $_SERVER['DOCUMENT_ROOT'].'/html/meta.html';

    // First display the loading screen
    include $_SERVER['DOCUMENT_ROOT'].'/html/loadingscreen.html';

    // Show game instructions on loading screen
    // Append inside loading screen.
    // include $_SERVER['DOCUMENT_ROOT'].'/html/instructions.html';

    // Add the navigation bar to the top of the page
    include $_SERVER['DOCUMENT_ROOT'].'/html/navigation.html';

    // Include the html of the game page
    include $_SERVER['DOCUMENT_ROOT'].'/html/game.html';
?>
