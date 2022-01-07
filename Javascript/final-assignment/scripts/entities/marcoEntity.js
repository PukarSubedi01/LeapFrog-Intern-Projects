import Entity from "./entity.js";
import { loadMarcoSprite } from "../sprites/spriteLoaders.js";

import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { marcoConstants } from "../constants.js";
export function createMarco() {
  return loadMarcoSprite().then((marcoSprite) => {
    const marco = new Entity();
    marco.size.set(marcoConstants.WIDTH, marcoConstants.HEIGHT);

    marco.addTrait(new Walk());
    marco.addTrait(new Jump());

    marco.drawMarco = function drawMarco(context) {
      marcoSprite.draw("idle-Marco", context, 0, 0);
    };

    return marco;
  });
}
