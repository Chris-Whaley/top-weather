import { format } from "date-fns";
import retrieveIcon from "./weather-icons";

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

function updateHeader(todaysDateTime) {
  const todaysDay = document.querySelector("#day-of-week");
  const todaysDate = document.querySelector("#date");

  todaysDay.textContent = format(todaysDateTime, "EEEE");
  todaysDate.textContent = format(todaysDateTime, "LLL M, yyyy");
}

export { populateDays, updateHeader };
