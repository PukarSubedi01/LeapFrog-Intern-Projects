import { PositionVectors } from "../calculations/calculations.js";

/**
 * holds characters
 */
export default class Entity {
  constructor() {
    this.pos = new PositionVectors(0, 0);
    this.vel = new PositionVectors(0, 0);
  }
}
