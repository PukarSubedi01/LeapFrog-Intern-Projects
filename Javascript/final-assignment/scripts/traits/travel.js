import { Trait } from "../entities/entity.js";
export default class Travel extends Trait {
  constructor() {
    super("travel");
    this.direction = 1;
    this.initialBulletPosX = 0;
    this.firingRange = 0;
    this.maxTravelDistance = 0;
  }

  update(entity, deltaTime, level) {
    this.maxTravelDistance = this.initialBulletPosX + this.firingRange;
    entity.pos.x += entity.vel.x * deltaTime * this.direction;

    entity.pos.y += entity.vel.y * deltaTime;

    if (this.direction === 1 && entity.pos.x > this.maxTravelDistance) {
      level.entities.delete(entity);
    } else if (
      this.direction === -1 &&
      entity.pos.x < -this.maxTravelDistance
    ) {
      level.entities.delete(entity);
    }
  }
}
