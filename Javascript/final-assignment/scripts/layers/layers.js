import { constantVals } from "../constants.js";
function drawBackground(background, context, sprite) {
  sprite.draw(
    background.name,
    context,
    background.position.xAxis,
    background.position.yAxis
  );
}

function drawPlatform(platform, context, sprites) {
  platform.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; ++x) {
      for (let y = y1; y < y2; ++y) {
        sprites.drawPlatform(platform.name, context, x, y);
      }
    }
  });
}

export function createPlatformLayer(platforms, sprites) {
  const platformBuffer = document.createElement("canvas");
  platformBuffer.width = constantVals.CANVAS_WIDTH;
  platformBuffer.height = constantVals.CANVAS_HEIGHT;

  platforms.forEach((platform) => {
    drawPlatform(platform, platformBuffer.getContext("2d"), sprites);
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
