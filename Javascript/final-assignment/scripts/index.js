import { constantVals, marcoConstants } from "./constants.js";
import { loadLevel } from "./loaders.js";
import { createMarco } from "./entities/marcoEntity.js";
import AccuracyCalc from "./calculations/accuracyCalc.js";
import { controller } from "./controls/controller.js";

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
  };
  fpsCalc.start();
  const input = controller(marco);
  input.listenTo(window);

  // ["mousedown", "mousemove"].forEach((eventName) => {
  //   canvas.addEventListener(eventName, (event) => {
  //     if (event.buttons === 1) {
  //       marco.vel.set(0, 0);
  //       marco.pos.set(event.offsetX, event.offsetY);
  //     }
  //   });
  // });
});
