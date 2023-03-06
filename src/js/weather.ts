import cities from "../cities.json";

const apiKey = "ea1edd8bac1fb60528178e5f349f03e0";
const weatherCity = document.querySelector(".weather-city");
const weatherTemp = document.querySelector(".weather-temp");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDesc = document.querySelector(".weather-description");

//Get geolocation latitude and longitude;
export function successFunction(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let latLongArr = [lat, long];
  weatherCity!.innerHTML = getCityNameFromLocation(latLongArr) ?? "";

  fetchWeatherData([lat, long]);
}

export function errorFunction() {
  console.log("no current location");
}

function getCityNameFromLocation([lat, long]: number[]) {
  const foundCity = cities.find((city) => {
    const latDifference = city.latitude - lat;
    const longDifference = city.longitude - long;
    const error = 0.05;
    return latDifference < error && latDifference > -1 * error && longDifference < error && longDifference > -1 * error;
  });
  if (foundCity) {
    return foundCity.name;
  }
}

export const barcelona = [41.38879, 2.15899];

export async function fetchWeatherData(cityAndCountry: any[]) {
  const [lat, long] = cityAndCountry;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&lang=ca&units=metric`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();
  console.log(weatherData);
  weatherCity!.innerHTML = weatherData.name;
  weatherTemp!.innerHTML = weatherData.main.temp.toFixed(0) + "ºC";
  weatherDesc!.innerHTML = weatherData.weather[0].main;
  console.log(weatherData.weather[0].main);
  setWeatherIcon(weatherData.weather[0].icon);
}

function setWeatherIcon(code) {
  (<HTMLImageElement>weatherIcon)!.src = `http://openweathermap.org/img/wn/${code}@2x.png`;
}
