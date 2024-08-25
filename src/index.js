let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchCity);

function handleSearchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#search-form-input");
  searchCity(search.value);
}

function searchCity(city) {
  let apiKey = "a7f4435600oc7ca6bdf3abed988ftf39";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}
function updateWeather(response) {
  let originTemperature = document.querySelector("#temperature");
  let originCity = document.querySelector("#city");
  let originHumidity = document.querySelector("#humidity");
  let originDescription = document.querySelector("#description");
  let originWindSpeed = document.querySelector("#wind-speed");
  let originTime = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let originIcon = document.querySelector("#icon");
  originIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  originTime.innerHTML = formatDate(date);
  originWindSpeed.innerHTML = `${response.data.wind.speed}km/h`;
  originHumidity.innerHTML = `${response.data.temperature.humidity}%`;
  originDescription.innerHTML = response.data.condition.description;
  originCity.innerHTML = response.data.city;
  originTemperature.innerHTML = Math.round(response.data.temperature.current);
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}
function getForecast(city) {
  let apiKey = "a7f4435600oc7ca6bdf3abed988ftf39";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(showForecast);
}
function showForecast(response) {
  console.log(response.data);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `       
          <div class="tiempo-forecast-day">
            <div class="tiempo-forecast-date">${day}</div>
            <div class="tiempo-forecast-icon">🌤</div>
            <div class="tiempo-forecast-temperatures">
              <div class="tiempo-forecast-temperature">
                <strong>18℃</strong>
              </div>
              <div class="tiempo-forecast-temperature">10℃</div>
            </div>
          </div>
        `;
  });
  let forecasts = document.querySelector("#forecast");
  forecasts.innerHTML = forecastHtml;
}
searchCity("London");
