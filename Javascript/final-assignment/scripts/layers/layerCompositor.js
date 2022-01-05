export default class LayerCompositor {
  constructor() {
    this.layers = [];
  }
  drawLayer(context) {
    this.layers.forEach((layer) => {
      layer(context);
    });
  }
}
