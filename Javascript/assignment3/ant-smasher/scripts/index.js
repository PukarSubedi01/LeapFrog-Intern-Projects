const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
canvas.style.background = "#176d69";
let ants = [];
const RADIUS = 10;
function init(antsCount) {
  const antImg = new Image();

  antImg.src = "./ant.png";
  antImg.onload = () => {
    for (let i = 0; i < antsCount; i++) {
      // let RADIUS = getRandomRange(20, 30);
      let x = getRandomRange(RADIUS, canvas.width - RADIUS);
      let y = getRandomRange(RADIUS, canvas.height - RADIUS);
      let dx = getRandomRange(-3, 3);
      let dy = getRandomRange(-3, 3);
      if (i !== 0) {
        for (let j = 0; j < ants.length; j++) {
          let dist = distance(x, y, ants[j].x, ants[j].y);

          if (dist <= RADIUS + ants[j].radius) {
            x = getRandomRange(RADIUS, canvas.width - RADIUS);
            y = getRandomRange(RADIUS, canvas.height - RADIUS);
            j = -1;
          }
        }
      }
      let ant = new Ant(x, y, RADIUS, dx, dy, antImg);
      ants.push(ant);
    }
  };
}
const animateants = () => {
  requestAnimationFrame(animateants);
  context.clearRect(0, 0, canvas.width, canvas.height);
  ants.forEach((ant) => ant.movement());
};

init(10);
animateants();
const removeAnt = (ant) => {
  const updatedAnts = ants.filter((items, index) => ant !== index);
  ants = updatedAnts;
};

canvas.addEventListener("mousedown", (event) => {
  let x = event.x;
  let y = event.y;

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  for (let i = 0; i < ants.length; i++) {
    if (distance(x, y, ants[i].x, ants[i].y) <= RADIUS + ants[i].radius) {
      removeAnt(i);
    }
  }
});
