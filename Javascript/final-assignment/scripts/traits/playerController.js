import { PositionVectors } from "../calculations/calculations.js";
import { Trait } from "../entities/entity.js";
export default class PlayerController extends Trait {
  constructor() {
    super("playerController");
    this.checkpoint = new PositionVectors(0, 0);
    this.player = null;
  }
  setPlayer(entity) {
    this.player = entity;
  }
  update(entity, deltaTime, level) {
    if (!level.entities.has(this.player)) {
      this.player.killable.revive();
      this.player.killable.health = 100;
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    }
  }
}
