import LayerCompositor from "../layers/layerCompositor.js";

export default class Level {
  constructor() {
    this.comp = new LayerCompositor();
    this.entities = new Set();
  }
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);
    });
  }
}
