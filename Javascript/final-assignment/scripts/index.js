import { constantVals, marcoConstants } from "./constants.js";
import { loadBackgroundSprites } from "./sprites/spriteLoaders.js";
import { loadLevel } from "./utils.js";
import LayerCompositor from "./layers/layerCompositor.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers/layers.js";
import { createMarco } from "./entities/marcoEntity.js";
import AccuracyCalc from "./calculations/accuracyCalc.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

Promise.all([
  createMarco(),
  loadBackgroundSprites(),
  loadLevel("mission1"),
]).then(([marco, backgroundSprites, level]) => {
  const layerComp = new LayerCompositor();
  const bgLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
  layerComp.layers.push(bgLayer);

  createMarco();
  const spriteLayer = createSpriteLayer(marco);
  layerComp.layers.push(spriteLayer);

  marco.pos.set(
    marcoConstants.INIT_POS_X,
    constantVals.CANVAS_HEIGHT - marcoConstants.HEIGHT
  );
  marco.vel.set(marcoConstants.VELOCITY_X, marcoConstants.VELOCITY_Y);

  const gravity = marcoConstants.GRAVITY;

  const fpsCalc = new AccuracyCalc(1 / 60);

  fpsCalc.update = function update(deltaTime) {
    layerComp.drawLayer(context);
    marco.updateMarco(deltaTime);
    marco.vel.y += gravity;
  };
  fpsCalc.start();
});
