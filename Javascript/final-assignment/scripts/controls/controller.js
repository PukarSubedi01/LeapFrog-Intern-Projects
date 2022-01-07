import KeyboardState from "./keyboardState.js";
export function controller(entity) {
  const input = new KeyboardState();

  input.addMapping("Space", (keyState) => {
    if (keyState) {
      entity.jump.start();
    } else {
      entity.jump.cancel();
    }
  });

  input.addMapping("ArrowRight", (keyState) => {
    entity.walk.dir = keyState;
  });

  input.addMapping("ArrowLeft", (keyState) => {
    entity.walk.dir = -keyState;
  });
  return input;
}

export function mouseDebugger(canvas, entity, camera) {
  let prevEvent;
  ["mousedown", "mousemove"].forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      if (event.buttons === 1) {
        entity.vel.set(0, 0);
        entity.pos.set(
          event.offsetX + camera.pos.x,
          event.offsetY + camera.pos.y
        );
      } else if (
        event.buttons === 2 &&
        prevEvent &&
        prevEvent.buttons === 2 &&
        prevEvent.type === "mousemove"
      ) {
        camera.pos.x -= event.offsetX - prevEvent.offsetX;
      }
      prevEvent = event;
    });
  });
  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
  });
}
