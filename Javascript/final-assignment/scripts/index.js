import {
  constantVals,
  marcoConstants,
  soldierConsts,
  prisonerConsts,
} from "./constants.js";
import { createLevelLoader } from "./loaders.js";
import { loadEntities } from "./entities/entityLoader.js";
import AccuracyCalc from "./calculations/accuracyCalc.js";
import { controller, mouseDebugger } from "./controls/controller.js";
import Camera from "./camera.js";
import { createCameraLayer } from "./layers/layers.js";

const canvas = document.querySelector("canvas");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

async function main(canvas) {
  const context = canvas.getContext("2d");
  const entityFactory = await loadEntities();
  const loadLevel = await createLevelLoader(entityFactory);
  const level = await loadLevel("mission1");
  const cam = new Camera();
  window.camera = cam;
  const marco = entityFactory.marco();
  const machineGunBullet = entityFactory.machineGunBullet();

  marco.pos.set(marcoConstants.INIT_POS_X, 0);

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
  mouseDebugger(canvas, machineGunBullet, cam);

  const input = controller(marco);
  input.listenTo(window);
}
main(canvas);
