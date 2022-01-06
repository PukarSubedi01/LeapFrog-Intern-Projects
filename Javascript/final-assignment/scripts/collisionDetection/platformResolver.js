import { platFormConsts } from "../constants.js";
export default class PlatformResolver {
  constructor(matrix, platformSize = platFormConsts.WIDTH) {
    this.matrix = matrix;
    this.platformSize = platformSize;
  }

  toIndex(pos) {
    return Math.floor(pos / this.platformSize);
  }

  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.platformSize) * this.platformSize;
    const range = [];
    let pos = pos1;
    do {
      range.push(this.toIndex(pos));
      pos += this.platformSize;
    } while (pos < pMax);
    return range;
  }

  getByIndex(indexX, indexY) {
    const platform = this.matrix.get(indexX, indexY);
    if (platform) {
      const x1 = indexX * this.platformSize;
      const x2 = x1 + this.platformSize;
      const y1 = indexY * this.platformSize;
      const y2 = y1 + this.platformSize;
      return {
        platform,
        x1,
        x2,
        y1,
        y2,
      };
    }
  }

  searchByPosition(posX, posY) {
    return this.getByIndex(this.toIndex(posX), this.toIndex(posY));
  }

  searchByRange(x1, x2, y1, y2) {
    const matches = [];
    this.toIndexRange(x1, x2).forEach((indexX) => {
      this.toIndexRange(y1, y2).forEach((indexY) => {
        const match = this.getByIndex(indexX, indexY);
        if (match) {
          matches.push(match);
        }
      });
    });

    return matches;
  }
}
