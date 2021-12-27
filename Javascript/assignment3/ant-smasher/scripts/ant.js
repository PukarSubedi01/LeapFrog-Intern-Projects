class Ant {
  constructor(x, y, radius, dx, dy, ant) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.speed = 2;
    this.angle = Math.atan(this.dy, this.dx);
    this.mass = Math.pow(this.radius, 3);
    this.ant = ant;
  }

  wallCollisionResolver = (ant) => {
    if (ant.x + ant.radius > canvas.width) ant.dx = -1;

    if (ant.y + ant.radius > canvas.height) ant.dy = -1;

    if (ant.x - ant.radius < 0) ant.dx = 1;

    if (ant.y - ant.radius < 0) ant.dy = 1;
  };

  collisionResolver = () => {
    for (let i = 0; i < ants.length; i++) {
      let dist = distance(this.x, this.y, ants[i].x, ants[i].y);
      if (this === ants[i]) continue;
      if (dist <= this.radius + ants[i].radius) {
        // console.log("collide bho");

        let theta1 = angle(this.dx, this.dy);
        let theta2 = angle(ants[i].dx, ants[i].dy);
        let angleOfCollision = Math.atan2(
          ants[i].y - this.y,
          ants[i].x - this.x
        );
        let m1 = this.mass;
        let m2 = ants[i].mass;
        let v1 = this.speed;
        let v2 = ants[i].speed;

        let dxNewant1 =
          ((v1 * Math.cos(theta1 - angleOfCollision) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - angleOfCollision)) /
            (m1 + m2)) *
            Math.cos(angleOfCollision) +
          v1 *
            Math.sin(theta1 - angleOfCollision) *
            Math.cos(angleOfCollision + Math.PI / 2);
        let dyNewant1 =
          ((v1 * Math.cos(theta1 - angleOfCollision) * (m1 - m2) +
            2 * m2 * v2 * Math.cos(theta2 - angleOfCollision)) /
            (m1 + m2)) *
            Math.sin(angleOfCollision) +
          v1 *
            Math.sin(theta1 - angleOfCollision) *
            Math.sin(angleOfCollision + Math.PI / 2);
        let dxNewant2 =
          ((v2 * Math.cos(theta2 - angleOfCollision) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - angleOfCollision)) /
            (m1 + m2)) *
            Math.cos(angleOfCollision) +
          v2 *
            Math.sin(theta2 - angleOfCollision) *
            Math.cos(angleOfCollision + Math.PI / 2);
        let dyNewant2 =
          ((v2 * Math.cos(theta2 - angleOfCollision) * (m2 - m1) +
            2 * m1 * v1 * Math.cos(theta1 - angleOfCollision)) /
            (m1 + m2)) *
            Math.sin(angleOfCollision) +
          v2 *
            Math.sin(theta2 - angleOfCollision) *
            Math.sin(angleOfCollision + Math.PI / 2);

        this.dx = dxNewant1;
        this.dy = dyNewant1;
        ants[i].dx = dxNewant2;
        ants[i].dy = dyNewant2;
        staticCollision(this, ants[i]);
      }
      if (ants.length > 0) this.wallCollisionResolver(ants[ants.length - 1]);
    }

    this.wallCollisionResolver(this);
  };
  drawant = () => {
    context.drawImage(this.ant, this.x - this.radius, this.y - this.radius);
  };
  movement = () => {
    this.collisionResolver();
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;
    this.drawant();
  };
}
function staticCollision(ant1, ant2, flag = false) {
  let overlap =
    ant1.radius + ant2.radius - distance(ant1.x, ant1.y, ant2.x, ant2.y);

  let smallerObject = ant1.radius < ant2.radius ? ant1 : ant2;
  let biggerObject = ant1.radius > ant2.radius ? ant1 : ant2;

  if (flag) [smallerObject, biggerObject] = [biggerObject, smallerObject];

  let theta = Math.atan2(
    biggerObject.y - smallerObject.y,
    biggerObject.x - smallerObject.x
  );
  smallerObject.x -= overlap * Math.cos(theta);
  smallerObject.y -= overlap * Math.sin(theta);

  if (distance(ant1.x, ant1.y, ant2.x, ant2.y) < ant1.radius + ant2.radius) {
    if (!flag) staticCollision(ant1, ant2, true);
  }
}
