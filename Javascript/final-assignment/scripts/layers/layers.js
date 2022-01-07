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
  platformBuffer.width = constantVals.CANVAS_WIDTH + 6;
  platformBuffer.height = constantVals.CANVAS_HEIGHT;
  const context = platformBuffer.getContext("2d");
  const resolver = level.platformCollider.platforms;
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

  // level.platforms.forEach((platform, x, y) => {
  //   sprites.drawPlatform(
  //     platform.name,
  //     context,
  //     x * platFormConsts.WIDTH,
  //     y * platFormConsts.HEIGHT
  //   );
  // });

  return function drawPlatformLayer(context, camera) {
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;
    redraw(drawFrom, drawTo);

    context.drawImage(platformBuffer, -camera.pos.x % 6, -camera.pos.y);
  };
}

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

export function createSpriteLayer(entities, width = 64, height = 64) {
  const spriteBuffer = document.createElement("canvas");
  spriteBuffer.width = width;
  spriteBuffer.height = height;
  const spriteBufferContext = spriteBuffer.getContext("2d");

  return function drawSpriteLayer(context, camera) {
    entities.forEach((entity) => {
      spriteBufferContext.clearRect(0, 0, width, height);
      entity.drawMarco(spriteBufferContext);
      context.drawImage(
        spriteBuffer,
        entity.pos.x - camera.pos.x,
        entity.pos.y - camera.pos.y
      );
    });
  };
}

export function createCameraLayer(cameraToDraw) {
  return function drawCameraRect(context, fromCamera) {
    context.strokeStyle = "white";
    context.beginPath();
    context.rect(
      cameraToDraw.pos.x - fromCamera.pos.x,
      cameraToDraw.pos.y - fromCamera.pos.y,
      cameraToDraw.size.x,
      cameraToDraw.size.y
    );
    context.stroke();
  };
}
