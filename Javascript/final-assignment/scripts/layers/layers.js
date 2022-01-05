import { constantVals } from "../constants.js";
function drawBackground(background, context, sprite) {
  sprite.drawSprite(
    background.name,
    context,
    background.position.xAxis,
    background.position.yAxis
  );
}

export function createBackgroundLayer(backgrounds, sprites) {
  const bgBuffer = document.createElement("canvas");
  bgBuffer.width = constantVals.CANVAS_WIDTH;
  bgBuffer.height = constantVals.CANVAS_HEIGHT;

  backgrounds.forEach((background) => {
    drawBackground(background, bgBuffer.getContext("2d"), sprites);
  });
  return function drawBackgroundLayer(context) {
    context.drawImage(bgBuffer, 0, 0);
  };
}

export function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.drawMarco(context);
  };
}
