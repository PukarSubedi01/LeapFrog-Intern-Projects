import Entity, { Trait } from "./entity.js";
import { loadSpriteSheet } from "../loaders.js";
import CollisionObject from "../traits/collisionObject.js";
import Gravity from "../traits/hasGravity.js";
import canProvide from "../traits/canProvide.js";

export function loadElement() {
  return loadSpriteSheet("compensations").then(createElementsFactory);
}
class Behaviour extends Trait {
  constructor() {
    super("behaviour");
  }
  collides(element, otherEntities) {
    if (otherEntities.canBefollowed) {
      otherEntities.shoot.defaultGun = false;
      element.canProvide.setDestruct();
    }
  }
}
function createElementsFactory(sprite) {
  function drawElement(context) {
    sprite.draw("fireGun", context, 0, 0);
  }

  return function createElement() {
    const element = new Entity();
    element.size.set(40, 40);
    element.vel.set(1000, 0);
    element.addTrait(new CollisionObject());
    element.addTrait(new canProvide());
    element.addTrait(new Gravity());
    element.addTrait(new Behaviour());
    element.addTrait;
    element.draw = drawElement;

    return element;
  };
}
