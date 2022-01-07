import Entity from "./entity.js";

import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { marcoConstants } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";
import animateMarcoMovement from "../animations/animateMarco.js";

export function createMarco() {
  return loadSpriteSheet("marco").then((marcoSprite) => {
    const marco = new Entity();
    marco.size.set(marcoConstants.WIDTH, marcoConstants.HEIGHT);

    marco.addTrait(new Walk());
    marco.addTrait(new Jump());

    const animateFrame = animateMarcoMovement(
      [
        "marco1",
        "marco2",
        "marco3",
        "marco4",
        "marco5",
        "marco6",
        "marco7",
        "marco8",
        "marco9",
      ],
      10
    );
    function animateMarco(marco) {
      if (marco.walk.dir !== 0) {
        return animateFrame(marco.walk.distance);
      }
      return "idle-Marco";
    }

    marco.drawMarco = function drawMarco(context) {
      marcoSprite.draw(
        animateMarco(this),
        context,
        0,
        0,
        this.walk.heading < 0
      );
    };

    return marco;
  });
}
