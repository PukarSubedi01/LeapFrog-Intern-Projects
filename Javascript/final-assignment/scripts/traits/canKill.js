import { Trait } from "../entities/entity.js";
export default class CanKill extends Trait {
  constructor() {
    super("canKill");
    this.destruct = false;
    this.damage = 0;
  }
  setDestruct() {
    this.destruct = true;
  }
  update(entity, deltaTime, level) {
    if (this.destruct) {
      level.entities.delete(entity);
    }
  }
}
