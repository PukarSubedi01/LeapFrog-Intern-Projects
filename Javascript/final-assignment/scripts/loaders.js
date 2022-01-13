import Level from "./levels/level.js";
import SpriteSheetParser from "./sprites/spriteSheetParser.js";
import { createSpriteLayer } from "./layers/spriteLayer.js";
import { createBackgroundLayer } from "./layers/backgroundLayer.js";
import { createPlatformLayer } from "./layers/platformLayer.js";
import { loadPlatform } from "./sprites/spriteLoaders.js";
import createAnimation from "./animations/animate.js";

export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function loadSpriteSheet(name) {
  return loadJson(`./levels/${name}.json`)
    .then((sheetSpec) =>
      Promise.all([sheetSpec, loadImage(sheetSpec.imageUrl)])
    )
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheetParser(image);
      if (sheetSpec.sprite) {
        sheetSpec.sprite.forEach((element) => {
          sprites.spriteDefine(element.name, element.props);
        });
      }
      if (sheetSpec.frames) {
        sheetSpec.frames.forEach((frame) => {
          sprites.spriteDefine(frame.name, frame.props);
        });
      }
      if (sheetSpec.animations) {
        sheetSpec.animations.forEach((animationSpec) => {
          const animation = createAnimation(
            animationSpec.frames,
            animationSpec.frameLen
          );
          sprites.defineAnimation(animationSpec.name, animation);
        });
      }

      return sprites;
    });
}

export function createLevelLoader(entityFactory) {
  return function loadLevel(name) {
    return loadJson(`./levels/${name}.json`)
      .then((levelSpec) =>
        Promise.all([
          levelSpec,
          loadSpriteSheet(levelSpec.spriteSheet),
          loadPlatform(),
        ])
      )

      .then(([levelSpec, backgroundSprites, platform]) => {
        const level = new Level();

        createPlatforms(level, levelSpec.platform);

        setupBackgrounds(levelSpec, level, backgroundSprites);

        setupEntities(levelSpec, level, entityFactory);

        setupPlatform(level, platform);
        return level;
      });
  };
}

function setupBackgrounds(levelSpec, level, backgroundSprites) {
  const bgLayer = createBackgroundLayer(
    levelSpec.backgrounds,
    backgroundSprites
  );
  level.comp.layers.push(bgLayer);
}
function setupEntities(levelSpec, level, entityFactory) {
  levelSpec.entities.forEach(({ name, position }) => {
    position.forEach(([x, y]) => {
      const createEntity = entityFactory[name];
      const entity = createEntity();
      entity.pos.set(x, y);
      level.entities.add(entity);
    });
  });

  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);
}

function setupPlatform(level, platform) {
  const platformLayer = createPlatformLayer(level, platform);
  level.comp.layers.push(platformLayer);
}

function createPlatforms(level, platforms) {
  function applyRange(platform, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        level.platforms.set(x, y, {
          name: platform.name,
          type: platform.type,
        });
      }
    }
  }

  platforms.forEach((platform) => {
    platform.ranges.forEach((range) => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        applyRange(platform, xStart, xLen, yStart, yLen);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRange(platform, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(platform, xStart, 1, yStart, 1);
      }
    });
  });
}

function loadJson(url) {
  return fetch(url).then((result) => result.json());
}
