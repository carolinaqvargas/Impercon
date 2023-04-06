//https://openweathermap.org/current#name

const cidade = document.querySelector(".cidade");
const data = document.querySelector(".data");
const icon = document.querySelector(".icon");
const temperatura = document.querySelector(".temperatura");
const tempText = document.querySelector(".tempText");
const humidadeText = document.querySelector(".humidadeText");
const inputSearch = document.querySelector(".form-control");
const buttonSearch = document.querySelector(".input-group-text");


const api = {
  key: "64ed82577ced7f69cb1687f0ce536131",
  base: "https://api.openweathermap.org/data/2.5/",
  lang: "pt_br",
  units: "metric",
};

// Geolocation start 
window.addEventListener("load", () => {
  //if ("geolocation" in navigator)
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else {
    alert("navegador não suporta geolozalicação");
  }
  function setPosition(position) {
    console.log(position);
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    coordResults(lat, long);
  }
  function showError(error) {
    alert(`erro: ${error.message}`);
  }
});

function coordResults(lat, long) {
  fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      displayResults(response);
    });
}
// Geolocation end 

buttonSearch.addEventListener("click", function () {
  searchResults(inputSearch.value);
});

inputSearch.addEventListener("keypress", enter);
function enter(event) {
  key = event.keyCode;
  if (key === 13) {
    searchResults(inputSearch.value);
  }
}

function searchResults(cidade) {
  fetch(`${api.base}weather?q=${cidade}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`http error: status ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      alert(error.message);
    })
    .then((response) => {
      displayResults(response);
    });
}
function displayResults(weather) {
  console.log(weather);
}

function displayResults(weather) {
  console.log(weather);

  cidade.innerText = `${weather.name}`;

  let now = new Date();
  data.innerText = dateBuilder(now);

  let iconName = weather.weather[0].icon;
  icon.innerHTML = `<img src="images/icons/${iconName}.png"/>`;

  let temperature = `${Math.round(weather.main.temp)}`;
  temperatura.innerHTML = temperature;

  tempText.innerHTML = capitalizeFirstLetter(weather.weather[0].description);
  humidadeText.innerHTML = `Humidade: ${Math.round(weather.main.humidity)}%`;
}

function dateBuilder(d) {
  let days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
  let months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  let day = days[d.getDay()]; //getDay: 0-6
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}