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

function createPlatforms(level, platforms) {
  platforms.forEach((platform) => {
    platform.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; ++x) {
        for (let y = y1; y < y2; ++y) {
          level.platforms.set(x, y, {
            name: platform.name,
          });
        }
      }
    });
  });
}

export function loadLevel(name) {
  const url = `/levels/${name}.json`;
  return Promise.all([
    fetch(url).then((result) => result.json()),

    loadBackgroundSprites(),
    loadPlatform(),
  ]).then(([levelSpec, backgroundSprites, platform]) => {
    const level = new Level();
    createPlatforms(level, levelSpec.platform);

    const bgLayer = createBackgroundLayer(
      levelSpec.backgrounds,
      backgroundSprites
    );
    level.comp.layers.push(bgLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    const platformLayer = createPlatformLayer(level, platform);
    level.comp.layers.push(platformLayer);

    return level;
  });
}
