import { PositionVectors } from "../calculations/calculations.js";

/**
 * holds characters
 */
export default class Entity {
  constructor() {
    this.pos = new PositionVectors(0, 0);
    this.vel = new PositionVectors(0, 0);
    this.size = new PositionVectors(0, 0);
    this.alivePeriod = 0;

    this.traits = [];
  }
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }
  obstruct(side) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }
  update(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
    this.alivePeriod += deltaTime;
  }
}
export class Trait {
  constructor(name) {
    this.NAME = name;
  }
  obstruct() {}
  update() {
    console.warn("Unhandled update call in trait");
  }
}
