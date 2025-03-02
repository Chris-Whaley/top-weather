import "./style.css";

const today = document.querySelector("#day-0");
const tomorrow = document.querySelector("#day-1");
const dayAfterTomorrow = document.querySelector("#day-2");
let location = "Ipswich MA";
let daysData = [];

async function getWeather(location) {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/ipswich%2Cma?unitGroup=us&key=PDVFP546BCMAPU7PB3QD3GW5Q&contentType=json",
    { mode: "cors" }
  );

  const weather = await response.json();
  console.log(weather);

  for (let index = 0; index < 3; index++) {
    const dayData = {
      dayNumber: index,
      dayDate: weather.days[index].datetime,
      icon: weather.days[index].icon,
      conditions: weather.days[index].conditions,
      Hi: weather.days[index].tempmax,
      Lo: weather.days[index].tempmin,
    };
    daysData.push(dayData);
    console.log(daysData);
  }

  today.textContent = weather.days[0].conditions;
  tomorrow.textContent = weather.days[1].conditions;
  dayAfterTomorrow.textContent = weather.days[2].conditions;
}

getWeather(location);
