export default class SpriteSheet {
  constructor(image, w = 16, h = 16) {
    this.image = image;
    this.width = w;
    this.height = h;
    this.tiles = new Map();
  }

  define(name, x, y, width, height) {
    const buffer = document.createElement("canvas");
    buffer.height = height;
    buffer.width = width;
    buffer.getContext("2d").drawImage(
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
    this.tiles.set(name, buffer);
  }
  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }
  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
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
