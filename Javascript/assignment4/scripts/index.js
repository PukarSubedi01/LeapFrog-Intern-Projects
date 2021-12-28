const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 700;
canvas.height = window.innerHeight;
const posX = [70, 310, 545];
const carWidth = 80;
const carHeight = 150;

let carIndex = 1;
let carPositionY = 550;
let speed = 10;

let gameOver = false;
let score = 0;

const homeScreen = document.querySelector(".home-screen");
const playGameBtn = document.querySelector("#play-game");
const restartGameBtn = document.querySelector(".restart-game");

const game = document.querySelector("canvas");

playGameBtn.addEventListener("click", () => {
  homeScreen.style.display = "none";
  game.style.display = "block";
  carLaneGame();
});
restartGameBtn.addEventListener("click", () => {
  const gameOverScreen = document.querySelector(".game-over-screen");

  gameOverScreen.style.display = "none";

  gameOver = false;
  score = 0;
  carIndex = 1;
  speed = 10;
  carLaneGame();
});
const controls = () => {
  document.addEventListener("keydown", (event) => {
    if (carIndex < posX.length) {
      if (event.key == "ArrowLeft") {
        if (!gameOver) carIndex === 0 ? (carIndex = 0) : carIndex--;
      } else if (event.key === "ArrowRight") {
        if (!gameOver) carIndex === 2 ? (carIndex = 2) : carIndex++;
      }
    }
  });
};
controls();
