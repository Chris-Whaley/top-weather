import { format } from "date-fns";
import { retrieveIcon, convertWindDegreesToCompass } from "./weather-lookup.js";
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

function updateFooter(data) {
  const footerTime = document.querySelector("#footer-time");
  const footerLocation = document.querySelector("#footer-location");
  const footerIcon = document.querySelector("#footer-icon");
  const footerTemp = document.querySelector("#footer-temp");
  const footerConditions = document.querySelector("#footer-conditions");
  const footerWind = document.querySelector("#footer-wind");
  const footerFeels = document.querySelector("#footer-feels");
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let iconFile;

  // footer shows current hour's data
  const currentHourlyData = data.hours[currentHour];

  // TODO: round the current time to join to the data's time for footer data
  const formattedTimeString = getDateFromHours(currentHourlyData.datetime);

  footerTime.textContent = format(formattedTimeString, "h:00aaaaa");
  footerLocation.textContent = data.location;
  iconFile = retrieveIcon(data.icon);
  footerIcon.src = iconFile;
  footerTemp.textContent = Math.round(currentHourlyData.temp);
  footerConditions.textContent = currentHourlyData.conditions;
  footerWind.textContent = convertWindDegreesToCompass(
    currentHourlyData.winddir
  );
  footerWind.textContent += " " + Math.round(currentHourlyData.windspeed);
  footerFeels.textContent += " " + Math.round(currentHourlyData.feelslike);

  function getDateFromHours(time) {
    time = time.split(":");
    let now = new Date();
    return now.setHours(time[0], time[1], 0, 0);
  }
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
