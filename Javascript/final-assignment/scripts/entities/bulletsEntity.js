import Entity from "./entity.js";
import { loadSpriteSheet } from "../loaders.js";
import Travel from "../traits/travel.js";
import CanKill from "../traits/canKill.js";
export function loadMachineGunBullet() {
  return loadSpriteSheet("machineGunBullet").then(createWeaponsFactory);
}
function createWeaponsFactory(sprite) {
  function drawMachineGunBullet(context) {
    sprite.draw("machinegun-bullet", context, 0, 0, this.travel.direction < 0);
  }

  return function createBullet() {
    const machineGunBullet = new Entity();
    machineGunBullet.size.set(40, 20);
    machineGunBullet.vel.set(1000, 0);
    machineGunBullet.addTrait(new Travel());
    machineGunBullet.addTrait(new CanKill());
    machineGunBullet.draw = drawMachineGunBullet;

    return machineGunBullet;
  };
}
