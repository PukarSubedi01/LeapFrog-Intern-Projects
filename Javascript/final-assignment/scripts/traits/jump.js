import { Trait } from "../entities/entity.js";
import { dirConsts } from "../constants.js";
export default class Jump extends Trait {
  constructor() {
    super("jump");
    this.canJump = false;
    this.duration = 0.2;
    this.engageTime = 0;
    this.boostSpeed = 0.3;
    this.velocity = 400;
  }

  start() {
    if (this.canJump) {
      this.engageTime = this.duration;
    }
  }

  cancel() {
    this.engageTime = 0;
  }
  obstruct(entity, side) {
    if (side === dirConsts.BOTTOM) {
      this.canJump = true;
    } else if (side === dirConsts.TOP) {
      this.cancel();
    }
  }
  update(entity, deltaTime) {
    if (this.engageTime > 0) {
      entity.vel.y = -(
        this.velocity +
        Math.abs(entity.vel.x) * this.boostSpeed
      );
      this.engageTime -= deltaTime;
    }
    this.canJump = false;
  }
}
