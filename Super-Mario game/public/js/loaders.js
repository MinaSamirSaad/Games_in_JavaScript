import Level from "./Level.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import { loadBackgroundSprites } from "./sprites.js";
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

function createTiles(level, backgrounds) {
    backgrounds.forEach(background => {
        background.ranges.forEach(([x1, x2, y1, y2]) => {
            for (let x = x1; x < x2; ++x) {
                for (let y = y1; y < y2; ++y) {
                    level.tiles.set(x, y, {
                        name: background.tile,
                    });
                }
            }
        });
    });
}
export function loadLevel(name) {
  return Promise.all([
    fetch(`/levels/${name}.json`)
    .then((res) => res.json()),
    loadBackgroundSprites(),
  ])
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
