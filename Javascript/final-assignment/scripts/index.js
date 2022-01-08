import { constantVals, marcoConstants } from "./constants.js";
import { loadLevel } from "./loaders.js";
import { createMarco } from "./entities/marcoEntity.js";
import AccuracyCalc from "./calculations/accuracyCalc.js";
import { controller, mouseDebugger } from "./controls/controller.js";
import Camera from "./camera.js";
import { createCameraLayer } from "./layers/layers.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

Promise.all([createMarco(), loadLevel("mission1")]).then(([marco, level]) => {
  const cam = new Camera();
  window.camera = cam;
  marco.pos.set(
    marcoConstants.INIT_POS_X,
    constantVals.CANVAS_HEIGHT - marcoConstants.HEIGHT
  );

  level.comp.layers.push(createCameraLayer(cam));
  level.entities.add(marco);
  const fpsCalc = new AccuracyCalc(1 / 60);

  fpsCalc.update = function update(deltaTime) {
    level.update(deltaTime);
    if (marco.pos.x > 200) {
      cam.pos.x = marco.pos.x - 200;
    }

    level.comp.drawLayer(context, cam);
  };

  fpsCalc.start();
  mouseDebugger(canvas, marco, cam);

  const input = controller(marco);
  input.listenTo(window);
});
