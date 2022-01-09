import Entity from "./entity.js";

import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { soldierConsts } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";

export function loadSoldiers() {
  return loadSpriteSheet("soldiers").then(createSoldiersFactory);
}
function createSoldiersFactory(sprite) {
  const animateFrame = sprite.animations.get("run");

  function drawSoldiers(context) {
    sprite.draw(animateFrame(this.alivePeriod), context, 0, 0);
    // sprite.draw("soldier12", context, 0, 0);
  }
  return function createSoldier() {
    const soldier = new Entity();
    soldier.size.set(soldierConsts.WIDTH, soldierConsts.HEIGHT);

    soldier.addTrait({
      NAME: "walk",
      speed: -30,
      obstruct() {},
      update(soldier) {
        soldier.vel.x = this.speed;
      },
    });
    soldier.draw = drawSoldiers;
    return soldier;
  };
}
