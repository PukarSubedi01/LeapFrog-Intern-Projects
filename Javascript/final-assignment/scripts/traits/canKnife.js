import { Trait } from "../entities/entity.js";
export default class CanKnife extends Trait {
  constructor() {
    super("canKnife");
    this.damage = 10;
  }
}
