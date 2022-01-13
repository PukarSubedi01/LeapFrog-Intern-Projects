import Entity from "../entity.js";
import { loadSpriteSheet } from "../../loaders.js";
import Travel from "../../traits/travel.js";
import CanKill from "../../traits/canKill.js";
export function loadFireGunBullet() {
  return loadSpriteSheet("bullets").then(createWeaponsFactory);
}

function createWeaponsFactory(sprite, entityFactory) {
  const animateFrame = sprite.animations.get("fireBullet");
  function animateBullets(bullet) {
    return animateFrame(bullet.alivePeriod);
  }
  function drawBullet(context) {
    sprite.draw(animateBullets(this), context, 0, 0, this.travel.direction < 0);
  }

  return function createBullet() {
    const bullet = new Entity();
    bullet.size.set(40, 20);
    bullet.vel.set(100, 0);
    const travel = new Travel();
    travel.firingRange = 150;
    const canKill = new CanKill();
    canKill.damage = 200;

    bullet.addTrait(travel);
    bullet.addTrait(canKill);
    bullet.draw = drawBullet;

    return bullet;
  };
}
