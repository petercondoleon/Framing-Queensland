$(document).ready(function() {

  var gameImages = loadSLQImages(10, [0]);
  var index = Math.floor(Math.random() * 10); // Generate image index

  try {
    var photo = insertImage(gameImages[index].image, 400);
    $("#gameFrame").attr("src", $(photo).attr("src"));
    // store image in local storage
    sessionStorage.setItem("lastGameImage", photo);
  } catch (err) {
    var photo = insertImage(gameImages[1].image, 400);
    $("#gameFrame").attr("src", $(photo).attr("src"));
    // store image in local storage
    sessionStorage.setItem("lastGameImage", photo);
  }
});
