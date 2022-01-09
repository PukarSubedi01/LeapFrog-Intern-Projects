import {
  constantVals,
  marcoConstants,
  soldierConsts,
  prisonerConsts,
} from "./constants.js";
import { loadLevel } from "./loaders.js";
import { loadMarco } from "./entities/marcoEntity.js";
import { loadSoldiers } from "./entities/soldiersEntity.js";
import { loadPrisoners } from "./entities/prisonersEntity.js";

import AccuracyCalc from "./calculations/accuracyCalc.js";
import { controller, mouseDebugger } from "./controls/controller.js";
import Camera from "./camera.js";
import { createCameraLayer } from "./layers/layers.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

Promise.all([
  loadMarco(),
  loadSoldiers(),
  loadPrisoners(),
  loadLevel("mission1"),
]).then(([createMarco, createSoldiers, createPrisoner, level]) => {
  const cam = new Camera();
  window.camera = cam;
  const marco = createMarco();
  const soldiers = createSoldiers();
  const prisoners = createPrisoner();

  soldiers.pos.set(400, constantVals.CANVAS_HEIGHT - soldierConsts.HEIGHT);
  prisoners.pos.set(400, constantVals.CANVAS_HEIGHT - prisonerConsts.HEIGHT);

  marco.pos.set(
    marcoConstants.INIT_POS_X,
    constantVals.CANVAS_HEIGHT - marcoConstants.HEIGHT
  );

  level.comp.layers.push(createCameraLayer(cam));
  level.entities.add(marco);
  level.entities.add(soldiers);
  level.entities.add(prisoners);

  const fpsCalc = new AccuracyCalc(1 / 60);

  fpsCalc.update = function update(deltaTime) {
    level.update(deltaTime);
    if (marco.pos.x > 200) {
      cam.pos.x = marco.pos.x - 200;
    }

    level.comp.drawLayer(context, cam);
  };

  fpsCalc.start();
  mouseDebugger(canvas, soldiers, cam);

  const input = controller(marco);
  input.listenTo(window);
});
