export default class LayerCompositor {
  constructor() {
    this.layers = [];
  }
  drawLayer(context, camera) {
    this.layers.forEach((layer) => {
      layer(context, camera);
    });
  }
}
