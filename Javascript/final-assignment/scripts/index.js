import { constantVals } from "./constants.js";
import { loadImage, loadLevel } from "./utils.js";
import SpriteSheetParser from "./spriteSheetParser.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

loadImage("./assets/mission1/background-sprites.png").then((image) => {
  const sprites = new SpriteSheetParser(image);
  loadLevel("mission1").then((mission1, index) => {
    let yAxis = 0;
    const bgArr = mission1.backgrounds;
    for (let i = 0; i < bgArr.length; i++) {
      sprites.spriteDefine(bgArr[i].name, bgArr[i].properties);
      sprites.drawSprite(bgArr[i].name, context, 0, yAxis);
      if (i === bgArr.length - 2) {
        yAxis = constantVals.CANVAS_HEIGHT - bgArr[i + 1].properties.height;
      } else yAxis += 250;
    }
  });
});
