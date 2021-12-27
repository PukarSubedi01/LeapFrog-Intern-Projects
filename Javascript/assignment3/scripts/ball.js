class Ball {
  constructor(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.speed = 2;
    this.angle = Math.atan(this.dy, this.dx);
    this.mass = Math.pow(this.radius, 3);
  }

  wallCollisionResolver = (ball) => {
    if (ball.x + ball.radius > canvas.width) ball.dx = -1;

    if (ball.y + ball.radius > canvas.height) ball.dy = -1;

    if (ball.x - ball.radius < 0) ball.dx = 1;

    if (ball.y - ball.radius < 0) ball.dy = 1;
  };

  collisionResolver = () => {
    for (let i = 0; i < balls.length; i++) {
      let dist = distance(this.x, this.y, balls[i].x, balls[i].y);
      if (this === balls[i]) continue;
      if (dist <= this.radius + balls[i].radius) {
        // console.log("collide bho");

        let theta1 = angle(this.dx, this.dy);
        let theta2 = angle(balls[i].dx, balls[i].dy);
        let angleOfCollision = Math.atan2(
          balls[i].y - this.y,
          balls[i].x - this.x
        );
        let m1 = this.mass;
        let m2 = balls[i].mass;
        let v1 = this.speed;
        let v2 = balls[i].speed;

        let dxNewBall1 =
          ((v1 * Math.cos(theta1 - angleOfCollision) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - angleOfCollision)) /
            (m1 + m2)) *
            Math.cos(angleOfCollision) +
          v1 *
            Math.sin(theta1 - angleOfCollision) *
            Math.cos(angleOfCollision + Math.PI / 2);
        let dyNewBall1 =
          ((v1 * Math.cos(theta1 - angleOfCollision) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - angleOfCollision)) /
            (m1 + m2)) *
            Math.sin(angleOfCollision) +
          v1 *
            Math.sin(theta1 - angleOfCollision) *
            Math.sin(angleOfCollision + Math.PI / 2);
        let dxNewBall2 =
          ((v2 * Math.cos(theta2 - angleOfCollision) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - angleOfCollision)) /
            (m1 + m2)) *
            Math.cos(angleOfCollision) +
          v2 *
            Math.sin(theta2 - angleOfCollision) *
            Math.cos(angleOfCollision + Math.PI / 2);
        let dyNewBall2 =
          ((v2 * Math.cos(theta2 - angleOfCollision) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - angleOfCollision)) /
            (m1 + m2)) *
            Math.sin(angleOfCollision) +
          v2 *
            Math.sin(theta2 - angleOfCollision) *
            Math.sin(angleOfCollision + Math.PI / 2);

        this.dx = dxNewBall1;
        this.dy = dyNewBall1;
        balls[i].dx = dxNewBall2;
        balls[i].dy = dyNewBall2;
        staticCollision(this, balls[i]);
      }
      if (balls.length > 0) this.wallCollisionResolver(balls[balls.length - 1]);
    }

    this.wallCollisionResolver(this);
  };
  drawBall = () => {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
  };
  movement = () => {
    this.collisionResolver();
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    this.drawBall();
  };
}
function staticCollision(ball1, ball2, flag = false) {
  let overlap =
    ball1.radius + ball2.radius - distance(ball1.x, ball1.y, ball2.x, ball2.y);

  let smallerObject = ball1.radius < ball2.radius ? ball1 : ball2;
  let biggerObject = ball1.radius > ball2.radius ? ball1 : ball2;

  if (flag) [smallerObject, biggerObject] = [biggerObject, smallerObject];

  let theta = Math.atan2(
    biggerObject.y - smallerObject.y,
    biggerObject.x - smallerObject.x
  );
  smallerObject.x -= overlap * Math.cos(theta);
  smallerObject.y -= overlap * Math.sin(theta);

  if (
    distance(ball1.x, ball1.y, ball2.x, ball2.y) <
    ball1.radius + ball2.radius
  ) {
    if (!flag) staticCollision(ball1, ball2, true);
  }
}
