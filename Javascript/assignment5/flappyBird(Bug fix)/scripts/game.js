import Obstacles from "./obstacles.js";
import Character from "./character.js";
import constantVals from "./constants.js";
export default class Game {
  constructor(screenWidth, screenHeight, context) {
    this.context = context;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.footerHeight = 80;
    this.xMovement = 0;
    this.obstacle1 = new Obstacles(constantVals.PIPE1_POSX);
    this.obstacle2 = new Obstacles(constantVals.PIPE2_POSX);
    this.obstacle3 = new Obstacles(constantVals.PIPE3_POSX);
    this.character = new Character();
  }
  drawGameScreen = () => {
    const backgroundImg = new Image();
    backgroundImg.src = "./assets/background-night.png";
    backgroundImg.addEventListener("load", () => {
      this.context.drawImage(
        backgroundImg,
        0,
        0,
        this.screenWidth,
        this.screenHeight - this.footerHeight
      );
    });

    const footerImg = new Image();
    footerImg.src = "./assets/footerImg.png";
    footerImg.addEventListener("load", () => {
      this.context.drawImage(
        footerImg,
        this.xMovement,
        this.screenHeight - this.footerHeight,
        this.screenWidth * 2,
        this.footerHeight
      );
      this.xMovement--;
      if (this.xMovement <= -this.screenWidth) this.xMovement = -11;
    });
  };

  createObstacles = () => {
    this.obstacle1.makeObstacles(this.context);
    this.obstacle2.makeObstacles(this.context);
    this.obstacle3.makeObstacles(this.context);
  };
  charcters = () => {
    this.character.createCharacter(this.context);
  };
}
