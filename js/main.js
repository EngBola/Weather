
var app = {
    place: 65,
    NameOfCountry: "Egypy",
    Iso3Name: "EG",
    CapitalCity: "Cairo",
    tealView: this.CapitalCity,
}

function displayData() {
    countryName.innerHTML = app.NameOfCountry;
    countryName.setAttribute("iso2-Name", app.Iso3Name)
    im[0].src = `https://www.countryflagicons.com/FLAT/64/${app.Iso3Name.toUpperCase()}.png`;
    im[1].src = `https://www.countryflagicons.com/FLAT/64/${app.Iso3Name.toUpperCase()}.png`;
    getCity();
    // AllCountries();
}
let dropMenu = document.querySelector(".dropdown-menu");
let countryName = document.querySelector(".region h5");
let im = document.querySelectorAll(".flag");
let citesMenu = document.querySelector(".myCites ul");
displayData();




function setCites() {

}


async function AllCountries() {
    let countries = await fetch("./countries.json");
    if (countries.ok && 400 != countries.status) {
        countries = await countries.json();
        let droplist = "";
        for (let i = 0; i < countries.length; i++) {
            droplist += `<li><a class="dropdown-item" href="#" data-target="${i}" iso2-Name="${countries[i].iso2}">${countries[i].name}</a></li>`;
        }
        dropMenu.innerHTML = droplist;
        let dropItems = document.querySelectorAll(".dropdown-item");
        for (let i = 0; i < dropItems.length; i++) {
            dropItems[i].addEventListener("click", function () {
                app.place = dropItems[i].getAttribute("data-target")
                app.NameOfCountry = dropItems[i].innerHTML;
                app.Iso3Name = dropItems[i].getAttribute("iso2-Name");
                app.CapitalCity = countries[app.place].capital;
                displayData();
                
                // console.log(countries[app.place])
            });
            
            
        }
    }

}

// async function getDegree(city=cairo , day=1){
//     let forcast = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=0905567266db456987580924221110&q=${city}&days=${day}`)
//     forcast = await forcast.json();
//     console.log(forcast.current.temp_c);
//     // return forcast.current.temp_c;
//     }
//     getDegree('cairo')


async function getCity() {
    let city = await fetch(`./countries.json`)
    if (city.ok && 400 != city.status) {
        city = await city.json();
        let cit = city[app.place].states;
        let listcity = "";

        if (cit.length == 0) {
            listcity = app.NameOfCountry;
            let forcast = await fetch(`https://api.weatherapi.com/v1/current.json?key=0905567266db456987580924221110&q=${listcity}&aqi=no`)
                if (forcast.ok && 400 != forcast.status) {
                    forcast = await forcast.json();
                    let temp = forcast.current.temp_c;
                    // let curntC = forcast.current.name;
                    listcity += `
                        <li class="d-flex justify-content-between text-white-50 p-1">
                        <h6>${app.NameOfCountry}</h6>
                        <p>${temp}<sup>o</sup></p>
                        </li>
                        `;
                    
                } else {
                    console.log("dont worry")
                }
        } else {
            for (let i = 0; i < cit.length; i++) {
                let forcast = await fetch(`https://api.weatherapi.com/v1/current.json?key=0905567266db456987580924221110&q=${cit[i].name}&aqi=no`)
                if (forcast.ok && 400 != forcast.status) {
                    forcast = await forcast.json();
                    let temp = forcast.current.temp_c;
                    listcity += `
                        <li class="d-flex justify-content-between text-white-50 p-1">
                        <h6>${cit[i].name}</h6>
                        <p>${temp}<sup>o</sup></p>
                        </li>
                        `;
                        
                        
                } else {
                    continue;
                }
            }
        }
        citesMenu.innerHTML = listcity;
        let citesList = document.querySelectorAll(".myCites li");
        for(let i=0 ;i<citesList.length;i++){
            citesList[i].addEventListener("click", function(e){
                console.log(e);
            })
        }
        
    }
    
    
    // console.log(listcity)
    // console.log(city[app.place].states)
}

// AllCountries();
function model(){

    let thisDay= document.querySelector(".main-day");
    let thisDate =document.querySelector(".date");
    let thisDayPram =document.querySelector(`.weahterPram`);
    let more =document.querySelector(".moreInfo");


}

// model()