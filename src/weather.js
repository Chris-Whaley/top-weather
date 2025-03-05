import { populateDays, updateHeader, updateFooter } from "./dom.js";
import { footerCities } from "./weather-lookup.js";

async function getLocalWeather(location) {
  let locationInput;
  let locationFormatted;
  let daysData = [];
  let response;
  let weather;

  if (location === null || location === undefined) {
    locationInput = "Ipswich ma";
  } else {
    locationInput = location;
  }

  try {
    weather = await fetchWeather(locationInput);
    loadDailyWeather(weather);
    populateHeader(weather);
    populateFooter(weather);
  } catch (error) {
    // alert("error in get local weather");
    console.error(error);
  }

  function loadDailyWeather(data) {
    for (let index = 0; index <= 4; index++) {
      const dayData = {
        dayNumber: index,
        dayDate: weather.days[index].datetime,
        icon: weather.days[index].icon,
        conditions: weather.days[index].conditions,
        Hi: weather.days[index].tempmax,
        Lo: weather.days[index].tempmin,
      };

      daysData.push(dayData);

      populateDays(dayData);
    }
  }

  function populateHeader(data) {
    locationFormatted = data.resolvedAddress.split(",", 1)[0];
    updateHeader(data.days[0].datetime, locationFormatted);
  }

  function populateFooter(data) {
    locationFormatted = data.resolvedAddress.split(",", 2)[0];
    console.log(locationFormatted);
    console.log(data.days[0]);
    updateFooter(data.days[0].datetime, locationFormatted);
  }
}

async function getNationalWeather() {
  const locations = footerCities;
  let cityData;
  let nationalData = [];

  for (const city of footerCities) {
    cityData = await fetchWeather(city);
    nationalData.push(cityData);
  }

  updateFooter(nationalData);
}

async function fetchWeather(location) {
  let response;
  let weather;
  try {
    response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=PDVFP546BCMAPU7PB3QD3GW5Q&contentType=json`,
      { mode: "cors" }
    );
    weather = await response.json();
    return weather;
  } catch (error) {
    alert("Location not found. Please search again");
  }
}

export { getLocalWeather, getNationalWeather };
