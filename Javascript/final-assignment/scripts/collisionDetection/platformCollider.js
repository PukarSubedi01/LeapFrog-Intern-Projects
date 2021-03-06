import { dirConsts } from "../constants.js";
import PlatformResolver from "./platformResolver.js";

export default class PlatformCollider {
  constructor(platformMatrix) {
    this.platforms = new PlatformResolver(platformMatrix);
  }

  checkX(entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    const matches = this.platforms.searchByRange(
      x,
      x,
      entity.bounds.top,
      entity.bounds.bottom
    );

    matches.forEach((match) => {
      if (match.platform.name !== "obstacle") {
        return;
      }
      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.obstruct(dirConsts.RIGHT, match);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.obstruct(dirConsts.LEFT, match);
        }
      }
    });
  }

  checkY(entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    const matches = this.platforms.searchByRange(
      entity.bounds.left,
      entity.bounds.right,
      y,
      y
    );
    matches.forEach((match) => {
      if (match.platform.type !== "obstacle") {
        return;
      }
      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.obstruct(dirConsts.BOTTOM, match);
        }
      }
    });
  }
}
