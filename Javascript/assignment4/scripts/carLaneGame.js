function carLaneGame() {
  const createLanes = () => {
    const lanes = new Image();
    lanes.src = "./assets/road.png";

    lanes.addEventListener("load", () => {
      let yAxis = 0;
      const moveRoad = () => {
        context.drawImage(
          lanes,
          0,
          yAxis - canvas.height,
          canvas.width,
          canvas.height * 2
        );
        if (yAxis >= canvas.height) yAxis = 0;
        if (score > speed) {
          speed = 10 + speed;
        }

        yAxis += speed;
        if (!gameOver) requestAnimationFrame(moveRoad);
        else cancelAnimationFrame(moveRoad);
      };
      moveRoad();
    });
  };
  const createPlayerCar = () => {
    const playerCar = new Image();
    playerCar.src = "./assets/playerCar.png";

    playerCar.addEventListener("load", () => {
      const drawPlayerCar = () => {
        let carAnimation = requestAnimationFrame(drawPlayerCar);
        context.drawImage(
          playerCar,
          posX[carIndex],
          carPositionY,
          carWidth,
          carHeight
        );
        if (gameOver) {
          cancelAnimationFrame(carAnimation);
        }
      };
      drawPlayerCar();
    });
  };

  createLanes();
  createPlayerCar();

  // obstacles();

  const obstacle1 = new Obstacles(posX, -200, carWidth, carHeight, speed);
  const obstacle2 = new Obstacles(posX, -700, carWidth, carHeight, speed);
  const obstacle3 = new Obstacles(posX, -1100, carWidth, carHeight, speed);
  obstacle1.makeObstacles();
  obstacle2.makeObstacles();
  obstacle3.makeObstacles();
}
