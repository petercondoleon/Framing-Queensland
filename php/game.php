<!DOCTYPE html>
<html>
    <head>
        <title>Framing Queensland - Game</title>
        <!--Basic Meta Tags-->
        <meta charset="UTF-8">
        <meta name="description" content="">
        <meta name="keywords" content="">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--Open Graph Protocol Meta Tags-->
        <meta property="og:title" content="">
        <meta property="og:image" content="">
        <meta property="og:description" content="">
        <!--CSS Stylesheets-->
        <link rel="stylesheet" type="text/css" media="screen" href="/css/cssResetHTML5.min.css" />
        <link rel="stylesheet" type="text/css" media="screen" href="/css/style.css" />
        <!--FavIcons-->
        <link rel="apple-touch-icon" sizes="180x180" href="/img/favicons/180pxfaviconApple.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/img/favicons/32pxfavicon.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/img/favicons/16pxfavicon.png">
        <!--<link rel="manifest" href="./favicons/manifest.json">
        <link rel="mask-icon" href="./favicons/safari-pinned-tab.svg" color="#5bbad5">-->
        <meta name="theme-color" content="#8cd2e8">
    </head>
    <body>
        <?php include 'loadingScreen.php'; ?>
        <section>
            <!--Every page except the hompage has this Nav.
            Either we copy or paste, or just JS in the html
            to save loading times-->
            <?php include 'universalNav.php'; ?>

            <div id="gameImageOuter">
                <div id="gameImageInner">
                    <img id="gameFrame" class="gameFrame" src="/img/framePlaceholder.jpg" alt="placeholder for game image" width="200px"/>

                </div>
            </div>
            <div id="totalTime">
                <div id="timePassed"></div>
            </div>
            <!--
            <div onclick="off()" id="overlay">
                <div id="Instructions">Guess the image before time runs out!!!!</div>
            </div>
            -->
            <!--Guess Text Field-->
            <div id="guess">
                <form>
                    <input type="text" name="guess" placeholder="Make your guess!">
                </form>
            </div>
            <!--This will eventually be removed inplace of the automated progression (time runs out)-->
            <div id="endGame">
                <a href="/html/gameover.html">
                    <button>
                        End Game
                    </button>
                </a>
            </div>
        </section>
        <footer>
        </footer>
        <div>
            <!-- END CONTAINER SCRIPTS -->
            <script type="text/javascript" src="/js/jquery-3.2.1.min.js"></script>
            <script type="text/javascript" src="/js/api-ajax-handling.js"></script>
            <script type="text/javascript" src="/js/javascript.js"></script>
            <script type="text/javascript" src="/js/game.js"></script>
        </div>
    </body>
</html>
