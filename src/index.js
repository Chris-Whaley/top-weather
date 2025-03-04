import "./style.css";
import { getLocalWeather } from "./weather.js";
import { populateDays, updateHeader } from "./dom.js";

// const location = "Ipswich ma";

// async function getLocalWeather(location) {
//   let locationFormatted;
//   let daysData = [];
//   let response;
//   let weather;

//   try {
//     response = await fetch(
//       `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=PDVFP546BCMAPU7PB3QD3GW5Q&contentType=json`,
//       { mode: "cors" }
//     );
//     weather = await response.json();
//     loadWeather(weather);
//   } catch (error) {
//     alert("Location not found. Please search again");
//   }

//   // console.log(response);

//   // console.log(weather);

//   function loadWeather(data) {
//     for (let index = 0; index <= 4; index++) {
//       const dayData = {
//         dayNumber: index,
//         dayDate: weather.days[index].datetime,
//         icon: weather.days[index].icon,
//         conditions: weather.days[index].conditions,
//         Hi: weather.days[index].tempmax,
//         Lo: weather.days[index].tempmin,
//       };

//       daysData.push(dayData);
//     }

//     // Populate 5 day forecast
//     daysData.forEach((element) => {
//       populateDays(element);
//     });

//     // Populate header
//     locationFormatted = weather.resolvedAddress.split(",", 1)[0];
//     updateHeader(daysData[0].dayDate, locationFormatted);
//   }

//   // updateFooter()
// }

getLocalWeather();

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

// export { getLocalWeather };

// TODO: move this get weather funciton into its own module
// TODO: add listener to index.js
// TODO: query top 30 or whatever states. the transition the data in the footer
