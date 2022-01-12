import Entity from "./entity.js";
import { Trait } from "./entity.js";
import Walk from "../traits/walk.js";
import CanBeReleased from "../traits/canBeReleased.js";
import { prisonerConsts } from "../constants.js";
import { loadSpriteSheet } from "../loaders.js";
import CollisionObject from "../traits/collisionObject.js";
import Movements from "../traits/movements.js";

export function loadPrisoners(entityFactory) {
  return Promise.all([loadSpriteSheet("prisoners")]).then(([sprite]) => {
    return createPrisonersFactory(sprite, entityFactory);
  });
}

const STATE_TIED = Symbol("tied");
const STATE_RELEASED = Symbol("RELEASED");

class Behaviour extends Trait {
  constructor() {
    super("behaviour");
    this.state = STATE_TIED;
    this.releaseTime = 0;
  }
  collides(prisoner, otherEntities) {
    if (otherEntities.canRelease) {
      if (this.state === STATE_TIED) prisoner.alivePeriod = 0;
      this.handleRelease(prisoner, otherEntities);
    }
  }
  handleRelease(prisoner, marco) {
    if (this.state === STATE_TIED) {
      prisoner.canBeReleased.setReleased();
      this.state = STATE_RELEASED;
    }
  }
}

function createPrisonersFactory(sprite, entityFactory) {
  const animateCompensation = sprite.animations.get("compensate");
  const animatePanic = sprite.animations.get("panic");

  function animationRoute(prisoner) {
    if (
      prisoner.behaviour.state === STATE_RELEASED &&
      !prisoner.canBeReleased.panic
    ) {
      return animateCompensation(prisoner.alivePeriod);
    } else if (
      prisoner.behaviour.state === STATE_RELEASED &&
      prisoner.canBeReleased.panic
    ) {
      return animatePanic(prisoner.alivePeriod);
    }
    return "prisoner-tied1";
  }

  function drawPrisoners(context) {
    sprite.draw(animationRoute(this), context, 0, 0);
  }
  function compensate(entity, level) {
    const compensationElement = entityFactory.compensationElement();
    compensationElement.pos.set(
      entity.pos.x + entity.size.x * 4,
      entity.pos.y + entity.size.x / 2
    );
    level.entities.add(compensationElement);
  }
  return function createPrisoner() {
    const prisoner = new Entity();
    prisoner.size.set(prisonerConsts.WIDTH, prisonerConsts.HEIGHT);

    const canBeReleased = new CanBeReleased();
    canBeReleased.compensations.push(compensate);

    prisoner.addTrait(new Movements());
    prisoner.addTrait(new CollisionObject());
    prisoner.addTrait(canBeReleased);
    prisoner.addTrait(new Behaviour());
    prisoner.addTrait(new Walk());
    prisoner.draw = drawPrisoners;
    return prisoner;
  };
}
