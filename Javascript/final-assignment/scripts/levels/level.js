import LayerCompositor from "../layers/layerCompositor.js";
import { Matrix } from "../calculations/calculations.js";
import PlatformCollider from "../collisionDetection/platformCollider.js";
import EntityCollider from "../collisionDetection/entityCollider.js";
import { marcoConstants } from "../constants.js";
export default class Level {
  constructor() {
    this.comp = new LayerCompositor();
    this.entities = new Set();
    this.platforms = new Matrix();
    this.platformCollider = new PlatformCollider(this.platforms);
    this.entityCollider = new EntityCollider(this.entities);
  }
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.platformCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.platformCollider.checkY(entity);

      this.entityCollider.check(entity);

      entity.vel.y += marcoConstants.GRAVITY * deltaTime;
    });
  }
}
