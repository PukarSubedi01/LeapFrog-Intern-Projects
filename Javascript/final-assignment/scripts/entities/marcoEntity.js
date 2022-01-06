import Entity from "./entity.js";
import { loadMarcoSprite } from "../sprites/spriteLoaders.js";
import Velocity from "../traits/velocity.js";
import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { marcoConstants } from "../constants.js";
export function createMarco() {
  return loadMarcoSprite().then((marcoSprite) => {
    const marco = new Entity();
    marco.size.set(marcoConstants.WIDTH, marcoConstants.HEIGHT);

    marco.addTrait(new Walk());
    marco.addTrait(new Jump());
    // marco.addTrait(new Velocity());

    marco.drawMarco = function drawMarco(context) {
      marcoSprite.draw("idle-Marco", context, this.pos.x, this.pos.y);
    };

    return marco;
  });
}
