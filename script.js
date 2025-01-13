const apiKey = "0e0a895b984cf05192352907a3c69de3";
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const appContainer = document.getElementById("app-container");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");

// Funksioni për të marrë të dhënat e motit
async function fetchWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("Qyteti nuk u gjet!");
        }
        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert(error.message);
    }
}

// Funksioni për të përditësuar motin dhe sfondin
function updateWeather(data) {
    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main.toLowerCase(); // Shembull: "clear", "rain", "clouds"
    const weatherDesc = data.weather[0].description;

    // Përditëso të dhënat e motit
    cityName.textContent = data.name;
    temperature.textContent = `${temp}°C`;
    weatherDescription.textContent = `${weatherDesc} ${getWeatherIcon(weather)}`; // Përfshi emoji

    // Ndrysho sfondin sipas motit
    appContainer.className = ""; // Fshi klasat ekzistuese
    appContainer.classList.add(getBackgroundClass(weather));
}

// Funksioni për të marrë ikonën e motit
function getWeatherIcon(weather) {
    const icons = {
        clear: "🌞", // Diell
        rain: "🌧️", // Shi
        clouds: "☁️", // Re
        snow: "❄️", // Borë
        thunderstorm: "🌩️", // Stuhia
        drizzle: "🌦️", // Pika shiu
        mist: "🌫️", // Mjegull
        haze: "🌫️", // Haze
        smoke: "💨", // Tym
        dust: "🌪️", // Pluhur
        fog: "🌫️", // Mjegull e dendur
        default: "❓", // Gjendje e panjohur
    };
    return icons[weather] || icons.default;
}

// Funksioni për të marrë klasën e sfondit sipas motit
function getBackgroundClass(weather) {
    const backgrounds = {
        clear: "sunny-bg",
        rain: "rainy-bg",
        clouds: "cloudy-bg",
        snow: "snowy-bg",
        thunderstorm: "stormy-bg",
        drizzle: "rainy-bg",
        mist: "cloudy-bg",
        haze: "cloudy-bg",
        smoke: "default-bg",
        dust: "default-bg",
        fog: "cloudy-bg",
    };
    return backgrounds[weather] || "default-bg";
}

// Event Listener për butonin
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
        cityInput.value = ""; // Pastron input-in pas kërkimit
    } else {
        alert("Ju lutemi shkruani emrin e një qyteti!");
    }
});

// Opsionale: Kërkimi me tastin Enter
cityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
            cityInput.value = ""; // Pastron input-in pas kërkimit
        } else {
            alert("Ju lutemi shkruani emrin e një qyteti!");
        }
    }
});

