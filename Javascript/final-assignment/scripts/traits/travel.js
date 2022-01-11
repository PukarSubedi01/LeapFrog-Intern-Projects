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
    if (entity.pos.x < this.maxTravelDistance) {
      entity.pos.x += entity.vel.x * deltaTime * this.direction;

      entity.pos.y += entity.vel.y * deltaTime;
    } else {
      level.entities.delete(entity);
    }
  }
}
