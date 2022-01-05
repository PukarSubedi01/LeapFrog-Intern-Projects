import Entity from "./entity.js";
import { loadMarcoSprite } from "../sprites/spriteLoaders.js";
import Velocity from "../traits/velocity.js";
import Jump from "../traits/jump.js";

export function createMarco() {
  return loadMarcoSprite().then((marcoSprite) => {
    const marco = new Entity();
    marco.addTrait(new Velocity());
    marco.addTrait(new Jump());

    marco.drawMarco = function drawMarco(context) {
      marcoSprite.draw("idle-Marco", context, this.pos.x, this.pos.y);
    };

    return marco;
  });
}
