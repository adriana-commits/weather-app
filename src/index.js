let now = new Date();

let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let weekday = weekdays[now.getDay()];

let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${weekday} ${now.getHours()}:${now.getMinutes()}`;

function displayWeather(response) {
  let celsius = Math.round(response.data.main.temp);
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${celsius}°C | ${fahrenheit}° F`;
}

function displayHumidity(response) {
  let humidity = Math.round(response.data.main.humidity);
  let currentHumidity = document.querySelector("#current-humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
}

function displayWindspeed(response) {
  let windspeed = Math.round(response.data.wind.speed);
  let currentWindspeed = document.querySelector("#current-windspeed");
  currentWindspeed.innerHTML = `Windspeed: ${windspeed} km/h`;
}

function displayWeatherStatus(response) {
  let weatherStatus = response.data.weather[0];
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherStatus.icon}@2x.png`
  );
  iconElement.setAttribute("alt", weatherStatus.description);

  let currentWeatherStatus = document.querySelector("#current-weather-status");
  currentWeatherStatus.innerHTML = weatherStatus.description;
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form");
  let city = searchInput.value;

  if (city) {
    let apiKey = "59291e55603857fc768aa2b6fad03a18";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios
      .get(url)
      .then((response) => {
        let searchedCity = document.querySelector("#searched-city");
        searchedCity.innerHTML = city;
        displayWeather(response);
        displayHumidity(response);
        displayWindspeed(response);
        displayWeatherStatus(response);
        searchInput.value = "";
      })
      .catch(() => {
        alert("We could not find that city. Please try again!");
      });
  }
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let btn = document.querySelector("#submit-btn");
btn.click();
