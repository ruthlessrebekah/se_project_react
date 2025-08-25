// Weather images
import sunny from "../assets/sunny.png";
import nightClear from "../assets/night-clear.png";
import cloudy from "../assets/cloudy.png";
import nightCloudy from "../assets/night-cloudy.png";
import fog from "../assets/fog.png";
import nightFog from "../assets/night-fog.png";
import rain from "../assets/rain.png";
import nightRain from "../assets/night-rain.png";
import snow from "../assets/snow.png";
import nightSnow from "../assets/night-snow.png";
import storm from "../assets/storm.png";
import nightStorm from "../assets/night-storm.png";

export const coordinates = {
  latitude: 29.424122, // Example latitude for San Antonio
  longitude: -98.493629, // Example longitude for San Antonio
};

export const apiKey = "28197888309ad2ce3543922cd674858a";

// Weather card image options
export const weatherOptions = [
  { day: true, condition: "sunny", url: sunny },
  { day: false, condition: "sunny", url: nightClear },
  { day: true, condition: "cloudy", url: cloudy },
  { day: false, condition: "cloudy", url: nightCloudy },
  { day: true, condition: "fog", url: fog },
  { day: false, condition: "fog", url: nightFog },
  { day: true, condition: "rain", url: rain },
  { day: false, condition: "rain", url: nightRain },
  { day: true, condition: "snow", url: snow },
  { day: false, condition: "snow", url: nightSnow },
  { day: true, condition: "storm", url: storm },
  { day: false, condition: "storm", url: nightStorm },
];

export const defaultWeatherOptions = {
  day: { url: sunny },
  night: { url: nightClear },
};
