export default class AccuracyCalc {
  constructor(deltatime = 1 / 60) {
    let prevTime = 0;
    let accumulatedTime = 0;

    this.updateFps = (time) => {
      accumulatedTime += (time - prevTime) / 1000;
      if (accumulatedTime > 1) {
        accumulatedTime = 1;
      }
      while (accumulatedTime > deltatime) {
        this.update(deltatime);
        accumulatedTime -= deltatime;
      }
      prevTime = time;

      this.animationFrame();
      // setTimeout(update, 1000 / 144, performance.now()); //checking accuracy for different fps
    };
  }
  animationFrame() {
    requestAnimationFrame(this.updateFps);
  }
  start() {
    this.animationFrame();
  }
}
