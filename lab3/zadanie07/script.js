fetch('cities.json')
  .then((response) => response.json())
  .then((data) => processingData(data.cities));

processingData = (data)=> {
  let a = data.filter((city) => city.province == "małopolskie");
  printData(a, document.getElementById("a"));
  
  let b = createB(data);
  printData(b, document.getElementById("b"));

  let c = data.map(({name, dentensity})=>[name, dentensity]).sort(function(a,b){
    return (a[1] < b[1]) ? 1 : -1;
  });

  document.getElementById("c").innerText += c[4][0];

  let d = createD(data);
  printData(d, document.getElementById("d"));

  let eMore = data.filter((city)=>city.people > 80000).length;
  let eLess = data.filter((city)=>city.people < 80000).length;
  document.getElementById("e").innerHTML = `Więcej niż 80000: ${eMore} \n Mniej niż 8000: ${eLess} \n Więcej jest miast ${((eLess > eMore) ? 'poniżej' : 'powyżej')}  80000 mieszkańców`

  let filteredF = data.filter((city) => city.township[0] == "p").map(({area})=>area)
  average = filteredF.reduce((a, b) => a + b, 0) / filteredF.length; 
  document.getElementById("f").innerHTML = average;

  let filteredG = data.filter((city) => city.province == "pomorskie");
  let allCities = filteredG.length;
  let exCities = filteredG.filter((city) => city.people > 5000).length;
  document.getElementById("g").innerHTML = `${(allCities == exCities) ? 'Tak' : 'Nie'} \n Jest ${exCities} takich miast`
}

countAForCities = (item) =>{
  counter = 0;
  for (const letter of item.name) {
    if(letter == "a" || letter == "A"){
      counter += 1;
    }
  }
  return {"name": item.name,"counterA":counter}
}

createB = (data) =>{
  data = data.map(countAForCities);
  return data.filter((city)=>city.counterA == 2);
}

createD = (data) => {
  let filtered = data.filter((city)=>city.people > 100000);
  
  filtered = filtered.map(function(element){
    return {"name": element.name + " city"};
  });

  return filtered;
}

printData=(data, div)=>{
  for(let el of data.slice(0, data.length - 1)){
    div.innerHTML += `${el.name}, `;
  }

  div.innerHTML += data[data.length - 1].name;
}

