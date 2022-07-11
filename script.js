let currentScore = 0;
let increaseScore = true;
let notColided = true;
let gameOver = new Audio("gameOver.mp3");
let jumpSound = new Audio("jumpSound.wav");

gameOver.volume = 0.02;
jumpSound.volume = 0.09;

document.onkeydown = function (e) {
  if (e.keyCode == 37 && notColided == true) {
    //If user presses left arrow on keyboard.
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX - 80 + "px";
  }

  if (e.keyCode == 38 && notColided == true) {
    //If user presses up arrow on keyboard.
    document.querySelector(".dino").classList.add("animateDino");
    setTimeout(() => {
      document.querySelector(".dino").classList.remove("animateDino");
    }, 1000);
  }

  if (e.keyCode == 39 && notColided == true) {
    //If user presses right arrow on keyboard.
    let dino = document.querySelector(".dino");
    let dinoX = parseInt(
      window.getComputedStyle(dino, null).getPropertyValue("left")
    );
    dino.style.left = dinoX + 80 + "px";
  }
};

setInterval(() => {
  let dino = document.querySelector(".dino");
  let gameStatus = document.getElementById("gameStatus");
  let obstacle = document.querySelector(".obstacle");

  //Getting current left value of dinosaur.
  let dinoX = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("left")
  );

  //Getting current top value of dinosaur.
  let dinoY = parseInt(
    window.getComputedStyle(dino, null).getPropertyValue("top")
  );

  //Getting current left value of obstacle.
  let obstacleX = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );

  //Getting current top value of obstacle.
  let obstacleY = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  //Caclulating there difference.
  let differenceInX = Math.abs(obstacleX - dinoX);
  let differenceInY = Math.abs(obstacleY - dinoY);

  //Checking if they are near to collision.
  if (differenceInX < 100 && differenceInY < 50) {
    gameStatus.style.visibility = "visible";
    dino.classList.remove("animateDino");
    obstacle.classList.remove("animateObstacle");
    obstacle.style.left = obstacleX + "px";
    notColided = false;
    gameOver.play();
    setTimeout(() => {
      gameOver.volume = 0;
    }, 1500);

    //Updating the score if user survives.
  } else if (
    differenceInX < 140 &&
    increaseScore == true &&
    notColided == true
  ) {
    increaseScore = false;
    currentScore += 10;
    document.getElementById("scoreBoard").innerText =
      "Your Score: " + currentScore;
    jumpSound.play();
    setTimeout(() => {
      increaseScore = true;
    }, 1000);

    //Updating the speed of obstacle here.
    setTimeout(() => {
      let obstacleAni = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      if (obstacleAni > 1.3) {
        document.querySelector(".animateObstacle").style.animationDuration =
          obstacleAni - 0.025 + "s";
      }
    }, 600);
  }
}, 10);

// This will reload the page when game is over.
setInterval(() => {
  if (notColided == false) {
    setTimeout(() => {
      reloadPage();
    }, 1000);
  }
}, 2000);

//To reload the page.
function reloadPage() {
  window.location.reload();
}
