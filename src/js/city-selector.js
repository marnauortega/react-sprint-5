import cities from "../cities.json";
import { fetchWeatherData } from "./weather";

export const createCitiesPage = () => {
  const appendCities = () => {
    const topCities = cities.slice(0, 40);
    topCities.forEach((c) => {
      const citySelector = document.querySelector(".cities");

      citySelector.insertAdjacentHTML(
        "beforeend",
        `
    <p class="city hover">${c.name}</p>
    `
      );
    });
  };

  const addfetcherFunctions = () => {
    const topCityButtons = document.querySelectorAll(".city");
    topCityButtons.forEach((c) => {
      c.addEventListener("click", () => {
        const selectedCity = cities.find((city) => city.name === c.innerHTML);
        const latAndLong = [selectedCity.latitude, selectedCity.longitude];
        fetchWeatherData(latAndLong);
      });
    });
  };

  appendCities();
  addfetcherFunctions();
};
