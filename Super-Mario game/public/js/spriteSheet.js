export default class SpriteSheet {
    constructor(image, w = 16, h = 16) {
      this.image = image;
      this.width = w;
      this.height = h;
      this.tiles = new Map();
    }
  
    define(name, x, y) {
      const buffer = document.createElement("canvas");
      buffer.height = this.height;
      buffer.width = this.width;
      buffer.getContext("2d").drawImage(
        this.image,
        // These four values define the source rectangle within the image.
        // top left corner
        this.width * x,
        this.height * y,
        // the width and height of the rectangle
        this.width,
        this.height,
        // ---------------------
        // These four values define the destination rectangle on the canvas
        // // top left corner
        0,
        0,
        // the width and height of the rectangle
        this.width,
        this.height
      );
      this.tiles.set(name, buffer);
    }
  
    draw(name, context, x, y) {
      const buffer = this.tiles.get(name);
      context.drawImage(buffer, x, y);
    }
    drawTile(name, context, x, y) {
      this.draw(name, context, x * this.width, y * this.height);
  }
  }
