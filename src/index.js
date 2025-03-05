import "./style.css";
import { getLocalWeather, getNationalWeather } from "./weather.js";

getLocalWeather();
getNationalWeather();

if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}

// TODO: the transition the data in the footer
