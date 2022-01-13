import Entity from "../entity.js";
import { loadSpriteSheet } from "../../loaders.js";
import Travel from "../../traits/travel.js";
import CanKill from "../../traits/canKill.js";
export function loadMachineGunBullet() {
  return loadSpriteSheet("bullets").then(createWeaponsFactory);
}

function createWeaponsFactory(sprite, entityFactory) {
  function drawBullet(context) {
    sprite.draw("machinegun-bullet", context, 0, 0, this.travel.direction < 0);
  }

  return function createBullet() {
    const bullet = new Entity();
    bullet.size.set(40, 20);
    bullet.vel.set(1000, 0);
    const travel = new Travel();
    travel.firingRange = 800;
    const canKill = new CanKill();
    canKill.damage = 50;

    bullet.addTrait(travel);
    bullet.addTrait(canKill);
    bullet.draw = drawBullet;

    return bullet;
  };
}
