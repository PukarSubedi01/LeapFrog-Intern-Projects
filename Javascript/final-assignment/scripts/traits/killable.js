import { Trait } from "../entities/entity.js";
export default class Killable extends Trait {
  constructor() {
    super("killable");
    this.isDead = false;
    this.deadTime = 0;
    this.removeEntityAfter = 2;
  }
  kill() {
    this.isDead = true;
  }
  revive() {
    this.isDead = false;
    this.deadTime = 0;
  }
  update(entity, deltaTime, level) {
    if (this.isDead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeEntityAfter) {
        level.entities.delete(entity);
      }
    }
  }
}
