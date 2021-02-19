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
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}°C`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-form").value;
  let apiKey = "59291e55603857fc768aa2b6fad03a18";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then((response) => {
    let searchedCity = document.querySelector("#searched-city");
    searchedCity.innerHTML = city;
    displayWeather(response);
  });
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//testing this out

//pana aici testam
