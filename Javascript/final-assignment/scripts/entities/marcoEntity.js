import Entity from "./entity.js";
import { Trait } from "./entity.js";
import Jump from "../traits/jump.js";
import Walk from "../traits/walk.js";
import { marcoConstants } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";
import Shoot from "../traits/shoot.js";
import Killable from "../traits/killable.js";
import Movements from "../traits/movements.js";
import CollisionObject from "../traits/collisionObject.js";
import CanBeFollowed from "../traits/canBeFollowed.js";
import CanRelease from "../traits/canRelease.js";
import GetInside from "../traits/getInside.js";
class Behaviour extends Trait {
  constructor() {
    super("behaviour");
    this.countHandler = 0;
  }
  collides(marco, otherEntities) {
    if (otherEntities.canKnife) {
      marco.killable.decreaseHealthAfter = 0.5;
      marco.killable.attack(otherEntities.canKnife.damage);
    }
  }
}

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
    const bulletDirection = entity.walk.heading;

    if (bulletDirection === 1) {
      bullet.pos.set(
        entity.pos.x + entity.size.x,
        entity.pos.y + entity.size.x / 2
      );
    } else if (bulletDirection === -1) {
      bullet.pos.set(entity.pos.x, entity.pos.y + entity.size.x / 2);
    }
    bullet.travel.direction = entity.walk.heading;
    bullet.travel.initialBulletPosX = entity.pos.x;

    level.entities.add(bullet);
  }

  return function createMarco() {
    const marco = new Entity();
    marco.size.set(marcoConstants.WIDTH, marcoConstants.HEIGHT);

    const shoot = new Shoot();
    shoot.bullets.push(shootBullets);

    marco.addTrait(shoot);
    marco.addTrait(new Killable());
    marco.killable.removeEntityAfter = 0;
    marco.addTrait(new CollisionObject());
    marco.addTrait(new Movements());

    marco.addTrait(new GetInside());
    marco.addTrait(new Walk());
    marco.addTrait(new Jump());
    marco.addTrait(shoot);
    marco.addTrait(new CanBeFollowed());
    marco.addTrait(new CanRelease());
    marco.addTrait(new Behaviour());
    marco.draw = drawMarco;

    return marco;
  };
}
