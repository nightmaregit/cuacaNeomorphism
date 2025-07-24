let a = false;
let body = document.body;
let card = document.querySelector(".weather-card");
let nav = document.querySelector(".nav");
let burger = document.querySelector(".burger");
let kota = document.querySelector(".kota");
let detailsTop = document.querySelector(".details-top");
let tombol = document.querySelector(".tombol");
let line = document.querySelector(".line");
let forecastItem = document.querySelectorAll(".forecastItem");

let city = document.querySelector(".city").textContent;
const APIKEY = "fe527730bda744848e062946251307";

function isNight(hour) {
  return hour >= 18 || hour < 6;
}

function getWeatherByCity(city) {
  let URL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${city}&days=4`;
  fetch(URL)
    .then((res) => res.json())
    .then((data) => {
      const location = data.location;
      const localHour = new Date(location.localtime).getHours();
      const current = data.current;
      const forecast = data.forecast;
      const nightMode = isNight(localHour);

      const mode = nightMode ? "night" : "day";
      if (nightMode) {
        body.dataset.mode = mode;
        card.dataset.mode = mode;
        nav.dataset.mode = mode;
        burger.dataset.mode = mode;
        kota.dataset.mode = mode;
        detailsTop.dataset.mode = mode;
        tombol.dataset.mode = mode;
        line.dataset.mode = mode;
        forecastItem.forEach((item) => {
          item.dataset.mode = mode;
        });
      } else {
        body.dataset.mode = mode;
        card.dataset.mode = mode;
        nav.dataset.mode = mode;
        burger.dataset.mode = mode;
        kota.dataset.mode = mode;
        detailsTop.dataset.mode = mode;
        tombol.dataset.mode = mode;
        line.dataset.mode = mode;
        forecastItem.forEach((item) => {
          item.dataset.mode = mode;
        });
      }

      document.querySelector(
        ".weather-icon"
      ).innerHTML = `<img src="https:${current.condition.icon}" alt="cuaca">`;
      document.querySelector(".temperatur").textContent = `${current.temp_c}°C`;
      document.querySelector(".humidity").textContent = `${current.humidity}%`;
      document.querySelector(".wind").textContent = `${current.wind_kph}km/h`;

      updateForecast(forecast.forecastday.slice(1, 4));

      document.querySelector(".date").textContent =
        new Date().toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
        });
    })

    .catch((err) => {
      console.error(err);
    });
}

function updateForecast(days) {
  days.forEach((day, index) => {
    const label = new Date(day.date).toLocaleDateString("id-ID", {
      weekday: "long",
    });
    if (forecastItem[index]) {
      forecastItem[index].querySelector(".weather-day").textContent = label;
      forecastItem[index].querySelector(
        ".weather-icon"
      ).innerHTML = `<img src="https:${day.day.condition.icon}" alt="icon">`;
    }
    forecastItem[index].querySelector(
      ".temperatur-card"
    ).textContent = `${day.day.avgtemp_c}°C`;
  });
}

function darkMode() {
  a = !a;
  const mode = a ? "night" : "day";
  body.dataset.mode = mode;
  card.dataset.mode = mode;
  nav.dataset.mode = mode;
  burger.dataset.mode = mode;
  kota.dataset.mode = mode;
  detailsTop.dataset.mode = mode;
  tombol.dataset.mode = mode;
  line.dataset.mode = mode;
  forecastItem.forEach((item) => {
    item.dataset.mode = mode;
  });
}

window.onload = () => {
  getWeatherByCity(city);
};
