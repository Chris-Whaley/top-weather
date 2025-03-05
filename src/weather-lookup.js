import snow from "./img/Heavy-Snow.gif";
import rain from "./img/Rain.gif";
import fog from "./img/Fog.gif";
import wind from "./img/Windy.gif";
import cloudy from "./img/Cloudy.gif";
import partly_cloudy_day from "./img/Partly-Cloudy.gif";
import partly_cloudy_night from "./img/Partly-Clear.gif";
import sunny from "./img/Sunny.gif";
import clear_night from "./img/Clear.gif";

const weatherIcons = {
  // Key = icon value from api call
  // Value = image filename
  snow: snow,
  rain: rain,
  fog: fog,
  wind: wind,
  cloudy: cloudy,
  partly_cloudy_day: partly_cloudy_day,
  partly_cloudy_night: partly_cloudy_night,
  clear_day: sunny,
  clear_night: clear_night,
};

function retrieveIcon(weatherType) {
  const formattedIcon = weatherType.replaceAll("-", "_");

  return weatherIcons[formattedIcon];
}

const footerCities = [
  "Atlanta, GA",
  "Boston, MA",
  "Chicago, IL",
  "Cleveland, OH",
  "Dallas, TX",
  "Denver, CO",
  "Detroit, MI",
  "Houston, TX",
  "Indianapolis, IN",
  "Los Angeles, CA",
  "Miami, FL",
  "Minneapolis, MN",
  "New York, NY",
  "Norfolk, VA",
  "Orlando, FL",
  "Philadelphia, PA",
  "Phoenix, AZ",
  "Pittsburgh, PA",
  "St. Louis, MO",
  "San Francisco, CA",
  "Seattle, WA",
  "Syracuse, NY",
  "Tampa, FL",
  "Washington, D.C.",
];

export { retrieveIcon, footerCities };
