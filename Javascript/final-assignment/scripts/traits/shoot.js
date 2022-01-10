import { Trait } from "../entities/entity.js";
export default class Shoot extends Trait {
  constructor() {
    super("shoot");
    this.interval = 0.2;
    this.canShoot = false;
    this.coolDown = this.interval;

    this.bullets = [];
  }
  shoot(entity, level) {
    for (const bullet of this.bullets) {
      bullet(entity, level);
    }
  }
  shootingState(shootState) {
    if (shootState) {
      this.canShoot = true;
    } else {
      this.canShoot = false;
    }
  }
  update(entity, deltaTime, level) {
    this.coolDown -= deltaTime;
    if (this.coolDown <= 0 && this.canShoot) {
      this.shoot(entity, level);
      this.coolDown = this.interval;
    }
  }
}
