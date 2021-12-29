import Game from "./game.js";
import CollisionDetection from "./detectCollision.js";
import constantVals from "./constants.js";

const SCREEN_WIDTH = 600;
const SCREEN_HEIGHT = innerHeight;

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const playGame = document.querySelector(".start-game-btn");
const startScreen = document.querySelector(".start-screen-items");
const scoreTxt = document.querySelector(".score");

const gameOverScreen = document.querySelector(".game-over-screen");
const finalScore = document.querySelector(".game-over-score");
const highScoreFinal = document.querySelector(".high-score");
const restartBtn = document.querySelector(".restart-btn");

canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT, context);
const detectCollision = new CollisionDetection();

let gameStart = false;
let score = 0;
let highScore;

const loopGame = () => {
  let animation;

  game.drawGameScreen();
  game.charcters();
  game.createObstacles();

  const firstPipeCollisionAbove = detectCollision.collision(
    constantVals.BIRD_SIZE,
    game.character.positionX,
    game.character.positionY,
    game.obstacle1.topPipeHeight,
    constantVals.PIPE_WIDTH,
    game.obstacle1.pipePosX,
    game.obstacle1.topPipePosY
  );
  const firstPipeCollisionBelow = detectCollision.collision(
    constantVals.BIRD_SIZE,
    game.character.positionX,
    game.character.positionY,
    game.obstacle1.bottomPipeHeight,
    constantVals.PIPE_WIDTH,
    game.obstacle1.pipePosX,
    game.obstacle1.bottomPipePosY
  );
  const secondPipeCollisionAbove = detectCollision.collision(
    constantVals.BIRD_SIZE,
    game.character.positionX,
    game.character.positionY,
    game.obstacle2.topPipeHeight,
    constantVals.PIPE_WIDTH,
    game.obstacle2.pipePosX,
    game.obstacle2.topPipePosY
  );
  const secondPipeCollisionBelow = detectCollision.collision(
    constantVals.BIRD_SIZE,
    game.character.positionX,
    game.character.positionY,
    game.obstacle2.bottomPipeHeight,
    constantVals.PIPE_WIDTH,
    game.obstacle2.pipePosX,
    game.obstacle2.bottomPipePosY
  );
  const thirdPipeCollisionAbove = detectCollision.collision(
    constantVals.BIRD_SIZE,
    game.character.positionX,
    game.character.positionY,
    game.obstacle3.topPipeHeight,
    constantVals.PIPE_WIDTH,
    game.obstacle3.pipePosX,
    game.obstacle3.topPipePosY
  );
  const thirdPipeCollisionBelow = detectCollision.collision(
    constantVals.BIRD_SIZE,
    game.character.positionX,
    game.character.positionY,
    game.obstacle3.bottomPipeHeight,
    constantVals.PIPE_WIDTH,
    game.obstacle3.pipePosX,
    game.obstacle3.bottomPipePosY
  );
  if (
    firstPipeCollisionAbove === true ||
    firstPipeCollisionBelow === true ||
    secondPipeCollisionAbove === true ||
    secondPipeCollisionBelow === true ||
    thirdPipeCollisionAbove === true ||
    thirdPipeCollisionBelow === true ||
    game.character.positionY >=
      constantVals.SCREEN_HEIGHT -
        constantVals.FOOTER_HEIGHT -
        constantVals.BIRD_SIZE ||
    game.character.positionY <= 0
  ) {
    gameStart = false;
    if (highScore < score) {
      localStorage.setItem("highScore", score);
    }
    highScoreFinal.innerHTML = localStorage.getItem("highScore");

    gameOverScreen.style.display = "flex";
    finalScore.innerHTML = score;

    cancelAnimationFrame(animation);
  }
  if (gameStart) {
    animation = requestAnimationFrame(loopGame);
    scoreCalc();
  }
};
loopGame();

const control = () => {
  document.addEventListener("click", () => {
    game.character.jump();
  });
};

const scoreCalc = () => {
  highScore = localStorage.getItem("highScore");
  if (
    game.character.positionX ===
      game.obstacle1.pipePosX + constantVals.PIPE_WIDTH ||
    game.character.positionX ===
      game.obstacle2.pipePosX + constantVals.PIPE_WIDTH ||
    game.character.positionX ===
      game.obstacle3.pipePosX + constantVals.PIPE_WIDTH
  ) {
    score++;
    scoreTxt.innerHTML = score;
  }
};

playGame.addEventListener("click", () => {
  gameStart = true;
  startScreen.style.display = "none";

  loopGame();
});

control();

restartBtn.addEventListener("click", () => {
  gameOverScreen.style.display = "none";
  context.clearRect(0, 0, canvas.width, canvas.height);
  score = 0;
  gameStart = true;
  game.character.resetPosition();
  game.obstacle1.pipePosX = constantVals.PIPE1_POSX;
  game.obstacle2.pipePosX = constantVals.PIPE2_POSX;
  game.obstacle3.pipePosX = constantVals.PIPE3_POSX;
  loopGame();
});
