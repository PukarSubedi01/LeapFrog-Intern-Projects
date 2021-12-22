const ball = document.getElementById("ball");
let counter = 0;
let speed = 1;
// console.log("asd");
setInterval(() => {
  ball.style.bottom = counter + "px";
  counter = counter + speed;
  if (counter > 400) {
    speed = -1;
  } else if (counter === 0) {
    speed = 1;
  }
}, 0.1);
