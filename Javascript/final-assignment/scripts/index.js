import { constantVals } from "./constants.js";
import { createLevelLoader } from "./loaders.js";
import { loadEntities } from "./entities/entityLoader.js";
import AccuracyCalc from "./calculations/accuracyCalc.js";
import { controller, mouseDebugger } from "./controls/controller.js";
import Camera from "./camera.js";
import Entity from "./entities/entity.js";
import PlayerController from "./traits/playerController.js";

const canvas = document.querySelector("canvas");

canvas.height = constantVals.CANVAS_HEIGHT;
canvas.width = constantVals.CANVAS_WIDTH;

const playGame = document.getElementById("play-game");
const gameStatus = document.querySelector(".game-status-indicator");
const gameMenu = document.querySelector(".game-menu-wrapper");

const missionStart = new Audio();
missionStart.src = "./assets/sfx/mission1-start.mp3";

const bgMusic = new Audio();
bgMusic.src = "./assets/sfx/theme.mp3";

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

  const playerEnv = createPlayerEnv(marco);
  level.entities.add(playerEnv);

  const fpsCalc = new AccuracyCalc(1 / 60);

  fpsCalc.update = function update(deltaTime) {
    level.update(deltaTime);
    if (cam.pos.x < 4000) cam.pos.x = Math.max(0, marco.pos.x - 200);
    level.comp.drawLayer(context, cam);
  };

  fpsCalc.start();
  playGame.addEventListener("click", () => {
    missionStart.play();

    bgMusic.play();
    const input = controller(marco);
    gameStatus.style.display = "block";
    gameMenu.style.display = "none";
    input.listenTo(window);
  });
}
main(canvas);
