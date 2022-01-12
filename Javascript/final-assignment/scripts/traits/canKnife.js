import { Trait } from "../entities/entity.js";
export default class CanKnife extends Trait {
  constructor() {
    super("canKnife");
    this.damage = 10;
    this.isAttacking = false;
    this.attackedTime = 0;
    this.resetAttackAfter = 0.1;
  }
  attack() {
    this.isAttacking = true;
  }
  update(entity, deltaTime, level) {
    if (this.isAttacking) {
      this.attackedTime += deltaTime;

      if (this.attackedTime > this.resetAttackAfter) {
        this.attackedTime = 0;
        this.isAttacking = false;
      }
    }
  }
}
