// date & time
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let day = days[now.getDay()];
let date = now.getDate();
let month = months[now.getMonth()];
let year = now.getFullYear();

function time(date) {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day} ${date} ${month} ${year}`;

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = time(date);

// end of date and time

function search(city) {
  let apiKey = "0942ec9e5ec8ffc97891eab6978cd978";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}

// search bar
function handleSumbit(event) {
  event.preventDefault();
  let city = document.querySelector("#citysearch").value;
  search(city);
}

function showTemperature(response) {
  console.log(response.data.main.temp);
  console.log(response.data.name);

  let h1 = document.querySelector("h1");
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;

  h1.innerHTML = `${temperature}°c in ${city}`;

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

// current location
function getCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "0942ec9e5ec8ffc97891eab6978cd978";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  console.log(lat);
  console.log(lon);

  axios.get(apiUrl).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(getCurrentPosition);
//

function changeTemp(event) {
  let temp = document.querySelector("#temp");
  temp.innerHTML = "66f";
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSumbit);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", changeTemp);

let showCurrentLocation = document.querySelector("button");
showCurrentLocation.addEventListener("click", getCurrentPosition);

search("Los Angeles");
