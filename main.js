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

function getIconEmoji(code, isNight) {
  if ([1000].includes(code)) return isNight ? "🌙" : "☀️";
  if ([1003].includes(code)) return "⛅";
  if ([1006, 1008].includes(code)) return "☁️";
  if ([1030, 1135, 1147].includes(code)) return "🌫️";
  if (
    [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1243, 1246].includes(
      code
    )
  )
    return "🌧️";
  if ([1066, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258].includes(code))
    return "🌨️";
  if ([1069, 1204, 1207, 1249, 1252].includes(code)) return "🌨️";
  if ([1072, 1168, 1171, 1198, 1201].includes(code)) return "🌨️";
  if ([1087, 1273, 1276].includes(code)) return "⛈️";
  if ([1114, 1117].includes(code)) return "❄️";
  if ([1135, 1147].includes(code)) return "🌫️";
  if ([1009].includes(code)) return "☁️";
  if ([1150, 1153, 1180, 1183].includes(code)) return "🌦️";
  if ([1186, 1189].includes(code)) return "🌧️";
  if ([1192, 1195, 1243, 1246].includes(code)) return "🌧️";
  if ([1249, 1252].includes(code)) return "🌧️";
  if ([1198, 1201].includes(code)) return "🌨️";
  if ([1204, 1207].includes(code)) return "🌨️";
  if ([1210, 1213, 1216, 1219, 1255, 1258].includes(code)) return "🌨️";
  if ([1222, 1225].includes(code)) return "❄️";
  if ([1237, 1261, 1264].includes(code)) return "🧊";
  if ([1240, 1243].includes(code)) return "🌧️";
  if ([1246].includes(code)) return "🌧️";
  if ([1249, 1252].includes(code)) return "🌨️";
  if ([1255, 1258].includes(code)) return "🌨️";
  if ([1261, 1264].includes(code)) return "🧊";
  if ([1273, 1276].includes(code)) return "⛈️";
  if ([1279, 1282].includes(code)) return "⛈️";
  return "🌤️";
}

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
