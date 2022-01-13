import Entity, { Trait } from "./entity.js";
import { loadSpriteSheet } from "../loaders.js";
import CollisionObject from "../traits/collisionObject.js";
import Gravity from "../traits/hasGravity.js";
import canProvide from "../traits/canProvide.js";

export function loadHealth() {
  return loadSpriteSheet("compensations").then(createHealthFactory);
}
class Behaviour extends Trait {
  constructor() {
    super("behaviour");
  }
  collides(health, otherEntities) {
    if (otherEntities.canBefollowed) {
      const healthIncreament = document.getElementById("health-points");
      healthIncreament.innerHTML = 100;
      otherEntities.killable.health = 100;
      health.canProvide.setDestruct();
    }
  }
}
function createHealthFactory(sprite) {
  function drawHealth(context) {
    sprite.draw("health", context, 0, 0);
  }

  return function createHealth() {
    const health = new Entity();
    health.size.set(40, 40);
    health.vel.set(1000, 0);
    health.addTrait(new CollisionObject());
    health.addTrait(new canProvide());
    health.addTrait(new Gravity());
    health.addTrait(new Behaviour());
    health.addTrait;
    health.draw = drawHealth;

    return health;
  };
}
