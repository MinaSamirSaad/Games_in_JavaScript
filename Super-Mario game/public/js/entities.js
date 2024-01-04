import { loadMarioSprite } from "./sprites.js";
import Entity from "./entity.js";
import Velocity from "./traits/Velocity.js";
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';

// this will update in future it is not a best solution
export function createMario(){
    return loadMarioSprite().then((sprite) => {
        const mario = new Entity();
        mario.size.set(14, 16);
        mario.addTrait(new Go());
      mario.addTrait(new Jump());
      // mario.addTrait(new Velocity());
        mario.draw = function drawMario(context) {
          sprite.draw("idle", context, this.pos.x, this.pos.y);
        };
        return mario;
    });

}