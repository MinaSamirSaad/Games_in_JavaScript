import { Vec2 } from "./math.js";
export const Sides = {
  Top: Symbol("Top"),
  Bottom: Symbol("Bottom"),
};
export class Trait
{
  constructor(name){
    this.NAME = name;
  }
  obstruct(){

  }
  update(){
    console.warn("Unhandled update call in Trait");
  }
}
export default class Entity {
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.traits = [];
  }
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }
  obstruct(side) {
    this.traits.forEach((trait) => {
      trait.obstruct(this, side);
    });
  }
  update(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
}
