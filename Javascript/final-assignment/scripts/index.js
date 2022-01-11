import { constantVals } from "./constants.js";
import { createLevelLoader } from "./loaders.js";
import { loadEntities } from "./entities/entityLoader.js";
import AccuracyCalc from "./calculations/accuracyCalc.js";
import { controller, mouseDebugger } from "./controls/controller.js";
import Camera from "./camera.js";
import { createCameraLayer } from "./layers/layers.js";
import Entity from "./entities/entity.js";
import PlayerController from "./traits/playerController.js";

const canvas = document.querySelector("canvas");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

function createPlayerEnv(playerEntity) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController();
  playerControl.checkpoint.set(64, 64);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);
  return playerEnv;
}

async function main(canvas) {
  const context = canvas.getContext("2d");
  const entityFactory = await loadEntities();
  const loadLevel = await createLevelLoader(entityFactory);
  const level = await loadLevel("mission1");
  const cam = new Camera();
  window.camera = cam;
  const marco = entityFactory.marco();
  const machineGunBullet = entityFactory.machineGunBullet();

  const playerEnv = createPlayerEnv(marco);
  level.entities.add(playerEnv);

  level.comp.layers.push(createCameraLayer(cam));

  const fpsCalc = new AccuracyCalc(1 / 60);

  fpsCalc.update = function update(deltaTime) {
    level.update(deltaTime);
    cam.pos.x = Math.max(0, marco.pos.x - 200);

    level.comp.drawLayer(context, cam);
  };

  fpsCalc.start();
  mouseDebugger(canvas, machineGunBullet, cam);

  const input = controller(marco);
  input.listenTo(window);
}
main(canvas);
