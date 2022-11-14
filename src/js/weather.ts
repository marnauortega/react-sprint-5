import cities from "../cities.json";

const apiKey = "ea1edd8bac1fb60528178e5f349f03e0";

//Get geolocation latitude and longitude;
export function successFunction(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let latLongArr = [lat, long];
  console.log(getCityNameFromLocation(latLongArr));
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

const weatherText = document.querySelector(".weather-text");

export async function fetchWeatherData(cityAndCountry: any[]) {
  const [lat, long] = cityAndCountry;

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&lang=ca`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();
  weatherText!.innerHTML = weatherData.weather[0].description;
}
