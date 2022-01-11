import Entity from "./entity.js";
import Killable from "../traits/killable.js";
import Walk from "../traits/walk.js";
import { soldierConsts } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";
import { Trait } from "./entity.js";
import CollisionObject from "../traits/collisionObject.js";
import Movements from "../traits/movements.js";

class Behaviour extends Trait {
  constructor() {
    super("behaviour");
  }
  collides(soldier, otherEntities) {
    if (soldier.killable.isDead) {
      return;
    }
    this.killSoldiers(soldier, otherEntities);
    this.killMarco(soldier, otherEntities);
  }

  killSoldiers(soldier, bullets) {
    if (bullets.canKill) {
      console.log(bullets);
      soldier.killable.kill();
      bullets.canKill.setDestruct();
      soldier.walk.speed = 0;
    }
  }
  killMarco(soldier, marco) {
    if (marco.killable) {
      marco.killable.kill();
    }
  }
}

export function loadSoldiers() {
  return loadSpriteSheet("soldiers").then(createSoldiersFactory);
}
function createSoldiersFactory(sprite) {
  const animateFrame = sprite.animations.get("run");

  function animationRoute(soldier) {
    if (soldier.killable.isDead) {
      return "soldier1"; //animate soldier after death
    }
    return animateFrame(soldier.alivePeriod);
  }

  function drawSoldiers(context) {
    sprite.draw(animationRoute(this), context, 0, 0);
    // sprite.draw("soldier12", context, 0, 0);
  }
  return function createSoldier() {
    const soldier = new Entity();
    soldier.size.set(soldierConsts.WIDTH, soldierConsts.HEIGHT);

    // soldier.addTrait({
    //   NAME: "walk",
    //   speed: -30,
    //   obstruct() {},
    //   collides() {},
    //   update(soldier) {
    //     soldier.vel.x = this.speed;
    //   },
    // });
    const walk = new Walk();
    walk.speed = -30;
    walk.update = (soldier) => {
      soldier.vel.x = walk.speed;
    };

    soldier.addTrait(walk);
    soldier.addTrait(new CollisionObject());
    soldier.addTrait(new Movements());
    soldier.addTrait(new Behaviour());
    soldier.addTrait(new Killable());

    soldier.draw = drawSoldiers;
    return soldier;
  };
}
