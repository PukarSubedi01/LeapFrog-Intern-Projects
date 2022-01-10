import { Trait } from "../entities/entity.js";
import { dirConsts } from "../constants.js";
export default class CollisionObject extends Trait {
  constructor() {
    super("collisionObject");
    this.obstructs = true;
  }

  obstruct(entity, side, match) {
    if (!this.obstructs) {
      return;
    }
    if (side === dirConsts.BOTTOM) {
      entity.bounds.top = match.y1;
      entity.vel.y = 0;
    } else if (side === dirConsts.RIGHT) {
      entity.bounds.left = match.x1;
      entity.vel.x = 0;
    } else if (side === dirConsts.LEFT) {
      entity.bounds.left = match.x2;
      entity.vel.x = 0;
    }
  }
}
