function refreshWeather (response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let iconElement = document.querySelector("#icon");


    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    timeElement.innerHTML = formatDate(date);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}Km/h`;
    iconElement.innerHTML = `<img src= "${response.data.condition.icon_url}"
    class="weather-app-icon" />`;

}

function formatDate(date){
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let day = days[date.getDay()];

    if (minutes<10){
        minutes = `0${minutes}`;
    }

    return `${day} ${hours}: ${minutes}`;
}

function searchCity (city){
 let apiKey = "54140323a0tcoaa5a5d403ba35bafe4a";
 let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
 axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit (event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity();