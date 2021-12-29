export default class CollisionDetection {
  constructor() {}
  collision = (
    birdSize,
    birdPosX,
    birdPosY,
    pipeHeight,
    pipeWidth,
    pipePosX,
    pipePosY
  ) => {
    if (
      birdPosY >= pipePosY - birdSize &&
      birdPosY <= pipePosY + pipeHeight &&
      birdPosX >= pipePosX - birdSize &&
      birdPosX <= pipePosX + pipeWidth
    ) {
      return true;
    } else {
      return false;
    }
  };
  collisionBelow = (
    birdSize,
    birdPosX,
    birdPosY,
    pipeHeight,
    pipeWidth,
    pipePosX,
    pipePosY
  ) => {
    if (
      birdPosY >= pipePosY - birdSize &&
      birdPosY <= pipePosY + pipeHeight &&
      birdPosX >= pipePosX - birdSize &&
      birdPosX <= pipePosX + pipeWidth
    ) {
      return true;
    } else {
      return false;
    }
  };
}
