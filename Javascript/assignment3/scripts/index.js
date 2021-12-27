const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.background = "#176d69";
let balls = [];
function init(ballsCount) {
  const RADIUS = 10;
  for (let i = 0; i < ballsCount; i++) {
    // let RADIUS = getRandomRange(20, 30);
    let x = getRandomRange(RADIUS, canvas.width - RADIUS);
    let y = getRandomRange(RADIUS, canvas.height - RADIUS);
    let dx = getRandomRange(-3, 3);
    let dy = getRandomRange(-3, 3);
    if (i !== 0) {
      for (let j = 0; j < balls.length; j++) {
        let dist = distance(x, y, balls[j].x, balls[j].y);

        if (dist <= RADIUS + balls[j].radius) {
          x = getRandomRange(RADIUS, canvas.width - RADIUS);
          y = getRandomRange(RADIUS, canvas.height - RADIUS);
          j = -1;
        }
      }
    }
    let ball = new Ball(x, y, RADIUS, dx, dy);
    balls.push(ball);
  }
}
const animateBalls = () => {
  requestAnimationFrame(animateBalls);
  context.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => ball.movement());
};

init(100);
animateBalls();
