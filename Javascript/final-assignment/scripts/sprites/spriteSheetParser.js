export default class SpriteSheetParser {
  constructor(image) {
    this.image = image;
    this.element = new Map();
  }

  spriteDefine(name, spriteProp) {
    const buffers = [false, true].map((flip) => {
      const buffer = document.createElement("canvas");
      buffer.width = spriteProp.width;
      buffer.height = spriteProp.height;

      const context = buffer.getContext("2d");
      if (flip) {
        context.scale(-1, 1);
        context.translate(-spriteProp.width, 0);
      }

      context.drawImage(
        this.image,
        spriteProp.x,
        spriteProp.y,
        spriteProp.subSetElementWidth,
        spriteProp.subsetElementHeight,
        0,
        0,
        spriteProp.width,
        spriteProp.height
      );
      return buffer;
    });

    this.element.set(name, buffers);
  }

  draw(name, context, x, y, flip = false) {
    const buffer = this.element.get(name)[flip ? 1 : 0];
    context.drawImage(buffer, x, y);
  }
  definePlatform(name, width, height) {
    const buffer = document.createElement("canvas");
    buffer.width = width;
    buffer.height = height;
    buffer.getContext("2d").drawImage(
      this.image,

      0,
      0,
      width,
      height
    );
    this.element.set(name, buffer);
  }
  drawPlatform(name, context, x, y) {
    this.draw(name, context, x, y);
  }
}
