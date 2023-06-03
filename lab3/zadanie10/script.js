let area = document.getElementById("area");
let ball = document.getElementById("ball");
const ballRadius = ball.offsetWidth / 2;
const marginLeft = area.getBoundingClientRect().x;
const marginTop = area.getBoundingClientRect().y;
flag = 0

moveBall = (event) =>{
    (event.x - marginLeft - ballRadius < ball.getBoundingClientRect().x)?flag-=360:flag+=360;

    
    ball.style.transform = `rotate(${flag}deg)`;
    ball.style.transition = "700ms";

    let newLeft = event.x - marginLeft - ballRadius;
    let newTop = event.y - marginTop - ballRadius;

    ball.style.left = Math.max(newLeft, 0) + "px";
    ball.style.top = Math.max(newTop, 0) + "px";
    
    event.stopPropagation();
}

document.addEventListener("click", function(){
    let p = document.createElement("p")
    p.innerHTML = "Pudło";
    p.style.position = "absolute";
    p.style.left = event.x + "px";
    p.style.top = event.y + "px";
    document.body.appendChild(p);
    let time = setTimeout(() => {
        document.body.removeChild(p);
        clearTimeout(time);
    }, 500);
})
area.addEventListener("click", moveBall);
