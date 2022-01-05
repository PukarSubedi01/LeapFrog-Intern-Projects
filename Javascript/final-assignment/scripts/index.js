import { constantVals, marcoConstants } from "./constants.js";
import { loadLevel } from "./loaders.js";
import { createMarco } from "./entities/marcoEntity.js";
import AccuracyCalc from "./calculations/accuracyCalc.js";

import KeyboardState from "./controls/keyboardState.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

Promise.all([createMarco(), loadLevel("mission1")]).then(([marco, level]) => {
  marco.pos.set(
    marcoConstants.INIT_POS_X,
    constantVals.CANVAS_HEIGHT - marcoConstants.HEIGHT
  );
  level.entities.add(marco);
  const fpsCalc = new AccuracyCalc(1 / 60);
  fpsCalc.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.drawLayer(context);
    marco.vel.y += marcoConstants.GRAVITY * deltaTime;
  };
  fpsCalc.start();

  const input = new KeyboardState();
  const SPACE = 32;
  input.addMapping(SPACE, (keyState) => {
    if (keyState) {
      marco.jump.start();
    } else {
      marco.jump.cancel();
    }
  });
  input.listenTo(window);
});
