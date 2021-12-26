const carouselContainer = document.getElementById("carousel-container");
const carouselImgWrapper = document.getElementById("carousel-image-wrapper");
const imagesCount = carouselImgWrapper.children.length;
const imageWidth = 400;

const rightArrow = document.createElement("img");
const leftArrow = document.createElement("img");
const carouselNavigationBtns = document.createElement("ul");

let position = 0;
const SPEED = 25;
rightArrow.src = "./assets/icons/arrow.svg";
rightArrow.id = "right-button";

leftArrow.src = "./assets/icons/arrow.svg";
leftArrow.id = "left-button";
carouselNavigationBtns.id = "carousel-navigation-btns";

let currentIndex = 0;
carouselContainer.appendChild(rightArrow);
carouselContainer.appendChild(leftArrow);
carouselContainer.appendChild(carouselNavigationBtns);

carouselImgWrapper.style.width = `${imagesCount * imageWidth}px`;
carouselImgWrapper.style.height = `${imageWidth}px`;

//setting up width and number of image control buttons

for (let i = 0; i < imagesCount; i++) {
  const image = carouselImgWrapper.children[i];
  image.style.left = `${imageWidth * i}px`;

  const carouselDot = document.createElement("li");
  carouselDot.classList = "carousel-dot";
  carouselNavigationBtns.appendChild(carouselDot);
}

function activeDot() {
  carouselNavigationBtns.childNodes.forEach((dot, index) => {
    index === currentIndex
      ? dot.classList.add("selected")
      : dot.classList.remove("selected");
  });
}

function slide() {
  let animation = window.requestAnimationFrame(slide);
  // console.log(position, SPEED);

  if (position === -(currentIndex * imageWidth)) {
    window.cancelAnimationFrame(animation);
  } else if (position < -(currentIndex * imageWidth)) {
    position += SPEED;
  } else {
    position -= SPEED;
  }
  carouselImgWrapper.style.left = `${position}px`;
}

leftArrow.addEventListener("click", () => {
  currentIndex = currentIndex == 0 ? imagesCount - 1 : currentIndex - 1;
  // carouselImgWrapper.style.left = `-${imageWidth * currentIndex}px`;
  slide();
  activeDot();
});

rightArrow.addEventListener("click", () => {
  currentIndex = currentIndex === imagesCount - 1 ? 0 : currentIndex + 1;
  // carouselImgWrapper.style.left = `-${imageWidth * currentIndex}px`;
  slide();
  activeDot();
});

carouselNavigationBtns.childNodes.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    slide();
    activeDot();
  });
});

activeDot();
