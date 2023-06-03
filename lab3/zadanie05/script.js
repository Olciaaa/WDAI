let gatheredPoints = 0;
let infoAboutBoxes = {"box1":[1, "fioletowy"], "box2": [2, "różowy"], "box3": [5, "limonkowy"]};
let boxes;
let propagationStopOn = true;
let changePropagationFlag = true;

function clickBox(event, id) {
    if(propagationStopOn){
        event.stopPropagation();
    }  
    
    let points = infoAboutBoxes[id][0];
    let color = infoAboutBoxes[id][1];

    document.getElementById("info").innerText += "\n Nacisnąłeś " + color + " o wartości " + points;
    gatheredPoints += points;

    document.getElementById("points").innerText = gatheredPoints;

    if(gatheredPoints > 30){
        document.getElementById("box2").removeEventListener("click", clickBox2, true);
        document.getElementById("box2").removeEventListener("click", clickBox2, false);
    }

    if(gatheredPoints > 50){
        document.getElementById("box3").removeEventListener("click", clickBox3, true);
        document.getElementById("box3").removeEventListener("click", clickBox3, false);
    }
}

function propagation(button){
    (propagationStopOn)?button.innerText = "Stop propagation":button.innerText = "Start propagation"

    propagationStopOn = !propagationStopOn;
}

function changePropagation(){
    document.getElementById("box1").removeEventListener("click", clickBox1, !changePropagationFlag);
    document.getElementById("box2").removeEventListener("click", clickBox2, !changePropagationFlag);
    document.getElementById("box3").removeEventListener("click", clickBox3, !changePropagationFlag);

    document.getElementById("box1").addEventListener("click", clickBox1, changePropagationFlag);
    document.getElementById("box2").addEventListener("click", clickBox2, changePropagationFlag);
    document.getElementById("box3").addEventListener("click", clickBox3, changePropagationFlag);
    changePropagationFlag = !changePropagationFlag;
}

clickBox1 = () =>{
    clickBox(event, "box1")
}

clickBox2 = () =>{
    clickBox(event, "box2")
}

clickBox3 = () =>{
    clickBox(event, "box3")
}

reset = () =>{
    gatheredPoints = 0;
    document.getElementById("points").innerText = gatheredPoints;
    propagationStopOn = true;
    changePropagationFlag = true;
    document.getElementById("propagation").innerText = "Start propagation";
    document.getElementById("info").innerText = ""

    document.getElementById("box1").removeEventListener("click", clickBox1, true);
    document.getElementById("box2").removeEventListener("click", clickBox2, true);
    document.getElementById("box3").removeEventListener("click", clickBox3, true);
    document.getElementById("box1").removeEventListener("click", clickBox1, false);
    document.getElementById("box2").removeEventListener("click", clickBox2, false);
    document.getElementById("box3").removeEventListener("click", clickBox3, false);
    
    document.getElementById("box1").addEventListener("click", clickBox1, false);
    document.getElementById("box2").addEventListener("click", clickBox2, false);
    document.getElementById("box3").addEventListener("click", clickBox3, false);
}


document.getElementById("box1").addEventListener("click", clickBox1, false);
document.getElementById("box2").addEventListener("click", clickBox2, false);
document.getElementById("box3").addEventListener("click", clickBox3, false);