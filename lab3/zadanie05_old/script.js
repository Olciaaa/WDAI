let gatheredPoints = 0;
let infoAboutBoxes = [[1, "fioletowy"], [2, "różowy"], [5, "limonkowy"]];
let boxes;
let propagationStopOn = true;

function clickBox(event, id) {
    if(propagationStopOn){
        event.stopPropagation();
    }  
    
    if((id == 1 && gatheredPoints > 30) || (id == 2 && gatheredPoints > 50)){
        return
    }
    
    let points = infoAboutBoxes[id][0];
    let color = infoAboutBoxes[id][1];

    document.getElementById("info").innerText += "\n Nacisnąłeś " + color + " o wartości " + points;
    gatheredPoints += points;

    document.getElementById("points").innerText = gatheredPoints;
}

function propagation(button){
    if(propagationStopOn){
        button.innerText = "Stop propagation"
    }
    else{
        button.innerText = "Start propagation"
    }

    propagationStopOn = !propagationStopOn;
}

function reset(){
    gatheredPoints = 0;
    document.getElementById("points").innerText = gatheredPoints;
    propagationStopOn = true;
    document.getElementById("propagation").innerText = "Start propagation"
    document.getElementById("info").innerText = ""
}