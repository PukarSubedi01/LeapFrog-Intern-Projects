import { constantVals } from "../constants.js";
export function createBackgroundLayer(backgrounds, sprites) {
  const bgBuffer = document.createElement("canvas");
  bgBuffer.width = constantVals.CANVAS_WIDTH;
  bgBuffer.height = constantVals.CANVAS_HEIGHT;
  const context = bgBuffer.getContext("2d");

  backgrounds.forEach((background) => {
    drawBackground(background, context, sprites);
  });
  function redraw(camera) {
    backgrounds.forEach((background) => {
      if (
        background.name === "background1" ||
        background.name === "background2"
      ) {
        sprites.draw(
          background.name,
          context,
          -camera.pos.x % constantVals.CANVAS_WIDTH,
          background.position.yAxis
        );
      } else {
        sprites.draw(
          background.name,
          context,
          background.position.xAxis - camera.pos.x,
          background.position.yAxis
        );
      }
    });
  }

  return function drawBackgroundLayer(context, camera) {
    context.drawImage(bgBuffer, -camera.pos.x % 2, -camera.pos.y);
    redraw(camera);
  };
}

function drawBackground(background, context, sprite) {
  sprite.draw(
    background.name,
    context,
    background.position.xAxis,
    background.position.yAxis
  );
}
