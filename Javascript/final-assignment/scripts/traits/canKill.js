import { Trait } from "../entities/entity.js";
export default class CanKill extends Trait {
  constructor() {
    super("canKill");
    this.destruct = false;
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
