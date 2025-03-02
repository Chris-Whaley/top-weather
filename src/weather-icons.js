const weatherIcons = {
  // Key = icon value from api call
  // Value = image filename
  snow: "Heavy-Snow.gif",
  rain: "Rain.gif",
  fog: "Fog.gif",
  wind: "Windy.gif",
  cloudy: "Cloudy.gif",
  partly_cloudy_day: "Partly-Cloudy.gif",
  partly_cloudy_night: "Partly-Clear.gif",
  clear_day: "Sunny.gif",
  clear_night: "Clear.gif",
};

export default function retrieveIcon(weatherType) {
  const formattedIcon = weatherType.replaceAll("-", "_");

  return weatherIcons[formattedIcon];
}
