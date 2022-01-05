import { constantVals } from "./constants.js";

import { loadBackgroundSprites } from "./sprites/spriteLoaders.js";

import { loadLevel } from "./utils.js";

import LayerCompositor from "./layers/layerCompositor.js";

import { createBackgroundLayer, createSpriteLayer } from "./layers/layers.js";

import { createMarco } from "./entities/marcoEntity.js";

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
  const gravity = 0.5;
  function update() {
    layerComp.drawLayer(context);
    marco.updateMarco();
    marco.vel.y += gravity;
    requestAnimationFrame(update);
  }
  update();
});
