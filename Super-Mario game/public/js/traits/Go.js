import {Trait} from "../entity.js";
export default class Go extends Trait {
    constructor() {
      super('go');
      this.dir = 0;
        this.speed = 6000;
      this.heading = 1;
        this.distance = 0;
    }
    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.dir * deltaTime;

        if(this.dir) {
            this.heading = this.dir;
            this.distance += Math.abs(entity.vel.x) * deltaTime;
        } else {
            this.distance = 0;
        }
    }
  }