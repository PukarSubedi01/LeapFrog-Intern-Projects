import { platFormConsts, constantVals } from "../constants.js";
export function createPlatformLayer(level, sprites) {
  const platformBuffer = document.createElement("canvas");
  platformBuffer.width = constantVals.CANVAS_WIDTH;
  platformBuffer.height = constantVals.CANVAS_HEIGHT;
  const context = platformBuffer.getContext("2d");
  const platforms = level.platforms;

  let startIndex, endIndex;
  function redraw(drawFrom, drawTo) {
    if (drawFrom === startIndex && drawTo === endIndex) {
      return;
    }
    startIndex = drawFrom;
    endIndex = drawTo;

    for (let x = startIndex; x <= endIndex; ++x) {
      const col = platforms.grid[x];
      if (col) {
        col.forEach((platform, y) => {
          sprites.drawPlatform(
            platform.name,
            context,
            (x - startIndex) * platFormConsts.WIDTH,
            y * platFormConsts.HEIGHT
          );
        });
      }
    }
  }

  return function drawPlatformLayer(context, camera) {
    context.drawImage(platformBuffer, -camera.pos.x, -camera.pos.y);
  };
}
