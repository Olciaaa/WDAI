let info = document.getElementsByClassName("requirements")

togglePassword = (button, id) =>{
    const password = document.getElementsByClassName("password")[id];
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    
    password.setAttribute('type', type);
    button.classList.toggle('fa-eye-slash');
}

checkCorectness = (event) => {
    let inputValue = event.srcElement.value
    lengthCheck(inputValue);
    specialLetter(inputValue);
    atLeastOneDigit(inputValue);
    specialCharacter(inputValue);
}

lengthCheck = (inputValue) =>{
    if(inputValue.length >= 8){
        info[0].children[0].className = 'fa fa-check-circle';
        info[0].children[0].style.color = "green";
    }
    else{
        info[0].children[0].className = 'fa fa-times-circle';
        info[0].children[0].style.color = "rgb(182, 182, 182)";
    }
}

specialLetter = (inputValue) =>{
    let newVal = inputValue.replace(/[A-Z]/g, '');
    if(inputValue.length != newVal.length){
        info[2].children[0].className = 'fa fa-check-circle';
        info[2].children[0].style.color = "green";
    }
    else{
        info[2].children[0].className = 'fa fa-times-circle';
        info[2].children[0].style.color = "rgb(182, 182, 182)";
    }
}

atLeastOneDigit = (inputValue) =>{
    let newVal = inputValue.replace(/[0-9]/g, '');
    if(inputValue.length != newVal.length){
        info[3].children[0].className = 'fa fa-check-circle';
        info[3].children[0].style.color = "green";
    }
    else{
        info[3].children[0].className = 'fa fa-times-circle';
        info[3].children[0].style.color = "rgb(182, 182, 182)";
    }
}

specialCharacter = (inputValue) =>{
    let newVal = inputValue.replace(/[0-9a-zA-Z]/g, '');
    console.log(newVal);
    if(newVal.length > 0){
        info[1].children[0].className = 'fa fa-check-circle';
        info[1].children[0].style.color = "green";
    }
    else{
        info[1].children[0].className = 'fa fa-times-circle';
        info[1].children[0].style.color = "rgb(182, 182, 182)";
    }
}

function check(input) {
    if (input.value != document.getElementById('newpasswd').value) {
        console.log("wrong")
        input.setCustomValidity('Password Must be Matching.');
        input.reportValidity();
    } else {
        // input is valid -- reset the error message
        input.setCustomValidity('');
    }
}

document.getElementsByClassName("password")[0].addEventListener("input", checkCorectness);