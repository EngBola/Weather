var app = {
    place: 65,
    NameOfCountry: "Egypy",
    Iso3Name: "EG",
    CapitalCity: "Cairo",
    curentSelect:"cairo",
    days:4,
    today: new Date,
    latitude:"27.00000000",
    longitude:"30.00000000",
    location:`${this.latitude},${this.longitude}`,
    // location =() =>`${this.latitude},${this.longitude}`;
    // location:`${latitude},${longitude}`
}

const months = ["January","February","March","April","May","Jun","July","August","September","October","November","December"];
const dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let thisDayIs = app.today.getUTCDay();

AllCountries();
function displayData() {
    countryName.innerHTML = app.NameOfCountry;
    countryName.setAttribute("iso2-Name", app.Iso3Name)
    im[0].src = `https://www.countryflagicons.com/FLAT/64/${app.Iso3Name.toUpperCase()}.png`;
    im[1].src = `https://www.countryflagicons.com/FLAT/64/${app.Iso3Name.toUpperCase()}.png`;
    getCity();
    model();    
}

let dropMenu = document.querySelector(".dropdown-menu");
let countryName = document.querySelector(".region h5");
let im = document.querySelectorAll(".flag");
let citesMenu = document.querySelector(".myCites ul");
displayData();

async function AllCountries() {
    let countries = await fetch("./countries.json");
    if (countries.ok && 400 != countries.status) {
        countries = await countries.json();
        let droplist = "";
        for (let i = 0; i < countries.length; i++) {
            droplist += `<li><a class="dropdown-item" href="#weather-state" data-target="${i}" iso2-Name="${countries[i].iso2}">${countries[i].name}</a></li>`;
        }
        dropMenu.innerHTML = droplist;
        let dropItems = document.querySelectorAll(".dropdown-item");
        for (let i = 0; i < dropItems.length; i++) {
            dropItems[i].addEventListener("click", function () {
                app.place = dropItems[i].getAttribute("data-target")
                app.NameOfCountry = dropItems[i].innerHTML;
                app.Iso3Name = dropItems[i].getAttribute("iso2-Name");
                app.CapitalCity = countries[app.place].capital;
                app.latitude=countries[app.place].latitude;
                app.longitude=countries[app.place].longitude;
                app.location=`${app.latitude},${app.longitude}`,
                displayData();
            });
            
        }
    }
}

async function getCity() {
    let city = await fetch(`./countries.json`)
    if (city.ok && 400 != city.status) {
        city = await city.json();
        let cit = city[app.place].states;
        let listcity = "";
        if (cit.length < 1 ) {
            listcity = app.location;
            var key = "881f37940a8649e2b1e101942232903";
            let forcast = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${listcity}&aqi=no`)
                if (forcast.ok && 400 != forcast.status) {
                    forcast = await forcast.json();
                    let temp = forcast.current.temp_c;
                    listcity += `
                        <a href="#weather-state" class="text-decoration-none">
                        <li class="d-flex justify-content-between text-white-50 p-1" location-data="${listcity}">
                        <h6>${app.NameOfCountry}</h6>
                        <p>${temp}<sup>o</sup></p>
                        </li></a>
                        `;
                } else {
                    // console.log("dont worry")
                }
        } else {
            for (let i = 0; i < cit.length; i++) {
                var key = "881f37940a8649e2b1e101942232903";
                let forcast = await fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${cit[i].latitude},${cit[i].longitude}&aqi=no`)
                if (forcast.ok && 400 != forcast.status) {
                    forcast = await forcast.json();
                    let temp = forcast.current.temp_c;
                    listcity += `<a href="#weather-state" class="text-decoration-none">
                        <li class="d-flex justify-content-between text-white-50 p-1" location-data="${cit[i].latitude},${cit[i].longitude}">
                        <h6>${cit[i].name}</h6>
                        <p>${temp}<sup>o</sup></p>
                        </li></a>
                        `;
                } else {
                    continue;
                }
                notOk(i!=cit.length-1);
            }
        }
        citesMenu.innerHTML = listcity;
        let citesList = document.querySelectorAll(".myCites li");
        for(let i=0 ;i<citesList.length;i++){
            citesList[i].addEventListener("click", function(e){
                // let select =citesList[i].querySelector("h6");
                // app.curentSelect=select.innerHTML
                // model(app.curentSelect);
                let select =citesList[i].getAttribute("location-data");
                app.curentSelect=select;
                console.log(select)
                model(app.curentSelect);
            })
        }
    }

}




async function model(n=app.CapitalCity,d=app.days){

    // let thisDay= document.querySelector(".main-day");
    let thisDate =document.querySelector(".date");
    let thisDayPram =document.querySelector(`.weahterPram`);
    let more =document.querySelector(".moreInfo");
    let mordays =document.querySelector(".days");
    var key = "881f37940a8649e2b1e101942232903";
    let forcast = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${n}&aqi=no&days=${d}`)
        if (forcast.ok && 400 != forcast.status) {
            forcast = await forcast.json();
            let temp = forcast.current.temp_c;
            thisDate.innerHTML=`<h4>${dayName[thisDayIs]}</h4>
            <h4><span class="bg-white text-dark">${app.today.getDate()}</span> ${months[app.today.getMonth()]}</h4>
            `
            thisDayPram.innerHTML=`
            <h2 class="fw-bolder">${forcast.location.region}</h2>
                                    <p class="main-day-degree">${temp}<sup class="text-warning">o</sup>C</p>
                                    <div>
                                        <h2 class="mb-0">${forcast.current.condition.text}</h2>
                                        <img src="${forcast.current.condition.icon}" alt="" >
                                    </div>
            `;
            more.innerHTML=`
                                    <span><img src="images/icon-umberella.png" alt="#"> ${forcast.forecast.forecastday[0].day.avghumidity}%</span>
                                    <span><img src="images/icon-compass.png" alt="#"> ${forcast.current.wind_dir}</span>
                                    <span><img src="images/icon-wind.png" alt="#"> ${forcast.current.wind_kph}Km/h</span>
            `
            let allDays =forcast.forecast.forecastday
            let collect="";
            for(let i=1;i<allDays.length;i++){
                collect +=`
                        <div class="col-sm-4">
                            <div class="main-day container mb-2 p-2 ">
                                <div class=" d-flex flex-wrap justify-content-around align-items-center rounded-top p-2 bg-dark text-white-50">
                                    <h6>${dayName[new Date(allDays[i].date).getUTCDay()]}</h6>
                                    <h6><span class=" fs-6  text-white">${new Date(allDays[i].date).getDate()}</span> ${months[new Date(allDays[i].date).getMonth()]}</h6>
                                </div>
                                <div class="  px-2 test-center text-dark">
                                    <h4 class="">${allDays[i].day.avgtemp_c}<sup class="text-warning">o</sup>C</h4>
                                    <div>
                                        <span class="mb-0">${allDays[i].day.condition.text}</span>
                                        <img src="${allDays[i].day.condition.icon}" alt="#" >
                                    </div>
                                </div>
                                <div class=" d-flex flex-wrap justify-content-around align-items-center rounded-bottom p-1 bg-dark text-white-50 ">
                                    <span "><i class="fa-solid fa-umbrella text-warning"></i> ${allDays[i].hour[0].humidity}%</span>
                                    <span "><i class="fa-regular fa-compass text-warning"></i> ${allDays[i].hour[0].wind_dir}</span>
                                    <span "><i class="fa-solid fa-wind text-warning"></i> ${allDays[i].hour[0].wind_kph}Km/h</span>
                                </div>
                            </div>
                        </div>
                    `
            }
            mordays.innerHTML=collect;
        }
    
}







let loder = document.querySelector(".cites .loding")
let notOk =(s)=>{
    let t 
    if(s==true){
        loder.classList.replace("d-none","d-block");
        t = 1000;
    }else{
        loder.classList.replace("d-block","d-none");
    }
    
    $(".crcl").fadeIn(t);
    $(".crcl").fadeOut(t);
    
}

let filter = document.querySelectorAll(".filter ul li");
for(let i=0;i<filter.length;i++){
    filter[i].addEventListener("click" , function(){ 
    model(app.curentSelect,this.value)
    })
}

let search= document.querySelector(".find .btn");
let find = document.querySelector(".find input");
search.addEventListener("click", function(){
    
    model(app.curentSelect = find.value);
});
find.addEventListener("keyup" , function(){
    if(find.value.length > 2){
        model(app.curentSelect = find.value);
    }else{
        model(app.CapitalCity);
    }
    
})