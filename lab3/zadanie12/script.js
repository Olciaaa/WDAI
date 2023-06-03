const board = document.getElementById("board");
var zombieRunTime = {};
let score = 0;
let currId = 0;
let life = 3;
const zombieParams = {"width": 200, "height": 312}
let game;
let gamePending = false;
let mouseCursor = document.querySelector("#cursor");
let form = document.getElementById("nickGetter");

followcursor = (e) => {
    mouseCursor.style.top = e.pageY - board.getBoundingClientRect().y + "px";
    mouseCursor.style.left = e.pageX - board.getBoundingClientRect().x + "px";
}

appendZombie = (speed, size) =>{
    let zombie = document.createElement("div");
    zombie.className = "zombie";
    zombie.style.transform = "scale(" + size + ")";
    zombie.id = currId;
    currId += 1;
    zombie.style.right = - Math.max(zombieParams.width * size, zombieParams.width) + "px";
    let max = board.offsetHeight - Math.max(zombieParams.height * size, zombieParams.height);
    let min = board.offsetHeight / 3;
    zombie.style.top = Math.random() * (max - min + 1) + min + "px";
    zombie.addEventListener("click", killZombie);
    board.appendChild(zombie);
    zombieMovement(zombie, speed);
}

zombieMovement = (zombie, speed) => {
    let zombieWidth = zombieParams.width;
    let currBcgPosition = 0;
    let currPos = - zombieWidth;
    let interval;

    switch(speed){
        case 0:
            interval=70;
            break;
        case 1:
            interval=50;
            break;
        case 2:
            interval=40;
            break;
        case 3:
            interval=30;
            break;
        case 4:
            interval=20;
            break;
        default:
            interval=100;
            break;
    }

    zombieRunTime[zombie.id] = setInterval ( () => {
        zombie.style.backgroundPosition = currBcgPosition +"px 0px";
        zombie.style.right = currPos + "px";
        currBcgPosition -= zombieWidth;
        currPos += 20;

        if (currBcgPosition <= 0){
            currBcgPosition = zombieWidth * 10 - zombieWidth;
        }
        
        if(parseInt(zombie.style.right) > board.offsetWidth){
            life -= 1;
            document.getElementById("life").innerHTML = "&#10084;".repeat(life);

            if(life == 0){
                stopGame();
            }
            zombie.remove();
            clearInterval(zombieRunTime[zombie.id]);
        }
    }
    , interval );
}

killZombie = (event) =>{
    clearInterval(zombieRunTime[event.target.id])
    event.target.remove();
    score += 12;
    document.getElementById("points").innerHTML = prepareScore(score);
    event.stopPropagation();
}

prepareScore = (number) =>{
    toReturn = "" + number;
    minus = "";

    if(toReturn[0] == "-"){
        minus = "-";
        toReturn = toReturn.slice(1, toReturn.length);
    }

    while(toReturn.length < 5){
        toReturn = "0" + toReturn;
    }
    return minus + toReturn;
}

async function sendData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'PUT', 
      mode: 'cors', 
      cache: 'no-cache', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
}
async function getData(){
    var data = await fetch("https://jsonblob.com/api/1039573159262830592");
    var data = await data.json();
    let i = 1;
    let p = ""
    for (const el of data) {
        p += `<p>${i}.  ${el.name}  <strong>${el.score}</strong>  ${el.date}</p>`
        i++;
    }
    document.getElementById("scores").innerHTML = p;
}

async function updateScore(myScore, myNickname){
    var data = await fetch("https://jsonblob.com/api/1039573159262830592");
    var data = await data.json();

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;

    data.push({"name": myNickname,"score":myScore, "date":today});
    data.sort((a, b) => b.score - a.score);
    data = data.slice(0, Math.min(3, data.length))

    await sendData("https://jsonblob.com/api/1039573159262830592", data);
}

startGame = () =>{
    if(document.getElementById("nick").checkValidity()){
        document.getElementById("h1").innerHTML = document.getElementById("nick").value;
        document.getElementById("nickGetter").remove();
    
        if(gamePending){return}
        gamePending = true;
        zombieRunTime = {};
        score = 0;
        currId = 0;
        life = 3;
        document.getElementById("life").innerHTML = "&#10084;".repeat(life);
        document.getElementById("points").innerHTML = prepareScore(score);
    
        board.onclick = () =>{
            score -= 6;
            document.getElementById("points").innerHTML = prepareScore(score);
        }
    
        game = setInterval ( () => {
            let size = Math.random() * ( 1.25 - 0.5) + 0.5;
            appendZombie(Math.floor(Math.random() * 6), size);
        }
        , 1000)
    
        document.body.style.cursor="none";
        window.addEventListener("mousemove", followcursor)
    }
    
}

stopGame = async() =>{
    await updateScore(score, document.getElementById("h1").innerHTML)
    window.removeEventListener("mousemove", followcursor)
    document.body.style.cursor="auto";
    mouseCursor.style.top = "-150%";
    alert("game over");
    Object.keys(zombieRunTime).forEach(function(key) {
        clearInterval(zombieRunTime[key]);
    });
    
    let zombies = document.querySelectorAll("div.zombie");
    for (var i = 0; i < zombies.length; i++)
        zombies[i].remove();
    clearInterval(game);
    gamePending = false;
    document.body.appendChild(form);
    document.getElementById("h1").innerHTML = "Zombie Farm";
    getData();
}

getData();
