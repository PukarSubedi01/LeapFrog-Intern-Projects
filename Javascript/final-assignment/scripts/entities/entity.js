import { PositionVectors } from "../calculations/calculations.js";

/**
 * holds characters
 */
export default class Entity {
  constructor() {
    this.pos = new PositionVectors(0, 0);
    this.vel = new PositionVectors(0, 0);

    this.traits = [];
  }
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  update(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
}
export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  update() {
    console.warn("Unhandled update call in trait");
  }
}
