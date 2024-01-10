import { loadLevel } from "./loaders.js";
import { createMario } from "./entities.js";
import Timer from "./Timer.js";
import { setupKeyboard } from "./input.js";
import Camera from "./Camera.js";
import { createCollisionLayer, createCameraLayer } from "./layers.js";
import { setupMouseControl } from "./debug.js";
// using canvas to draw the game object
const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createMario(), loadLevel("1-1")]).then(
  ([mario, level]) => {
    const camera = new Camera();
    window.camera = camera;
    // level.comp.layers.push(createCollisionLayer(level), createCameraLayer(camera));
    mario.pos.set(64, 64);
    level.entities.add(mario);
    const input = setupKeyboard(mario);

    
    input.listenTo(window);
    setupMouseControl(canvas, mario, camera);
    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      if(mario.pos.x > 100)
      {
        camera.pos.x = mario.pos.x - 100;
      }
      level.comp.draw(context, camera);

    };
    timer.start();
  }
);
