function Carousel(properties) {
  const {
    carouselContainer,
    containerWidth = 700,
    containerHeight = 500,
    speed,
    delay,
  } = properties;
  this.container = document.querySelector(carouselContainer);

  this.carouselImgWrapper = this.container.querySelector(
    ".carousel-image-wrapper"
  );
  this.imagesCount = this.carouselImgWrapper.children.length;
  this.imageWidth = containerWidth;
  this.delay = delay * 1000;
  this.currentIndex = 0;
  this.position = 0;
  this.speed = this.imageWidth / (speed * 60);
  this.interval = null;

  this.initializeCarousel = () => {
    this.container.style.maxWidth = `${containerWidth}px`;

    this.carouselImgWrapper.style.width = `${
      this.imagesCount * this.imageWidth
    }px`;
    this.carouselImgWrapper.style.height = "100%";

    this.container.style.height = `${containerHeight}px`;

    for (let i = 0; i < this.imagesCount; i++) {
      const image = this.carouselImgWrapper.children[i];
      image.style.left = `${this.imageWidth * i}px`;
      image.style.width = `${
        (this.imageWidth / (this.imagesCount * this.imageWidth)) * 100
      }%`;
      image.style.height = "100%";
    }
    this.addControls();
    this.activeDot();
    this.addListeners();
    this.delayMovement();
  };

  this.addControls = () => {
    let rightArrow = document.createElement("img");
    rightArrow.classList.add("right-button");
    rightArrow.src = "./assets/icons/arrow.svg";
    this.container.appendChild(rightArrow);

    let leftArrow = document.createElement("img");
    leftArrow.classList.add("left-button");
    leftArrow.src = "./assets/icons/arrow.svg";
    this.container.appendChild(leftArrow);

    this.carouselNavigationBtns = document.createElement("ul");
    this.carouselNavigationBtns.classList.add("carousel-navigation-btns");
    this.container.appendChild(this.carouselNavigationBtns);

    for (let i = 0; i < this.imagesCount; i++) {
      const carouselDot = document.createElement("li");
      carouselDot.classList = "carousel-dot";
      this.carouselNavigationBtns.appendChild(carouselDot);
    }
  };
  this.activeDot = () => {
    this.carouselNavigationBtns.childNodes.forEach((dot, index) => {
      index === this.currentIndex
        ? dot.classList.add("selected")
        : dot.classList.remove("selected");
    });
  };
  this.slide = () => {
    let animation = window.requestAnimationFrame(this.slide);
    if (
      parseInt(this.position.toFixed(0)) ===
      -(this.currentIndex * this.imageWidth)
    ) {
      window.cancelAnimationFrame(animation);
    } else if (this.position < -(this.currentIndex * this.imageWidth)) {
      this.position += this.speed;
    } else {
      this.position -= this.speed;
    }
    this.carouselImgWrapper.style.left = `${this.position}px`;
  };
  this.addListeners = () => {
    this.container
      .querySelector(".left-button")
      .addEventListener("click", () => {
        clearInterval(this.interval);
        this.currentIndex =
          this.currentIndex == 0 ? this.imagesCount - 1 : this.currentIndex - 1;
        this.slide();
        this.activeDot();
        this.delayMovement();
      });

    this.container
      .querySelector(".right-button")
      .addEventListener("click", () => {
        clearInterval(this.interval);
        this.currentIndex =
          this.currentIndex === this.imagesCount - 1
            ? 0
            : this.currentIndex + 1;
        this.slide();
        this.activeDot();
        this.delayMovement();
      });

    this.carouselNavigationBtns.childNodes.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        clearInterval(this.interval);
        this.currentIndex = index;
        this.slide();
        this.activeDot();
        this.delayMovement();
      });
    });
  };
  this.delayMovement = () => {
    this.interval = setInterval(() => {
      this.currentIndex =
        this.currentIndex === this.imagesCount - 1 ? 0 : this.currentIndex + 1;
      this.activeDot();
      this.slide();
    }, this.delay);
  };

  this.initializeCarousel();
}
