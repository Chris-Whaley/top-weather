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

// function updateFooter(data) {}

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

export { populateDays, updateHeader, listeners };
