class Obstacles {
  constructor(positionXarr, positionY, obstacleWidth, obstacleHeight, speed) {
    this.positionXArr = positionXarr;
    this.positionX = getRandomPosition(this.positionXArr);
    this.positionY = positionY;
    this.obstacleWidth = obstacleWidth;
    this.obstacleHeight = obstacleHeight;
    this.speed = speed / 2;
  }

  collisionDetection = () => {
    const dist = distance(
      this.positionX,
      this.positionY,
      posX[carIndex],
      carPositionY
    );
    if (dist <= carHeight) {
      gameOver = true;
      gameFinishingScreen();
    }
  };
  makeObstacles = () => {
    const obstacle = new Image();

    obstacle.src = "./assets/truck.png";

    obstacle.onload = () => {
      const obstacleMovement = () => {
        let obstacleAnimation = requestAnimationFrame(obstacleMovement);
        context.drawImage(
          obstacle,
          this.positionX,
          this.positionY,
          this.obstacleWidth,
          this.obstacleHeight
        );
        this.positionY += this.speed;
        if (this.positionY > canvas.height) {
          score++;
          this.positionY = -500;
          this.positionX = getRandomPosition(this.positionXArr);
        }
        this.collisionDetection();
        if (gameOver) {
          cancelAnimationFrame(obstacleAnimation);
        }
      };
      obstacleMovement();
    };
  };
}

const gameFinishingScreen = () => {
  const gameOverScreen = document.querySelector(".game-over-screen");
  gameOverScreen.style.display = "block";
  const finalScore = document.querySelector(".score");

  finalScore.innerText = `${score}`;

  const scoreMessage = document.querySelector(".message");
  const highScore = localStorage.getItem("highScore");

  if (score > highScore) {
    localStorage.setItem("highScore", score);
    scoreMessage.innerText = "Congratulations You Just Beat The High Score!";
  } else if (score <= highScore) {
    scoreMessage.innerText = "Better Luck Next Time";
  }
};
