import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, apiKey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then(checkResponse);
};

// Map OpenWeatherMap API 'main' values to local weatherOptions keys
const weatherConditionMap = {
  clear: "sunny",
  clouds: "cloudy",
  fog: "fog",
  mist: "fog",
  haze: "fog",
  rain: "rain",
  drizzle: "rain",
  snow: "snow",
  thunderstorm: "storm",
  storm: "storm",
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = {
    F: Math.round(data.main.temp),
    C: Math.round(((data.main.temp - 32) * 5) / 9),
  };
  result.weatherType = getWeatherType(data.main.temp);
  result.isDay = isDay(data.sys, Date.now());
  // Normalize API value to local key
  const apiCondition = data.weather[0].main.toLowerCase();
  result.condition = weatherConditionMap[apiCondition] || "sunny";
  return result;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
