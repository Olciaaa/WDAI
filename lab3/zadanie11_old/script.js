let orderedData = {};

fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => processData(data));

processData = (data) =>{
    console.log(data)
    for(const el of data){
        let region = el["subregion"];
        if(typeof region !== "undefined"){
            if(!(region in orderedData)){
                orderedData[region] = {"data":[], "info":{"subregion": region, "population":0, "area":0}};
            }
            orderedData[region]["data"].push(el);
            orderedData[region]["info"]["population"] += el["population"];
            orderedData[region]["info"]["area"] += el["area"];
        }
        
    }

    orderedData = Object.values(orderedData);
    sortRegions(0, "subregion")
    createTable()
    
}

reverseDict = () =>{
    let keys = Object.keys(orderedData).reverse();

    newData = {};
    for (const key of keys) {
        newData[key] = orderedData[key];
    }
    return newData;
}

sortRegions = (direction, criterion) =>{
    for (let i = 1; i < orderedData.length; i++) {
        let currentValue = orderedData[i]
        let j
        for (j = i - 1; j >= 0 && orderedData[j]["info"][criterion] > currentValue["info"][criterion]; j--) {
          orderedData[j + 1] = orderedData[j]
        }
        orderedData[j + 1] = currentValue
      }

    return direction == 1?orderedData:orderedData.reverse()
}

subTable = (data) =>{
    let table = document.createElement("table");

    let tr = document.createElement("tr");
    
    tr.innerHTML = '<th><strong>Nazwa miasta</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></th>'
    tr.innerHTML += '<th><strong>Stolica</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></th>'
    tr.innerHTML += '<th><strong>Populacja</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></th>'
    tr.innerHTML += '<th><strong>Powierzchnia</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></th>'
    table.appendChild(tr);

    //console.log(data);
    for (const el of data) {
        let tr = document.createElement("tr");
        
        if(typeof el["capital"] !== "undefined"){
            let info = [el["name"]["official"], el["capital"][0], el["population"], el["area"]];

            for (const i of info) {
                let td = document.createElement("td");
                td.innerHTML = i;
                tr.appendChild(td)
            }
    
            table.appendChild(tr);
        }
        
    }

    table.className = "subTab";
    return table;
}

damn = (subTab, isSubTabDisplayed) =>{
    subTab.style.display = isSubTabDisplayed?"none":"table";
    return !isSubTabDisplayed;
}

createTable = () => {
    let keys = ["subregion", "population", "area"];

    for (const value of orderedData) {
        console.log(value)
        let tr = document.createElement("tr");
        let subTab = subTable(value["data"]);

        let isSubTabDisplayed = false;
        let td = document.createElement("td");
        td.innerHTML = "&#11162;"
        td.style.cursor = "pointer";
        td.style.width = "50px";
        td.style.fontSize = "40px";
        td.addEventListener("click", function(){
            isSubTabDisplayed = damn(subTab, isSubTabDisplayed);
            td.innerHTML = isSubTabDisplayed?"&#11163;":"&#11162;";
        });
        tr.appendChild(td)
    
        for (const key of keys) {
            let td = document.createElement("td");
            td.innerHTML = (key == "subregion")? td.innerHTML + value["info"][key]:value["info"][key]
            tr.appendChild(td)
        }
        
        let subTabTr = document.createElement("tr");
        let subTabTd = document.createElement("td");
        subTabTd.colSpan = "4";
        subTabTd.appendChild(subTab);
        subTabTr.appendChild(subTabTd);

        document.getElementById("tableBody").appendChild(tr);
        document.getElementById("tableBody").appendChild(subTabTr);
    }
}