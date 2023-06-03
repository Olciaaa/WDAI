let currIdx = 1;
let elements = [["green", "1.jpg"], ["blue", "2.png"], ["red", "3.jpg"]];

function changePhoto(){
    document.getElementsByTagName("img")[0].src = "assets/" + elements[currIdx%3][1];
    document.getElementsByTagName("img")[0].style.borderColor = elements[currIdx%3][0];

    currIdx += 1;
}

function haha(){
    console.log("haha");
}

