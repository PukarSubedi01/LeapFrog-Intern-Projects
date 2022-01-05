export default class SpriteSheetParser {
  constructor(image) {
    this.image = image;
    this.element = new Map();
  }

  spriteDefine(name, spriteProp) {
    const buffer = document.createElement("canvas");
    buffer.width = spriteProp.width;
    buffer.height = spriteProp.height;
    buffer
      .getContext("2d")
      .drawImage(
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
    this.element.set(name, buffer);
  }
  drawSprite(name, context, x, y) {
    const buffer = this.element.get(name);

    context.drawImage(buffer, x, y);
  }
}
