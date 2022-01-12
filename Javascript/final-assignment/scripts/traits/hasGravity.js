import { Trait } from "../entities/entity.js";
import { constantVals } from "../constants.js";
export default class Gravity extends Trait {
  constructor() {
    super("gravity");
  }

  update(entity, deltaTime, level) {
    level.platformCollider.checkX(entity);
    entity.pos.y += entity.vel.y * deltaTime;
    level.platformCollider.checkY(entity);
    entity.vel.y += constantVals.GRAVITY * deltaTime;
  }
}
