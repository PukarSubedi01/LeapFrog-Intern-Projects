import Entity from "./entity.js";
import { loadMarcoSprite } from "../sprites/spriteLoaders.js";

export function createMarco() {
  return loadMarcoSprite().then((marcoSprite) => {
    const marco = new Entity();

    marco.drawMarco = function drawMarco(context) {
      marcoSprite.drawSprite("idle-Marco", context, this.pos.x, this.pos.y);
    };

    marco.updateMarco = function updateMarco(deltaTime) {
      this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;
    };
    return marco;
  });
}
