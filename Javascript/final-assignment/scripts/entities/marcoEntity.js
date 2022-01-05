import Entity from "./entity.js";
import { constantVals } from "../constants.js";
import { marcoConstants } from "../constants.js";
import { loadMarcoSprite } from "../sprites/spriteLoaders.js";

export function createMarco() {
  return loadMarcoSprite().then((marcoSprite) => {
    const marco = new Entity();
    marco.pos.set(64, constantVals.CANVAS_HEIGHT - marcoConstants.HEIGHT);
    marco.vel.set(2, -10);

    marco.drawMarco = function drawMarco(context) {
      marcoSprite.drawSprite("idle-Marco", context, this.pos.x, this.pos.y);
    };

    marco.updateMarco = function updateMarco() {
      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    };
    return marco;
  });
}
