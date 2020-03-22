let finalScore = document.querySelector("#final-score");

(function displayScore() {
  let urlParams = new URLSearchParams(window.location.search.substring(1));
  let value = urlParams.get("score");
  finalScore.innerHTML = value;
})();
