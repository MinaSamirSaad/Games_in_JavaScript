import Keyboard from "./KeyboardState.js";
export function setupKeyboard(mario) {
    const input = new Keyboard();
        input.addMapping('Space', (keyState) => {
          if (keyState) {
            mario.jump.start();
          } else {
            mario.jump.cancel();
          }
        });
        input.addMapping('KeyZ', (keyState) => {
          mario.turbo(keyState);
        });
        input.addMapping('ArrowRight', (keyState) => {
          mario.go.dir += keyState ? 1 : -1;
        });
        input.addMapping('ArrowLeft', (keyState) => {
          mario.go.dir += keyState? -1 : 1;
        });
        return input;
}
