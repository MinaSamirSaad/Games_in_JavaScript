import Level from "./Level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import SpriteSheet from "./spriteSheet.js";
import { createAnim } from './anim.js';
// using a Promise, the code encapsulates the image loading operation and provides a way to handle the result (the loaded image) when it becomes available
export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}
function loadJSON(url) {
  return fetch(url).then((res) => res.json());
}
function createTiles(level, backgrounds) {
  function applyRange(background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; ++x) {
      for (let y = yStart; y < yEnd; ++y) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type,
        });
      }
    }
  }
  backgrounds.forEach((background) => {
    background.ranges.forEach((range) => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        applyRange(background, xStart, xLen, yStart, yLen);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRange(background, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(background, xStart, 1, yStart, 1);
      }
    });
  });
}
export function loadSpriteSheet(name) {
  return loadJSON(`/sprites/${name}.json`)
    .then((sheetSpec) =>
      Promise.all([sheetSpec, loadImage(sheetSpec.imageURL)])
    )
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(image, sheetSpec.tileW, sheetSpec.tileH);
      if (sheetSpec.tiles) {
        sheetSpec.tiles.forEach((tileSpec) => {
          sprites.defineTile(
            tileSpec.name,
            tileSpec.index[0],
            tileSpec.index[1]
          );
        });
      }
      if (sheetSpec.frames) {
        sheetSpec.frames.forEach((frameSpec) => {
          sprites.define(frameSpec.name, ...frameSpec.rect);
        });
      }
      if (sheetSpec.animations) {
        sheetSpec.animations.forEach((animSpec) => {
          const animation = createAnim(animSpec.frames, animSpec.frameLen);
          sprites.defineAnim(animSpec.name, animation);
        });
      }
      return sprites;
    });
}
export function loadLevel(name) {
  return loadJSON(`/levels/${name}.json`)
    .then((levelSpec) =>
      Promise.all([levelSpec, loadSpriteSheet(levelSpec.spriteSheet)])
    )
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();
      createTiles(level, levelSpec.backgrounds); // define the tiles in matrix array
      level.comp.layers.push(
        createBackgroundLayer(level, backgroundSprites) // create the tiles as a canvas layers
      );
      level.comp.layers.push(createSpriteLayer(level.entities)); // create the entities as a canvas layers
      return level;
    });
}
