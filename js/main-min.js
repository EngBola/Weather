var app={place:65,NameOfCountry:"Egypy",Iso3Name:"EG",CapitalCity:"Cairo",curentSelect:"cairo",days:4,today:new Date};const months=["January","February","March","April","May","Jun","July","August","September","October","November","December"],dayName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];let thisDayIs=app.today.getUTCDay();function displayData(){countryName.innerHTML=app.NameOfCountry,countryName.setAttribute("iso2-Name",app.Iso3Name),im[0].src=`https://www.countryflagicons.com/FLAT/64/${app.Iso3Name.toUpperCase()}.png`,im[1].src=`https://www.countryflagicons.com/FLAT/64/${app.Iso3Name.toUpperCase()}.png`,getCity(),model()}AllCountries();let dropMenu=document.querySelector(".dropdown-menu"),countryName=document.querySelector(".region h5"),im=document.querySelectorAll(".flag"),citesMenu=document.querySelector(".myCites ul");async function AllCountries(){let e=await fetch("./countries.json");if(e.ok&&400!=e.status){e=await e.json();let t="";for(let a=0;a<e.length;a++)t+=`<li><a class="dropdown-item" href="#weather-state" data-target="${a}" iso2-Name="${e[a].iso2}">${e[a].name}</a></li>`;dropMenu.innerHTML=t;let a=document.querySelectorAll(".dropdown-item");for(let t=0;t<a.length;t++)a[t].addEventListener("click",(function(){app.place=a[t].getAttribute("data-target"),app.NameOfCountry=a[t].innerHTML,app.Iso3Name=a[t].getAttribute("iso2-Name"),app.CapitalCity=e[app.place].capital,displayData()}))}}async function getCity(){let e=await fetch("./countries.json");if(e.ok&&400!=e.status){e=await e.json();let t=e[app.place].states,a="";if(0==t.length){a=app.NameOfCountry;let e=await fetch(`https://api.weatherapi.com/v1/current.json?key=0905567266db456987580924221110&q=${a}&aqi=no`);if(e.ok&&400!=e.status){e=await e.json();let t=e.current.temp_c;a+=`\n                        <a href="#weather-state" class="text-decoration-none">\n                        <li class="d-flex justify-content-between text-white-50 p-1" >\n                        <h6>${app.NameOfCountry}</h6>\n                        <p>${t}<sup>o</sup></p>\n                        </li></a>\n                        `}}else for(let e=0;e<t.length;e++){let n=await fetch(`https://api.weatherapi.com/v1/current.json?key=0905567266db456987580924221110&q=${t[e].name}&aqi=no`);if(n.ok&&400!=n.status){{n=await n.json();let i=n.current.temp_c;a+=`<a href="#weather-state" class="text-decoration-none">\n                        <li class="d-flex justify-content-between text-white-50 p-1">\n                        <h6>${t[e].name}</h6>\n                        <p>${i}<sup>o</sup></p>\n                        </li></a>\n                        `}notOk(e!=t.length-1)}}citesMenu.innerHTML=a;let n=document.querySelectorAll(".myCites li");for(let e=0;e<n.length;e++)n[e].addEventListener("click",(function(t){let a=n[e].querySelector("h6");app.curentSelect=a.innerHTML,model(app.curentSelect)}))}}async function model(e=app.CapitalCity,t=app.days){let a=document.querySelector(".date"),n=document.querySelector(".weahterPram"),i=document.querySelector(".moreInfo"),s=document.querySelector(".days"),o=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0905567266db456987580924221110&q=${e}&aqi=no&days=${t}`);if(o.ok&&400!=o.status){o=await o.json();let e=o.current.temp_c;a.innerHTML=`<h4>${dayName[thisDayIs]}</h4>\n            <h4><span class="bg-white text-dark">${app.today.getDate()}</span> ${months[app.today.getMonth()]}</h4>\n            `,n.innerHTML=`\n            <h2 class="fw-bolder">${o.location.name}</h2>\n                                    <p class="main-day-degree">${e}<sup class="text-warning">o</sup>C</p>\n                                    <div>\n                                        <h2 class="mb-0">${o.current.condition.text}</h2>\n                                        <img src="${o.current.condition.icon}" alt="" >\n                                    </div>\n            `,i.innerHTML=`\n                                    <span><img src="images/icon-umberella.png" alt="#"> ${o.forecast.forecastday[0].day.avghumidity}%</span>\n                                    <span><img src="images/icon-compass.png" alt="#"> ${o.current.wind_dir}</span>\n                                    <span><img src="images/icon-wind.png" alt="#"> ${o.current.wind_kph}Km/h</span>\n            `;let t=o.forecast.forecastday,r="";for(let e=1;e<t.length;e++)r+=`\n                        <div class="col-sm-4">\n                            <div class="main-day container mb-2 p-2 ">\n                                <div class=" d-flex flex-wrap justify-content-around align-items-center rounded-top p-2 bg-dark text-white-50">\n                                    <h6>${dayName[new Date(t[e].date).getUTCDay()]}</h6>\n                                    <h6><span class=" fs-6  text-white">${new Date(t[e].date).getDate()}</span> ${months[new Date(t[e].date).getMonth()]}</h6>\n                                </div>\n                                <div class="  px-2 test-center text-dark">\n                                    <h4 class="">${t[e].day.avgtemp_c}<sup class="text-warning">o</sup>C</h4>\n                                    <div>\n                                        <span class="mb-0">${t[e].day.condition.text}</span>\n                                        <img src="${t[e].day.condition.icon}" alt="#" >\n                                    </div>\n                                </div>\n                                <div class=" d-flex flex-wrap justify-content-around align-items-center rounded-bottom p-1 bg-dark text-white-50 ">\n                                    <span "><i class="fa-solid fa-umbrella text-warning"></i> ${t[e].hour[0].humidity}%</span>\n                                    <span "><i class="fa-regular fa-compass text-warning"></i> ${t[e].hour[0].wind_dir}</span>\n                                    <span "><i class="fa-solid fa-wind text-warning"></i> ${t[e].hour[0].wind_kph}Km/h</span>\n                                </div>\n                            </div>\n                        </div>\n                    `;s.innerHTML=r}}displayData();let loder=document.querySelector(".cites .loding"),notOk=e=>{let t;1==e?(loder.classList.replace("d-none","d-block"),t=1e3):loder.classList.replace("d-block","d-none"),$(".crcl").fadeIn(t),$(".crcl").fadeOut(t)},filter=document.querySelectorAll(".filter ul li");for(let e=0;e<filter.length;e++)filter[e].addEventListener("click",(function(){model(app.curentSelect,this.value)}));let search=document.querySelector(".find .btn"),find=document.querySelector(".find input");search.addEventListener("click",(function(){model(app.curentSelect=find.value)})),find.addEventListener("keyup",(function(){find.value.length>2?model(app.curentSelect=find.value):model(app.CapitalCity)}));