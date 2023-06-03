const slides = document.querySelectorAll(".slide");
const maxSlide = slides.length - 1;

slides.forEach((slide, indx) => {
  slide.style.transform = `translateX(${indx * 100}%)`;
});

let curSlide = 0;

nextSlide = () => {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
}

prevSlide = () => {
  if (curSlide === 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
}

setRandom = () =>{
  curSlide = generateRandom(0, 3, curSlide);
  
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
  });
}

generateRandom = (min, max, exclude) => {
  let ranNum = Math.floor(Math.random() * (max - min)) + min;

  if (ranNum === exclude) {
      ranNum = generateRandom(min, max, exclude);
  }

  return ranNum;  
} 