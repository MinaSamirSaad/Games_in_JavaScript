export default class SpriteSheet {
  constructor(image, w = 16, h = 16) {
    this.image = image;
    this.width = w;
    this.height = h;
    this.tiles = new Map();
    this.animations = new Map();
  }
  defineAnim(name,animation)
  {
    this.animations.set(name,animation);
  }
  define(name, x, y, width, height) {
    const buffers = [false, true].map((flip) => {
    const buffer = document.createElement("canvas");
    buffer.height = height;
    buffer.width = width;
    const context = buffer.getContext("2d");
    if(flip)
    {
        context.scale(-1, 1);
        context.translate(-width, 0);
    }
    context.drawImage(
      this.image,
      // These four values define the source rectangle within the image.
      // top left corner
      x,
      y,
      // the width and height of the rectangle
      width,
      height,
      // ---------------------
      // These four values define the destination rectangle on the canvas
      // // top left corner
      0,
      0,
      // the width and height of the rectangle
      width,
      height
    );
    return buffer;
    });
    this.tiles.set(name, buffers);
  }
  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }
  draw(name, context, x, y, flip = false) {
    const buffer = this.tiles.get(name)[flip ? 1 : 0];
    context.drawImage(buffer, x, y);
  }
  drawAnim(name, context, x, y, distance)
  {
    const animation = this.animations.get(name);
    this.drawTile(animation(distance),context,x,y);
  }
  drawTile(name, context, x, y) {
    this.draw(
      name,
      context,
      // x : is  the destination left corner in main canvas object
      x * this.width,
      // y : is the destination of top corner in main canvas object
      y * this.height
    );
  }
}
