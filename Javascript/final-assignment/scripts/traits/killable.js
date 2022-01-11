import { Trait } from "../entities/entity.js";
export default class Killable extends Trait {
  constructor() {
    super("killable");
    this.isDead = false;
    this.deadTime = 0;
    this.health = 100;
    this.removeEntityAfter = 2;

    this.isAttacked = false;
    this.attackedTime = 0;
    this.decreaseHealthAfter = 0.1;
    this.damage = 0;
  }
  getKill() {
    return this.isDead;
  }
  attack(damage) {
    this.isAttacked = true;
    this.damage = damage;
  }
  revive() {
    this.isDead = false;
    this.deadTime = 0;
  }
  update(entity, deltaTime, level) {
    if (this.isAttacked) {
      this.attackedTime += deltaTime;

      if (this.attackedTime > this.decreaseHealthAfter) {
        this.health -= this.damage;
        this.attackedTime = 0;
        this.isAttacked = false;
        if (this.health <= 0) {
          this.isDead = true;
        }
      }
    }

    if (this.isDead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeEntityAfter) {
        level.entities.delete(entity);
      }
    }
  }
}
