function isValid(){
    return document.getElementById("name").checkValidity() && document.getElementById("phone").checkValidity()
}

add = () => {
    var formData = new FormData(document.querySelector('form'))
    let name = formData.get("name");
    let phone = formData.get("phone");
    let box = document.createElement("div");
    let pName = document.createElement("p");
    let pPhone = document.createElement("p");
    let del = document.createElement("div");

    if(!isValid()){
        return;
    }
    
    box.className = "box"
    pName.innerText = name;
    pPhone.innerText = parsePhoneToNiceLooking(phone);

    box.appendChild(pName);
    box.appendChild(pPhone);
    box.appendChild(del);

    document.getElementById("content").appendChild(box)

    del.onclick = () =>{
        document.getElementById("content").removeChild(box);
    };

}

function parsePhoneToNiceLooking(phone){
    phone = phone.replaceAll(' ','');
    if(phone.length == 9){
        return phone.slice(0, 3) + ' ' + phone.slice(3, 6) + ' ' + phone.slice(6, 9);
    }

    if(phone[0] == '+'){
        return phone.slice(0, 4) + ' ' + phone.slice(4, 7) + ' ' + phone.slice(7, 10) + ' ' + phone.slice(10, 13);
    }

    return '+' + phone.slice(0, 3) + ' ' + phone.slice(3, 6) + ' ' + phone.slice(6, 9) + ' ' + phone.slice(9, 12);
}