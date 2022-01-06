import { constantVals, platFormConsts } from "../constants.js";
function drawBackground(background, context, sprite) {
  sprite.draw(
    background.name,
    context,
    background.position.xAxis,
    background.position.yAxis
  );
}

export function createPlatformLayer(level, sprites) {
  const platformBuffer = document.createElement("canvas");
  platformBuffer.width = constantVals.CANVAS_WIDTH;
  platformBuffer.height = constantVals.CANVAS_HEIGHT;
  const context = platformBuffer.getContext("2d");

  level.platforms.forEach((platform, x, y) => {
    sprites.drawPlatform(
      platform.name,
      context,
      x * platFormConsts.WIDTH,
      y * platFormConsts.HEIGHT
    );
  });

  return function drawPlatformLayer(context) {
    context.drawImage(platformBuffer, 0, 0);
  };
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

export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach((entity) => {
      entity.drawMarco(context);
    });
  };
}
