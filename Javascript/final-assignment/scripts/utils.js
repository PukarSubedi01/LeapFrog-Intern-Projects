export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}
export function loadLevel(name) {
  const url = `/levels/${name}.json`;
  console.log(url);
  return fetch(url).then((result) => result.json());
}
