import { populateDays, updateHeader } from "./dom.js";

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
    response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationInput}?unitGroup=us&key=PDVFP546BCMAPU7PB3QD3GW5Q&contentType=json`,
      { mode: "cors" }
    );
    weather = await response.json();
    console.log(weather);
    loadDailyWeather(weather);
    populateHeader(weather);
  } catch (error) {
    alert("Location not found. Please search again");
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
  // Populate 5 day forecast
  // daysData.forEach((element) => {
  //   populateDays(element);
  // });
  function populateHeader(data) {
    locationFormatted = data.resolvedAddress.split(",", 1)[0];
    updateHeader(data.days[0].datetime, locationFormatted);
  }
  // Populate header
  // locationFormatted = weather.resolvedAddress.split(",", 1)[0];
  // updateHeader(daysData[0].dayDate, locationFormatted);
  //   }

  // updateFooter()
}

// async function to pull in data for list of cities
// need:
// datetime
// location (city, state from resolved address)
// temp
// conditions
// wind
// feels like temp

export { getLocalWeather };
