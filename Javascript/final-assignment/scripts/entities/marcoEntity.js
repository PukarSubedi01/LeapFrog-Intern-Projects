import Entity from "./entity.js";

import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { marcoConstants } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";
import createAnimation from "../animations/animate.js";

export function loadMarco() {
  return loadSpriteSheet("marco").then(createMarcoFactory);
}
function createMarcoFactory(sprite) {
  const animateFrame = sprite.animations.get("run");

  function animateMarco(marco) {
    if (!marco.jump.canJump) {
      return "jump";
    }
    if (marco.walk.dir !== 0) {
      return animateFrame(marco.walk.distance);
    }
    return "idle-Marco";
  }
  function drawMarco(context) {
    sprite.draw(animateMarco(this), context, 0, 0, this.walk.heading < 0);
  }

  return function createMarco() {
    const marco = new Entity();
    marco.size.set(marcoConstants.WIDTH, marcoConstants.HEIGHT);

    marco.addTrait(new Walk());
    marco.addTrait(new Jump());

    marco.drawMarco = drawMarco;

    return marco;
  };
}
