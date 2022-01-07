import { loadImage, loadLevel } from "../loaders.js";
import SpriteSheetParser from "./spriteSheetParser.js";
import { marcoConstants, platFormConsts } from "../constants.js";

export function loadPlatform() {
  return loadImage("./assets/mission1/platform.png").then((image) => {
    const sprites = new SpriteSheetParser(image);
    sprites.definePlatform(
      "platform-ground",
      platFormConsts.WIDTH,
      platFormConsts.HEIGHT
    );
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
