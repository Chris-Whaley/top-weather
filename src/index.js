import "./style.css";

import { populateDays, updateHeader } from "./dom.js";

const location = "Ipswich ma";
let locationFormatted;
let daysData = [];

async function getWeather(location) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=PDVFP546BCMAPU7PB3QD3GW5Q&contentType=json`,
    { mode: "cors" }
  );

  const weather = await response.json();

  console.log(weather);

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
  }

  daysData.forEach((element) => {
    populateDays(element);
  });

  locationFormatted = weather.resolvedAddress.split(",", 1)[0];
  updateHeader(daysData[0].dayDate, locationFormatted);

  // updateFooter()
}

getWeather(location);

// function getLocation() {
//   const location = this.search.value;
//   getWeather(location);
// }

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

export { getWeather };
