import LayerCompositor from "../layers/layerCompositor.js";
import { Matrix } from "../calculations/calculations.js";

export default class Level {
  constructor() {
    this.comp = new LayerCompositor();
    this.entities = new Set();
    this.elements = new Matrix();
  }
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);
    });
  }
}
