import "./WeatherCard.css";
import { useContext } from "react";
import PropTypes from "prop-types";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

const WeatherCard = ({ weatherData }) => {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}
        °{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherData.isDay ? "day" : "night"} time ${
          weatherData.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
};

WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    temp: PropTypes.shape({
      F: PropTypes.number.isRequired,
      C: PropTypes.number.isRequired,
    }).isRequired,
    isDay: PropTypes.bool.isRequired,
    condition: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherCard;
