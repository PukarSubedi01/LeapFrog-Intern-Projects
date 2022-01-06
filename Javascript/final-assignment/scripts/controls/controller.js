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
