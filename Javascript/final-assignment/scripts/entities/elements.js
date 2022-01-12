import Entity from "./entity.js";
import { loadSpriteSheet } from "../loaders.js";
import CollisionObject from "../traits/collisionObject.js";
import Gravity from "../traits/hasGravity.js";

export function loadElement() {
  return loadSpriteSheet("compensations").then(createElementsFactory);
}
function createElementsFactory(sprite) {
  function drawElement(context) {
    //randomize elements
    sprite.draw("fireGun", context, 0, 0);
  }

  return function createBullet() {
    const element = new Entity();
    element.size.set(40, 40);
    element.vel.set(1000, 0);
    element.addTrait(new CollisionObject());
    element.addTrait(new Gravity());

    element.draw = drawElement;

    return element;
  };
}
