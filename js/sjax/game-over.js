$(document).ready(function() {
    setGameOverImage();
});

function setGameOverImage() {
  $("#gameOverFrame").attr("src", $(sessionStorage.getItem("lastGameImage")).attr("src"));
}
