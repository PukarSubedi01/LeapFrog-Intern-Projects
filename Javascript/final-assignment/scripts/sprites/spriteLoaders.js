import { loadImage, loadLevel } from "../loaders.js";
import SpriteSheetParser from "./spriteSheetParser.js";
import { marcoConstants } from "../constants.js";

export function loadBackgroundSprites() {
  return loadImage("./assets/mission1/background-sprites.png").then((image) => {
    const sprites = new SpriteSheetParser(image);
    sprites.spriteDefine("background1", {
      x: 8,
      y: 408,
      subSetElementWidth: 500,
      subsetElementHeight: 120,
      width: 940,
      height: 313,
    });
    sprites.spriteDefine("background2", {
      x: 8,
      y: 580,
      subSetElementWidth: 1000,
      subsetElementHeight: 120,
      width: 2000,
      height: 213,
    });
    sprites.spriteDefine("foreground", {
      x: 400,
      y: 0,
      subSetElementWidth: 1000,
      subsetElementHeight: 220,
      width: 960,
      height: 300,
    });
    return sprites;
  });
}

export function loadPlatform() {
  return loadImage("./assets/mission1/platform.png").then((image) => {
    const sprites = new SpriteSheetParser(image);
    sprites.definePlatform("platform-ground", 16, 3);
    return sprites;
  });
}

export function loadMarcoSprite() {
  return loadImage("./assets/mission1/marco-origin.gif").then((image) => {
    const sprites = new SpriteSheetParser(image);
    sprites.spriteDefine("idle-Marco", {
      x: marcoConstants.X,
      y: marcoConstants.Y,
      subSetElementWidth: marcoConstants.subSetElementWidth,
      subsetElementHeight: marcoConstants.subsetElementHeight,
      width: marcoConstants.WIDTH,
      height: marcoConstants.HEIGHT,
    });

    return sprites;
  });
}
