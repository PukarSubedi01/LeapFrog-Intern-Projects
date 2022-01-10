import Entity from "./entity.js";
import { loadSpriteSheet } from "../loaders.js";
import Walk from "../traits/walk.js";

export function loadMachineGunBullet() {
  return loadSpriteSheet("machineGunBullet").then(createWeaponsFactory);
}
function createWeaponsFactory(sprite) {
  function drawMachineGunBullet(context) {
    sprite.draw("machinegun-bullet", context, 0, 0);
  }

  return function createBullet() {
    const machineGunBullet = new Entity();
    machineGunBullet.size.set(40, 20);
    const walk = new Walk();
    walk.speed = 400;
    walk.update = (machineGunBullet) => {
      machineGunBullet.vel.x = walk.speed;
    };
    machineGunBullet.addTrait(walk);
    machineGunBullet.draw = drawMachineGunBullet;

    return machineGunBullet;
  };
}
