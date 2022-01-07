import { loadImage } from "../loaders.js";
import SpriteSheetParser from "./spriteSheetParser.js";
import { platFormConsts } from "../constants.js";

export function loadPlatform() {
  return loadImage("./assets/mission1/platform.png").then((image) => {
    const sprites = new SpriteSheetParser(image);
    sprites.definePlatform(
      "platform-ground",
      platFormConsts.WIDTH,
      platFormConsts.HEIGHT
    );
    sprites.definePlatform(
      "platform",
      platFormConsts.WIDTH,
      platFormConsts.HEIGHT
    );
    return sprites;
  });
}
