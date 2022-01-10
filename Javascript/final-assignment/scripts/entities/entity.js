import { PositionVectors } from "../calculations/calculations.js";
import BoundingBox from "./boundingBox.js";
/**
 * holds characters
 */
export default class Entity {
  constructor() {
    this.pos = new PositionVectors(0, 0);
    this.vel = new PositionVectors(0, 0);
    this.size = new PositionVectors(0, 0);
    this.offset = new PositionVectors(0, 0);
    this.alivePeriod = 0;
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.traits = [];
  }
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }
  collides(candidate) {
    this.traits.forEach((trait) => {
      trait.collides(this, candidate);
    });
  }
  obstruct(side, match) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side, match);
    });
  }
  update(deltaTime, level) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime, level);
    });
    this.alivePeriod += deltaTime;
  }
}
export class Trait {
  constructor(name) {
    this.NAME = name;
  }
  obstruct() {}
  collides(otherEntities, player) {}
  update() {}
}
