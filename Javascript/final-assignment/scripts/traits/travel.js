import { Trait } from "../entities/entity.js";
export default class Travel extends Trait {
  constructor() {
    super("travel");
    this.direction = 1;
  }

  update(entity, deltaTime, level) {
    entity.pos.x += entity.vel.x * deltaTime * this.direction;

    entity.pos.y += entity.vel.y * deltaTime;
  }
}
