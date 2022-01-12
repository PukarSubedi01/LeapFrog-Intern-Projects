import Entity from "./entity.js";
import { loadSpriteSheet } from "../loaders.js";
import CollisionObject from "../traits/collisionObject.js";
import Movements from "../traits/movements.js";
export function loadTank() {
  return loadSpriteSheet("vehicles").then(createVehicleFactory);
}
function createVehicleFactory(sprite) {
  function drawVehicle(context) {
    sprite.draw("tank", context, 0, 0);
  }

  return function createVehicle() {
    const vehicle = new Entity();
    vehicle.size.set(130, 140);

    vehicle.addTrait(new CollisionObject());

    vehicle.addTrait(new Movements());

    vehicle.draw = drawVehicle;

    return vehicle;
  };
}
