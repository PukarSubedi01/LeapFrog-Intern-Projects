import { Trait } from "../entities/entity.js";
export default class GetInside extends Trait {
  constructor() {
    super("getInside");
    this.canGetInside = false;
  }
  setEntry() {
    this.canGetInside = true;
  }
  update() {
    if (this.canGetInside) {
      console.log("asd");
    }
  }
}
