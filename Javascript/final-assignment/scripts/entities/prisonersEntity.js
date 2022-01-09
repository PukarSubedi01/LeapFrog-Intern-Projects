import Entity from "./entity.js";

import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { prisonerConsts } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";

export function loadPrisoners() {
  return loadSpriteSheet("prisoners").then(createPrisonersFactory);
}
function createPrisonersFactory(sprite) {
  const animateFrame = sprite.animations.get("compensate");

  function drawPrisoners(context) {
    sprite.draw(animateFrame(this.alivePeriod), context, 0, 0);
    // sprite.draw("prisoner-tied1", context, 0, 0);
  }
  return function createPrisoner() {
    const prisoner = new Entity();
    prisoner.size.set(prisonerConsts.WIDTH, prisonerConsts.HEIGHT);

    // prisoner.addTrait({
    //   NAME: "walk",
    //   speed: -30,
    //   obstruct() {},
    //   update(prisoner) {
    //     prisoner.vel.x = this.speed;
    //   },
    // });
    prisoner.draw = drawPrisoners;
    return prisoner;
  };
}
