import { Trait } from "../entities/entity.js";
export default class canProvide extends Trait {
  constructor() {
    super("canProvide");
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
