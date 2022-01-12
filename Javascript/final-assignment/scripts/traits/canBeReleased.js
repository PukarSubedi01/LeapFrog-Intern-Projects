import { Trait } from "../entities/entity.js";
export default class CanBeReleased extends Trait {
  constructor() {
    super("canBeReleased");
    this.isReleased = false;
    this.isCompensated = false;
    this.walk = false;
    this.panic = false;
    this.compensateAfter = 1.6;
    this.walkAfter = 3.2;
    this.runAfter = 4.2;
    this.releasedTime = 0;
    this.removeEntityAfter = 8;

    this.compensations = [];
  }
  setReleased() {
    this.isReleased = true;
  }

  compensate(entity, level) {
    for (const compensateElement of this.compensations) {
      compensateElement(entity, level);
    }
  }

  update(entity, deltaTime, level) {
    if (this.isReleased) {
      this.releasedTime += deltaTime;
      if (this.releasedTime > this.removeEntityAfter) {
        level.entities.delete(entity);
      }
      if (this.releasedTime > this.compensateAfter && !this.isCompensated) {
        this.isCompensated = true;
        this.compensate(entity, level);
      }
      if (this.releasedTime > this.walkAfter && !this.walk) {
        this.walk = true;
        entity.walk.dir = 1;
        entity.walk.speed = 10000;
      }
      if (this.releasedTime > this.runAfter && !this.panic) {
        this.panic = true;
        entity.walk.dir = -1;
        entity.walk.speed = 15000;
      }
    }
  }
}
