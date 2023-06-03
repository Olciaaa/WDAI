let i = 0;
let anim = "none";

showSlides = (idx) => {
    let slides = document.getElementsByClassName("card");

    if (idx >= slides.length) {i = 0; idx = 0}    
    if (idx < 0) {idx = slides.length - 1; i = idx}

    for (let x = 0; x < slides.length; x++) {
      slides[x].style.display = "none";  
    }

    slides[idx].style.animationName = anim;
    slides[idx].style.transition = "700ms";
    slides[idx].style.display = "flex";  
}

plusSlides = (value) => {
    i += value;
    (value == -1)?anim="slideToLeft":anim = "slideToRight"
    showSlides(i);
}

setRandom = () =>{
  i = generateRandom(0, 3, i);
  anim = "blur";
  showSlides(i);
}

generateRandom = (min, max, exclude) => {
  let ranNum = Math.floor(Math.random() * (max - min)) + min;

  if (ranNum === exclude) {
      ranNum = generateRandom(min, max, exclude);
  }

  return ranNum;  
} 

showSlides(i);