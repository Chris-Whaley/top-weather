import { forEach } from "lodash";

const todayContainer = document.querySelector("#day-0");
const tomorrowContainer = document.querySelector("#day-1");
const overmorrowContainer = document.querySelector("#day-2");

function printElements() {
  let dayIDs = [];
  dayContainers.forEach((element) => {
    for (let index = 0; index < element.children.length; index++) {
      const elementID = element.children[index].id;
      dayIDs.push(elementID);
    }
  });
}

export default function populateDOM(data) {
  const { dayNumber, dayDate, icon, conditions, Hi, Lo } = data;

  const dayHi = document.querySelector(`#day-${dayNumber}-high-temp`);
  const dayLo = document.querySelector(`#day-${dayNumber}-low-temp`);

  dayHi.textContent = Hi;
  dayLo.textContent = Lo;
}
