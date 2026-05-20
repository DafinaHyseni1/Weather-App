const apiKey = "0e0a895b984cf05192352907a3c69de3";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");

const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feels-like");
const pressure = document.getElementById("pressure");

const weatherIcon = document.getElementById("weather-icon");

const forecastContainer = document.getElementById("forecast-container");

const loader = document.getElementById("loader");


async function fetchWeather(city){

    try{

        loader.style.display = "block";

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if(!response.ok){
            throw new Error("City not found");
        }

        const data = await response.json();

        updateWeather(data);

        fetchForecast(city);

    }catch(error){

        alert(error.message);

    }finally{

        loader.style.display = "none";

    }

}


function updateWeather(data){

    const weather = data.weather[0].main.toLowerCase();

    cityName.textContent = data.name;

    temperature.textContent =
    `${Math.round(data.main.temp)}°C`;

    weatherDescription.textContent =
    data.weather[0].description;

    humidity.textContent =
    `${data.main.humidity}%`;

    wind.textContent =
    `${data.wind.speed} km/h`;

    feelsLike.textContent =
    `${Math.round(data.main.feels_like)}°C`;

    pressure.textContent =
    `${data.main.pressure} hPa`;

    const iconCode = data.weather[0].icon;

    weatherIcon.src =
    `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

    document.body.className = weather;

}


async function fetchForecast(city){

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    displayForecast(data);

}


function displayForecast(data){

    forecastContainer.innerHTML = "";

    const dailyData = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    dailyData.slice(0,5).forEach(day => {

        const date = new Date(day.dt_txt);

        const dayName =
        date.toLocaleDateString("en-US", {
            weekday:"short"
        });

        const icon =
        day.weather[0].icon;

        const temp =
        Math.round(day.main.temp);

        forecastContainer.innerHTML += `

            <div class="forecast-card">

                <h3>${dayName}</h3>

                <img
                    src="https://openweathermap.org/img/wn/${icon}@2x.png"
                >

                <p>${temp}°C</p>

            </div>

        `;

    });

}


searchBtn.addEventListener("click", ()=>{

    const city = cityInput.value.trim();

    if(city){

        fetchWeather(city);

        cityInput.value = "";

    }

});


cityInput.addEventListener("keydown",(e)=>{

    if(e.key === "Enter"){

        const city = cityInput.value.trim();

        if(city){

            fetchWeather(city);

            cityInput.value = "";

        }

    }

});


const today = new Date();

document.getElementById("date").textContent =
today.toLocaleDateString("en-US",{
    weekday:"long",
    month:"long",
    day:"numeric"
});


fetchWeather("London");
