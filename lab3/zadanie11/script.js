let orderedData = {};
let regions = [];
let moreInfoRegions = [];
let subTables = [];
const elementsPerSite = 5;
let currentSite = 0
let filters = {"subregion":"", "population":"", "area":""};
filteredIds = [];
let elements = 0;

fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => processData(data));

processData = (data) =>{
    let i = 0;
    for(const el of data){
        let region = el["subregion"];
        if(typeof region !== "undefined"){
            if(!(region in orderedData)){
                orderedData[region] = {"data":[], "info":{"subregion": region, "population":0, "area":0, "id": i}};
                i++
            }

            if(typeof el["capital"] !== "undefined" && typeof el["name"] !== "undefined"){
                el["capital"] = el["capital"][0]
                
                el["name"] = el["name"]["official"]
            }
            else{
                el["capital"] = "unknown";
                el["name"] = "unknown";
            }
            orderedData[region]["data"].push(el);
            orderedData[region]["info"]["population"] += el["population"];
            orderedData[region]["info"]["area"] += el["area"];
        }  
    }

    orderedData = Object.values(orderedData);
    orderedData.forEach(element => {
        let j = 0;
        element["data"].forEach(el => {
            el["id"] = j
            j++
        });
    });
    console.log(orderedData);
    for (const iterator of orderedData) {
        filteredIds.push(true);
    }
    elements = orderedData.length;
    createTable();
    elementsShown(currentSite);
}

elementsShown = (idx) =>{
    let items = Object.values(document.getElementById("regions").children);
    let itt = []
    
    for (let i = 0; i < items.length; i++) {
        if(filteredIds[parseInt(i/2)]){
            itt.push(items[i])
        }
    }
    items = itt;
    items.sort((a, b) => a.style.order - b.style.order);
    elements = parseInt(items.length/2)
    //console.log(elements)

    for(let i = 0; i < items.length; i++){
        items[i].style.display = "none";
    }

    for(let i = idx * 2 * elementsPerSite; i < Math.min(idx * 2 * elementsPerSite + 2 * elementsPerSite, items.length); i++){
        items[i].style.display = "flex";
    }
    pagination()
}

pagination = () => {
    document.getElementById("pagination").innerHTML = '';
    for(let i = 0; i < parseInt(elements / elementsPerSite) + 1; i++){
        let div = document.createElement("div");
        div.innerHTML = i;
        div.id = i;
        div.addEventListener("click", function(){
            currentSite = i;
            elementsShown(i);
        })
        document.getElementById("pagination").appendChild(div)
    }

    if(currentSite > document.getElementById("pagination").children.length - 1){
        currentSite = document.getElementById("pagination").children.length - 1;
        elementsShown(currentSite);
    }
}

rearrangeTable = () =>{
    for(let i = 0; i < orderedData.length; i++){
        regions[orderedData[i]["info"]["id"]].style.order = i;
        moreInfoRegions[orderedData[i]["info"]["id"]].style.order = i;
        if(filteredIds[orderedData[i]["info"]["id"]]){
            regions[orderedData[i]["info"]["id"]].style.display = "flex";
            moreInfoRegions[orderedData[i]["info"]["id"]].style.display = "flex";
        }
        else{
            regions[orderedData[i]["info"]["id"]].style.display = "none";
            moreInfoRegions[orderedData[i]["info"]["id"]].style.display = "none";
        }
    }
    elementsShown(currentSite);
}

customSort = (direction, criterion, isString, table, partOfTable) =>{
    table.sort((a, b) => {
        let nameA = 1;
        let nameB = 1;
        if(isString == 0){
            nameA = partOfTable == "info"?a[partOfTable][criterion].toUpperCase():a[criterion].toUpperCase();
            nameB = partOfTable == "info"?b[partOfTable][criterion].toUpperCase():b[criterion].toUpperCase();
        }
        
        if(isString == 1){
            nameA = partOfTable == "info"?parseInt(a[partOfTable][criterion]):parseInt(a[criterion]);
            nameB = partOfTable == "info"?parseInt(b[partOfTable][criterion]):parseInt(b[criterion]);
        }

        if (nameA < nameB) {
          return -direction;
        }
        if (nameA > nameB) {
          return direction;
        }
      
        return 0;
    });
}

sortRegions = (direction, criterion, isString) =>{
    customSort(direction, criterion, isString, orderedData, "info");

    rearrangeTable()
}

rearrangeSubTable = (idx, data, filteredIdsSub) =>{
    let recordsToSwap = subTables[idx]; 
    for(let i = 0; i < data.length; i++){
        recordsToSwap[data[i]["id"]].style.order = i;
        if(filteredIdsSub[data[i]["id"]]){
            recordsToSwap[data[i]["id"]].style.display = "flex";
        }
        else{
            recordsToSwap[data[i]["id"]].style.display = "none";
        }
    }
}

filterElement = (element, what, data) =>{
    for (const [key, value] of Object.entries(data)) {
        let el = String(what == "info"?element["info"][key]:element[key]).toUpperCase();
        let text = String(value).toUpperCase();

        if(text != el.substring(0, Math.min(el.length, text.length))){
            return false;
        }
    }
    return true;
}

filterRegions = (input, criterion) => {
    let text = String(input.value).toUpperCase();
    filters[criterion] = text;
    console.log(filters)

    orderedData.forEach(element => {
        let id = element["info"]["id"];

        filteredIds[id] = filterElement(element, "info", filters);
    });
    rearrangeTable()
}

subTable = (data, id) =>{
    let table = document.createElement("div");

    let tr = document.createElement("div");

    let filteredIdsSub = []
    let filtersSub = {"name":"", "capital":"", "population":"", "area":""}
    data.forEach(element => {
        filteredIdsSub.push(true);
    });
    
    tr.innerHTML = `<div><strong>Nazwa miasta</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></div>`
    tr.innerHTML += '<div><strong>Stolica</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></div>'
    tr.innerHTML += '<div><strong>Populacja</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></div>'
    tr.innerHTML += '<div><strong>Powierzchnia</strong><b href="">&#9653;</b><b href = "">&#9663;</b><input type="text"></input></div>'

    let i = 0;
    let tab = [{"key":"name", "isString": 0}, {"key":"capital", "isString": 0}, {"key":"population", "isString": 1}, {"key":"area", "isString": 1}]
    for (const el of tr.getElementsByTagName("b")) {
        let j = i;
        el.onclick = ()=>{
            customSort(j%2==0?1:-1, tab[parseInt(j/2)]["key"], tab[parseInt(j/2)]["isString"], data, "data")
            rearrangeSubTable(id, data, filteredIdsSub)
        }
        
        i++
    }
    let j = 0;
    for (const el of tr.getElementsByTagName("input")) {
        let k = j;
        el.onkeyup = ()=>{
            let text = String(el.value).toUpperCase();
            filtersSub[tab[k]["key"]] = text;

            data.forEach(element => {
                let id = element["id"];

                filteredIds
                filteredIdsSub[id] = filterElement(element, "data", filtersSub);
            });
            console.log(filtersSub)
            rearrangeSubTable(id, data, filteredIdsSub);
        }
        
        j++
    }

    table.appendChild(tr);

    for (const el of data) {
        let tr = document.createElement("div");
        
        let info = [el["name"], el["capital"], el["population"], el["area"]];

        for (const i of info) {
            let td = document.createElement("p");
            td.innerHTML = i;
            tr.appendChild(td)
        }
    
        table.appendChild(tr);
        subTables[id].push(tr);
    }

    table.className = "subTab";
    return table;
}

damn = (subTab, isSubTabDisplayed) =>{
    subTab.style.display = isSubTabDisplayed?"none":"flex";
    return !isSubTabDisplayed;
}

createTable = () => {
    let keys = ["subregion", "population", "area"];
    id = 0;

    for (const value of orderedData) {
        let tr = document.createElement("div");
        subTables.push([]);
        let subTab = subTable(value["data"], id);
        

        let isSubTabDisplayed = false;
        let td = document.createElement("p");
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
            let td = document.createElement("p");
            td.innerHTML = (key == "subregion")? td.innerHTML + value["info"][key]:value["info"][key]
            tr.appendChild(td)
        }
        
        let subTabTr = document.createElement("div");
        subTabTr.appendChild(subTab);

        document.getElementById("regions").appendChild(tr);
        document.getElementById("regions").appendChild(subTabTr);
        tr.style.order = id;
        subTabTr.style.order = id;
        regions.push(tr);
        moreInfoRegions.push(subTabTr);
        id++
    }
}