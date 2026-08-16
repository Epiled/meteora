const BANNER = document.querySelector("[data-banner]");
const BANNER_SLIDES = BANNER.querySelectorAll("[data-banner-slide]");
const BANNER_IMAGES = BANNER.querySelectorAll("[data-banner-image]");
const TIMEOUT_SLIDE = parseInt(BANNER.dataset.timeSlide);
const TIMEOUT_TRANSITION = parseInt(BANNER.dataset.timeTransition);
const SLIDES_QUANTITY = BANNER_SLIDES.length;
const BANNER_ARROWS = BANNER.querySelectorAll("[data-banner-arrow]");
const BANNER_INDEXES = BANNER.querySelector("[data-banner-indexes]");

let indicators = [];
let currentIndicator;
let newIndicator;

window.onload = () => prepareBanner();

prepareSlide(BANNER_SLIDES);

BANNER_IMAGES.forEach((image) => {
  image.addEventListener("load", prepareBanner);
});

BANNER_ARROWS.forEach((seta) => {
  seta.addEventListener("click", (e) => {
    passSlide(e.target);
  });
});

window.addEventListener("resize", prepareBanner);

let autoSlide = setInterval(nextSlide, TIMEOUT_SLIDE);

BANNER.addEventListener("mouseover", stopSlides);

BANNER.addEventListener("mouseleave", () => {
  return (autoSlide = setInterval(nextSlide, TIMEOUT_SLIDE));
});

function stopSlides() {
  clearInterval(autoSlide);
}

function passSlide(direction) {
  if (direction.dataset.bannerSeta == "back") {
    backSlide();
    return;
  }
  nextSlide();
}

function nextSlide() {
  BANNER_SLIDES.forEach((slide) => {
    let position = parseFloat(slide.style.left);
    let newPosition;

    slideActive(slide);

    slide.dataset.state = "";

    if (position < 0) {
      newPosition = (SLIDES_QUANTITY - 2) * 100 + "%";
    } else {
      newPosition = position - 100 + "%";
    }
    slide.style.left = newPosition;

    controlState(slide, newPosition, "next");
  });

  highlightIndex(currentIndicator, newIndicator);
}

function backSlide() {
  BANNER_SLIDES.forEach((slide) => {
    let position = parseFloat(slide.style.left);
    let newPosition;

    slideActive(slide);

    slide.dataset.state = "";

    if (position == (SLIDES_QUANTITY - 2) * 100) {
      newPosition = -100 + "%";
    } else {
      newPosition = position + 100 + "%";
    }
    slide.style.left = newPosition;

    controlState(slide, newPosition, "back");
  });

  highlightIndex(currentIndicator, newIndicator);
}

function controlState(slide, position, way) {
  if (way == "next") {
    if (parseInt(position) < 0) {
      slide.style.zIndex = "-1";
    } else if (parseInt(position) === 0) {
      slide.dataset.state = "active";
      slide.style.zIndex = "0";
      newIndicator = slide.dataset.indexSlide;
    } else {
      slide.style.zIndex = "-2";
    }
  } else {
    if (parseInt(position) < 0) {
      slide.style.zIndex = "-2";
    } else if (parseInt(position) === 0) {
      slide.dataset.state = "active";
      slide.style.zIndex = "0";
      newIndicator = slide.dataset.indexSlide;
    } else {
      slide.style.zIndex = "-1";
    }
  }
}

function slideActive(slide) {
  if (slide.dataset.state === "active") {
    return (currentIndicator = slide.dataset.indexSlide);
  }
}

function createIndicators() {
  const WIDTH = 30;
  const HEIGHT = 3;
  const GAP = 3;

  for (let i = 0; i < SLIDES_QUANTITY; i++) {
    let position = (WIDTH + GAP * 2) * i;
    let indicator = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "rect",
    );
    indicator.classList.add("banner__index");

    indicator.style.transform = `matrix(1, 0, 0, -1, ${position}, ${GAP})`;
    indicator.dataset.index = i;
    indicator.dataset.indicatorState = "";

    if (BANNER_SLIDES[i].dataset.state == "active")
      indicator.dataset.indicatorState = "active";

    indicator.addEventListener("click", (e) => {
      moveToSlide(e.target.dataset.index, BANNER_SLIDES);
    });

    indicators.push(indicator);
  }

  indicators.forEach((item) => BANNER_INDEXES.appendChild(item));
}

createIndicators();

function moveToSlide(index, slides) {
  let slideActive;
  slides.forEach((slide, index) => {
    let slideState = slide.dataset.state;
    if (slideState == "active") {
      slideActive = index;
    }
  });

  let way;
  let newPosition = Math.abs(slideActive - index);

  if (slideActive < index) {
    way = -1;
  } else if (slideActive >= index) {
    way = 1;
  }

  for (let i = 0; i < newPosition; i++) {
    if (way < 0) {
      nextSlide();
    } else {
      backSlide();
    }
  }

  highlightIndex(slideActive, index);
}

function highlightIndex(lastActive, newActive) {
  indicators[lastActive].dataset.indicatorState = "";
  indicators[newActive].dataset.indicatorState = "active";
}

function prepareBanner() {
  BANNER.style.height =
    (BANNER_IMAGES[0].clientHeight * 100) / window.screen.height + "vh";
}

function prepareSlide(slides) {
  return slides.forEach((slide, index) => {
    slide.dataset.indexSlide = index;
    slide.style.transition = `left ${TIMEOUT_TRANSITION / 1000}s`;

    if (index == slides.length - 1) {
      slide.style.left = "-100%";
      return;
    }
    slide.style.left = index * 100 + "%";
  });
}
