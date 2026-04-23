 const slides = document.getElementById("slides");
  const slider = document.getElementById("slider");
  const totalSlides = slides.children.length;
  let index = 1;
  function getWidth() {
    return slider.clientWidth;
  }
  function setPosition() {
    slides.style.transform = `translateX(${-getWidth() * index}px)`;
  }
  setPosition();
  function nextSlide() {
    if (index >= totalSlides - 1) return;
    index++;
    slides.style.transition = "transform 0.6s ease-in-out";
    setPosition();
  }
  function prevSlide() {
    if (index <= 0) return;
    index--;
    slides.style.transition = "transform 0.6s ease-in-out";
    setPosition();
  }
  slides.addEventListener("transitionend", () => {
    if (index === totalSlides - 1) {
      slides.style.transition = "none";
      index = 1;
      setPosition();
    }

    if (index === 0) {
      slides.style.transition = "none";
      index = totalSlides - 2;
      setPosition();
    }
  });
  let auto = setInterval(nextSlide, 3000);
  slider.addEventListener("mouseenter", () => clearInterval(auto));
  slider.addEventListener("mouseleave", () => {
    auto = setInterval(nextSlide, 3000);
  });
  window.addEventListener("resize", () => {
    slides.style.transition = "none";
    setPosition();
  });