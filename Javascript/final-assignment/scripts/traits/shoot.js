import { Trait } from "../entities/entity.js";
export default class Shoot extends Trait {
  constructor() {
    super("shoot");
    this.interval = 0.2;
    this.canShoot = false;
    this.coolDown = this.interval;
    this.dir = 1;
    this.defaultGun = true;
    this.machineGunBullets = [];
    this.fireGunBullets = [];
  }
  shoot(entity, level, bulletType) {
    for (const bullet of bulletType) {
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
    if (this.coolDown <= 0 && this.canShoot && this.defaultGun) {
      const audio = new Audio();
      audio.src = "../assets/sfx/bullets-firing.mp3";
      audio.play();
      this.shoot(entity, level, this.machineGunBullets);
      this.coolDown = this.interval;
    } else if (this.coolDown <= 0 && this.canShoot && !this.defaultGun) {
      this.shoot(entity, level, this.fireGunBullets);
      this.coolDown = this.interval;
    }
  }
}
