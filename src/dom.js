import { format } from "date-fns";
import { retrieveIcon } from "./weather-lookup.js";
import { getLocalWeather } from "./weather.js";

function populateDays(data) {
  const { dayNumber, dayDate, icon, conditions, Hi, Lo } = data;

  const dayOfWeek = document.querySelector(`#day-${dayNumber} > .day-name`);
  const iconDay = document.querySelector(`#day-${dayNumber}-icon`);
  const dayConditions = document.querySelector(
    `#day-${dayNumber} > .day-conditions`
  );
  const dayHi = document.querySelector(`#day-${dayNumber}-high-temp`);
  const dayLo = document.querySelector(`#day-${dayNumber}-low-temp`);
  let iconFile;

  dayOfWeek.textContent = format(dayDate, "EEE");
  iconFile = retrieveIcon(icon);
  iconDay.src = iconFile;
  dayConditions.textContent = conditions;
  dayHi.textContent = Math.round(Hi);
  dayLo.textContent = Math.round(Lo);
}

function updateHeader(todaysDateTime, location) {
  const todaysDay = document.querySelector("#day-of-week");
  const todaysDate = document.querySelector("#date");
  const forecastLocation = document.querySelector("#city-name");

  forecastLocation.textContent = location;

  todaysDay.textContent = format(todaysDateTime, "EEEE");
  todaysDate.textContent = format(todaysDateTime, "LLL M, yyyy");
}

// function updateFooter(data) {
//   const footerTime = document.querySelector("#footer-time");
//   const footerLocation = document.querySelector("#footer-location");
//   const footerTemp = document.querySelector("#footer-temp");
//   const footerConditions = document.querySelector("#footer-conditions");
//   const footerWind = document.querySelector("#footer-wind");
//   const footerFeels = document.querySelector("#footer-feels");
//   let counter = 0;
//   let maxCounter = data.length;

//   function cityData(data) {
//     for (let index = 0; index < maxCounter; index++) {
//       // if (index == maxCounter) {
//       //   index = 0
//       // }
//       const city = data[index];
//       footerTime.textContent = format(city.days[0].datetime, "h:00aaaaa");
//       footerLocation.textContent = city.address;
//       footerTemp.textContent = Math.round(city.days[0].temp);
//       footerConditions.textContent = city.days[0].conditions;
//       footerWind.textContent = city.days[0].winddir;
//       footerWind.textContent += " " + Math.round(city.days[0].windspeed);
//       footerFeels.textContent = Math.round(city.days[0].feelslike);
//       console.log(city);
//     }
//   }
//   cityData(data);
//   // setTimeout(() => {
//   //   cityData(data);
//   // }, secondsToMilliseconds(5));
// }

function updateFooter(data) {
  const footerTime = document.querySelector("#footer-time");
  const footerLocation = document.querySelector("#footer-location");
  const footerTemp = document.querySelector("#footer-temp");
  const footerConditions = document.querySelector("#footer-conditions");
  const footerWind = document.querySelector("#footer-wind");
  const footerFeels = document.querySelector("#footer-feels");
  const currentDate = new Date();
  const currentTime = format(currentDate, "h:00aaaaa");
  const currentHour = currentDate.getHours();
  const currentMinutes = currentDate.getMinutes();

  // TODO: round the current time to join to the data's time for footer data
  console.log("in update footer");
  footerTime.textContent = format(data.days[0].datetime, "h:00aaaaa");
  footerLocation.textContent = data.address;
  footerTemp.textContent = Math.round(data.days[0].temp);
  footerConditions.textContent = data.days[0].conditions;
  footerWind.textContent = data.days[0].winddir;
  footerWind.textContent += " " + Math.round(data.days[0].windspeed);
  footerFeels.textContent = Math.round(data.days[0].feelslike);
}

const listeners = (function (params) {
  const locationSearch = document.querySelector("#city-name");
  const closeButton = document.querySelector(".closebtn");
  const searchInput = document.querySelector('.overlay input[type="text"]');
  const searchModal = document.querySelector(".overlay-content > form");

  // open search
  locationSearch.addEventListener("click", () => {
    document.getElementById("myOverlay").style.display = "block";
  });

  // capture location search
  searchModal.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchData = searchInput.value;
    closeModal();
    getLocalWeather(searchData);
  });

  // close and reset search
  closeButton.addEventListener("click", () => {
    closeModal();
  });

  function closeModal() {
    searchModal.reset();
    document.getElementById("myOverlay").style.display = "none";
  }
})();

export { populateDays, updateHeader, updateFooter, listeners };
