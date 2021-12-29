import constantVals from "./constants.js";
export default class Character {
  constructor() {
    this.positionX = constantVals.BIRD_STARTX;
    this.positionY = constantVals.BIRD_STARTY;
    this.characterWidth = constantVals.BIRD_SIZE;
    this.characterHeight = constantVals.BIRD_SIZE;
    this.velocity = 0;
    this.characterIndex = -1;
    this.characterSrc = [
      "./assets/bird/Frame-1.png",
      "./assets/bird/frame-2.png",
      "./assets/bird/frame-3.png",
      "./assets/bird/frame-4.png",
    ];
    this.acceleration = 2;
  }
  applyGravity() {
    let MAX_SPEED = 5;
    let MAX_NEGATIVE_SPEED = -10;

    if (this.velocity < MAX_SPEED && this.acceleration > 0) {
      this.velocity += this.acceleration;
    }

    if (this.velocity > MAX_NEGATIVE_SPEED && this.acceleration < 0) {
      this.velocity += this.acceleration;
    }

    if (this.velocity <= MAX_NEGATIVE_SPEED) {
      this.acceleration = 2;
    }

    if (
      this.positionY <
      constantVals.SCREEN_HEIGHT -
        constantVals.FOOTER_HEIGHT -
        constantVals.BIRD_SIZE
    )
      this.positionY += this.velocity;
  }
  jump = () => {
    this.acceleration = -5;
  };
  createCharacter = (context) => {
    const bird = new Image();
    if (this.characterIndex === 4) {
      this.characterIndex = 0;
    } else {
      this.characterIndex++;
    }
    bird.src = this.characterSrc[this.characterIndex];
    bird.onload = () => {
      this.applyGravity();
      context.drawImage(
        bird,
        this.positionX,
        this.positionY,
        this.characterWidth,
        this.characterHeight
      );
    };
  };
  resetPosition = () => {
    this.positionX = constantVals.BIRD_STARTX;
    this.positionY = constantVals.BIRD_STARTY;
  };
}
