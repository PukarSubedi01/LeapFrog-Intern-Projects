import Level from "./levels/level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers/layers.js";
import { loadBackgroundSprites } from "./sprites/spriteLoaders.js";

export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}
export function loadLevel(name) {
  const url = `/levels/${name}.json`;
  return Promise.all([
    fetch(url).then((result) => result.json()),

    loadBackgroundSprites(),
  ]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();
    const bgLayer = createBackgroundLayer(
      levelSpec.backgrounds,
      backgroundSprites
    );
    level.comp.layers.push(bgLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
}
