import { Trait } from "../entities/entity.js";
export default class Killable extends Trait {
  constructor() {
    super("killable");
    this.isDead = false;
  }
  kill() {
    this.isDead = true;
  }
}
