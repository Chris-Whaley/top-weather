import { format } from "date-fns";
import retrieveIcon from "./weather-icons";

export default function populateDOM(data) {
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
  dayConditions.textContent = conditions;
  dayHi.textContent = Math.round(Hi);
  dayLo.textContent = Math.round(Lo);

  iconFile = retrieveIcon(icon);
  // console.log(iconDay);
  // console.log(iconFile);
  // iconDay.setAttribute("src", `./img/${iconFile}`);
  // iconDay.src = `./img/${iconFile}`;
  iconDay.src = iconFile;
}
