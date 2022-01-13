import { constantVals } from "../constants.js";
export function createPlatformLayer() {
  const platformBuffer = document.createElement("canvas");
  platformBuffer.width = constantVals.CANVAS_WIDTH;
  platformBuffer.height = constantVals.CANVAS_HEIGHT;

  return function drawPlatformLayer(context, camera) {
    context.drawImage(platformBuffer, -camera.pos.x, -camera.pos.y);
  };
}
