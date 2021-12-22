console.log("-----------------Solution8--------------------");
const points = [
  { x: 10, y: 20 },
  { x: 40, y: 40 },
  { x: 60, y: 20 },
];
let myElement = document.getElementById("scatter-plot");
points.forEach((point) => {
  const dot = document.createElement("div");
  dot.style.width = "10px";
  dot.style.height = "10px";
  dot.style.borderRadius = "50%";
  dot.style.background = "#4499cb";
  dot.style.position = "absolute";
  dot.style.bottom = point.y + "px";
  dot.style.left = point.x + "px";
  myElement.appendChild(dot);
});
