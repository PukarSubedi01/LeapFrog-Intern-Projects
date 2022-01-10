import { Trait } from "../entities/entity.js";
import { constantVals } from "../constants.js";
export default class Movements extends Trait {
  constructor() {
    super("movements");
  }

  update(entity, deltaTime, level) {
    entity.pos.x += entity.vel.x * deltaTime;
    level.platformCollider.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level.platformCollider.checkY(entity);

    entity.vel.y += constantVals.GRAVITY * deltaTime;
  }
}
