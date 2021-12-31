import constantVals from "./constants.js";
import { getRandomRange } from "./utils.js";
export default class Obstacles {
  constructor(pipePosX) {
    this.pipePosX = pipePosX;
    this.topPipePosY = constantVals.TOP_PIPE_Y;

    this.topPipeHeight = getRandomRange(100, 500);
    this.bottomPipePosY =
      this.topPipeHeight + constantVals.BIRD_SIZE * constantVals.PIPE_GAP;

    this.bottomPipeHeight =
      constantVals.SCREEN_HEIGHT -
      this.bottomPipePosY -
      constantVals.FOOTER_HEIGHT;
  }

  makeObstacles = (context) => {
    const topPipe = new Image();
    const bottomPipe = new Image();

    topPipe.src = "./assets/pipeTop.png";
    bottomPipe.src = "./assets/pipeBottom.png";
    topPipe.onload = () => {
      context.drawImage(
        topPipe,
        this.pipePosX,
        this.topPipePosY,
        constantVals.PIPE_WIDTH,
        this.topPipeHeight
      );
      context.drawImage(
        bottomPipe,
        this.pipePosX,
        this.bottomPipePosY,
        constantVals.PIPE_WIDTH,
        this.bottomPipeHeight
      );
      this.pipePosX--;
      if (this.pipePosX < -constantVals.PIPE_WIDTH)
        this.pipePosX = constantVals.RESET_XPOSITION;
    };
  };
}
