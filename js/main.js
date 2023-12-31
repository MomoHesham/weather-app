"use strict"


let today = [];
let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let myDate = new Date();
let latitude;
let longitude

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
}
function showPosition(p) {
    latitude = p.coords.latitude;
    longitude = p.coords.longitude;
    weatherData(`${latitude}, ${longitude}`)
}

function weatherData(city) {
    let myhttp = new XMLHttpRequest();

    myhttp.open("GET", `https://api.weatherapi.com/v1/forecast.json?key=449fcad10df64c6eb5a190055232812&q=${city}&days=3`);

    myhttp.send();

    myhttp.addEventListener("readystatechange", function () {
        if (myhttp.readyState == 4 && myhttp.status == 200) {
            today = JSON.parse(myhttp.response);
            displayToday();
            displayAfterToday()
        }
    });
};

searchBar.addEventListener("input", function (e) {
    weatherData(e.target.value);
})

function displayToday() {
    let windDir = "";
    let box = ``;
    switch (today.current.wind_dir) {
        case "N":
            windDir = "North";
            break;
        case "S":
            windDir = "South";
            break;
        case "W":
            windDir = "West";
            break;
        case "E":
            windDir = "East";
            break;
        case "NE":
            windDir = "Northeast";
            break;
        case "SE":
            windDir = "Southeast";
            break;
        case "SW":
            windDir = "Southwest";
            break;
        case "NW":
            windDir = "Northwest";
            break;
        case "NNW":
            windDir = "North Northwest ";
            break;
        case "NNE":
            windDir = "North Northeast";
            break;
        case "ENE":
            windDir = "East Northeast";
            break;
        case "ESE":
            windDir = "East Southeast";
            break;
        case "SSE":
            windDir = "South Southeast";
            break;
        case "SSW":
            windDir = "South SouthWest";
            break;
        case "WSW":
            windDir = "West Southwest";
            break;
        case "WNW":
            windDir = "West Northwest";
            break;
    }
    let date = new Date(today.forecast.forecastday[0].date);
    let day = days[date.getDay(today.forecast.forecastday[0].date)];
    box = `     <div class="todayContainer h-100">
        <div
            class="todayHeader d-flex align-items-center justify-content-between bg-secondary px-3 py-2 text-white-50 rounded-top-3">
            <h6 class="m-0">${day}</h6>
            <h6 class="m-0">${date.getDate(today.forecast.forecastday[0].date)} ${month[date.getMonth(today.forecast.forecastday[0].date)]}</h6>
        </div>
        <div
            class="weatherContent todayDetails px-3 py-2 rounded-bottom-3 d-flex justify-content-between flex-column">
            <div class="locationName mb-5">
                <h4 class="m-0 text-white">${today.location.name}</h4>
            </div>
            <div class="locationWeather mb-5 row align-items-center">
                <h2 class="text-white text-center col-12 col-md-7 ">${today.current.temp_c}<sup>o</sup>C</h2>
                <div class="col-6 col-lg-5">
                    <img src="${today.current.condition.icon}" class="w-50 " alt="">
                </div>
            </div>
            <div>
                <div class="weatherCondition ">
                    <h6 class="text-info ">${today.current.condition.text}</h6>
                </div>
                <div class="weatherDetails mb-3">
                    <div class="d-inline-block me-3">
                        <img src="images/icon-umberella.png" alt="">
                        <span class="text-white-50 fw-medium">20%</span>
                    </div>
                    <div class="d-inline-block me-3">
                        <img src="images/icon-wind.png" alt="">
                        <span class="text-white-50 fw-medium">${today.current.wind_kph}km/h</span>
                    </div>
                    <div class="d-inline-block me-3">
                        <img src="images/icon-compass.png" alt="">
                        <span class="text-white-50 fw-medium">${windDir}</span>
                    </div>

                </div>
            </div>
        </div>
    </div>`;
    document.getElementById("todayContent").innerHTML = box;


}
function displayAfterToday() {
    let container = ``;
    for (let i = 1; i < today.forecast.forecastday.length; i++) {
        let date = new Date(today.forecast.forecastday[i].date);
        let day = days[date.getDay()];
        container += ` <div class="afterTodayContent">
        <div
            class="tomorrowsHeader d-flex align-items-center  justify-content-center  px-3 py-2 text-white-50 rounded-top-3">
            <h6 class="m-0">${day}</h6>
        </div>
        <div class="weatherContent tomorrowsDetails bg-secondary px-3 py-2 rounded-bottom-3">
            <div class="locationWeather   align-items-center">
                <div class=" text-center m-3 ">
                    <img src="${today.forecast.forecastday[i].day.condition.icon}" class="img-fluid " alt="">
                </div>
                <h2 class="text-white text-center ">${today.forecast.forecastday[i].day.maxtemp_c}<sup>o</sup>c</h2>
                <h6 class="text-white text-center  fw-normal">${today.forecast.forecastday[i].day.mintemp_c}<sup>o</sup>c</h2>
            </div>
            <div class="weatherCondition  text-center">
                <h6 class="text-info">${today.forecast.forecastday[i].day.condition.text}</h6>
            </div>
        </div>
    </div>`;
        document.querySelector("#afterTodayContainer").innerHTML = container;
    }

}


