import Level from "./levels/level.js";
import {
  createBackgroundLayer,
  createSpriteLayer,
  createPlatformLayer,
} from "./layers/layers.js";
import {
  loadBackgroundSprites,
  loadPlatform,
} from "./sprites/spriteLoaders.js";

export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}
//asdasdasd
// function createElements(level, backgrounds) {
//   backgrounds.forEach((bg) => {
//     level.elements.set(bg.position.xAxis, bg.position.yAxis, {
//       name: bg.name,
//     });
//   });
// }

export function loadLevel(name) {
  const url = `/levels/${name}.json`;
  return Promise.all([
    fetch(url).then((result) => result.json()),

    loadBackgroundSprites(),
    loadPlatform(),
  ]).then(([levelSpec, backgroundSprites, platform]) => {
    const level = new Level();
    // createElements(level, levelSpec.backgrounds);

    const bgLayer = createBackgroundLayer(
      levelSpec.backgrounds,
      backgroundSprites
    );
    level.comp.layers.push(bgLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    const platformLayer = createPlatformLayer(levelSpec.platform, platform);
    level.comp.layers.push(platformLayer);

    return level;
  });
}
