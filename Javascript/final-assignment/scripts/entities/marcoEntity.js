import Entity from "./entity.js";

import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { marcoConstants } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";
import Shoot from "../traits/shoot.js";
import Killable from "../traits/killable.js";
import Movements from "../traits/movements.js";
import CollisionObject from "../traits/collisionObject.js";

export function loadMarco(entityFactory) {
  return Promise.all([loadSpriteSheet("marco")]).then(([sprite]) => {
    return createMarcoFactory(sprite, entityFactory);
  });
}
function createMarcoFactory(sprite, entityFactory) {
  const animateFrame = sprite.animations.get("run");

  function animateMarco(marco) {
    if (marco.jump.falling) {
      return "jump";
    }
    if (marco.walk.dir !== 0) {
      return animateFrame(marco.walk.distance);
    }
    return "idle-Marco";
  }
  function drawMarco(context) {
    sprite.draw(animateMarco(this), context, 0, 0, this.walk.heading < 0);
  }
  function shootBullets(entity, level) {
    const bullet = entityFactory.machineGunBullet();
    bullet.pos.set(0, 0);
    level.entities.add(bullet);
  }

  return function createMarco() {
    const marco = new Entity();
    marco.size.set(marcoConstants.WIDTH, marcoConstants.HEIGHT);

    const shoot = new Shoot();
    shoot.bullets.push(shootBullets);

    marco.addTrait(shoot);

    marco.addTrait(new CollisionObject());
    marco.addTrait(new Movements());
    marco.addTrait(new Walk());
    marco.addTrait(new Jump());
    marco.addTrait(shoot);
    marco.addTrait(new Killable());
    marco.draw = drawMarco;

    return marco;
  };
}
