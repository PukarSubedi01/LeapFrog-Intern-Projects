import { PositionVectors } from "./calculations/calculations.js";
import { constantVals } from "./constants.js";
export default class Camera {
  constructor() {
    this.pos = new PositionVectors(0, 0);
    this.size = new PositionVectors(
      constantVals.CANVAS_WIDTH,
      constantVals.CANVAS_HEIGHT
    );
  }
}
