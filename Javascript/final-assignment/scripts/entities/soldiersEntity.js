import Entity from "./entity.js";
import Killable from "../traits/killable.js";
import Walk from "../traits/walk.js";
import CanKnife from "../traits/canKnife.js";
import { constantVals, soldierConsts } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";
import { Trait } from "./entity.js";
import CollisionObject from "../traits/collisionObject.js";
import Movements from "../traits/movements.js";

class Behaviour extends Trait {
  constructor() {
    super("behaviour");
    this.countHandler = 0;
  }
  collides(soldier, otherEntities) {
    if (otherEntities.canRelease) {
      soldier.canKnife.attack();
    }

    if (soldier.killable.isDead) {
      soldier.isDead = true;
      soldier.canKnife.isAttacking = false;
      this.countHandler++;
      if (this.countHandler === 1) {
        soldier.walk.speed = 0;
        soldier.walk.dir = 0;
      }
      return;
    }
    this.killSoldiers(soldier, otherEntities);
  }
  follow(soldier, otherEntities) {
    if (otherEntities.canBefollowed) {
      let diffX = otherEntities.pos.x - soldier.pos.x;

      if (diffX > -constantVals.CANVAS_WIDTH) {
        soldier.walk.speed = 8000;
        if (soldier.isDead || soldier.canKnife.isAttacking) {
          if (diffX > 0) {
            soldier.walk.heading = 1;
          } else {
            soldier.walk.heading = -1;
          }

          soldier.walk.speed = 0;
          soldier.walk.dir = 0;
          return;
        }
        if (diffX > 0) {
          soldier.walk.dir = 1;
          soldier.walk.heading = -1;
        } else {
          soldier.walk.heading = 1;
          soldier.walk.dir = -1;
        }
      }
    }
  }

  killSoldiers(soldier, bullets) {
    if (bullets.canKill) {
      soldier.killable.attack(bullets.canKill.damage);
      bullets.canKill.setDestruct();
    }
  }
}

export function loadSoldiers() {
  return loadSpriteSheet("soldiers").then(createSoldiersFactory);
}
function createSoldiersFactory(sprite) {
  const animateFrame = sprite.animations.get("run");
  const animateKnifing = sprite.animations.get("knife");
  const animateDeath = sprite.animations.get("death");
  function animationRoute(soldier) {
    if (soldier.isDead) {
      return animateDeath(soldier.deathPeriod);
    }
    if (soldier.canKnife.isAttacking) {
      return animateKnifing(soldier.alivePeriod);
    }

    return animateFrame(soldier.alivePeriod);
  }

  function drawSoldiers(context) {
    sprite.draw(animationRoute(this), context, 0, 0, this.walk.heading < 0);
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
    // const walk = new Walk();
    // walk.speed = -30;
    // walk.update = (soldier) => {
    //   soldier.vel.x = walk.speed;
    // };

    soldier.addTrait(new Walk());
    soldier.addTrait(new CanKnife());
    soldier.addTrait(new CollisionObject());
    soldier.addTrait(new Movements());
    soldier.addTrait(new Behaviour());
    soldier.addTrait(new Killable());

    soldier.draw = drawSoldiers;
    return soldier;
  };
}
