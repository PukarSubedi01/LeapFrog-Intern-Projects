import { Trait } from "../entities/entity.js";
export default class CanBeSwitched extends Trait {
  constructor() {
    super("canBeSwitched");
    this.switch = false;
    this.damage = 0;
  }
  setSwitchStatus() {
    this.destruct = true;
  }
}
