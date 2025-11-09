import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import PropTypes from "prop-types";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
            ? weatherData.temp.F
            : weatherData.temp.C}
          °{currentTemperatureUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.weatherType;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                  onCardLike={onCardLike}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

Main.propTypes = {
  weatherData: PropTypes.shape({
    temp: PropTypes.shape({
      F: PropTypes.number.isRequired,
      C: PropTypes.number.isRequired,
    }).isRequired,
    weatherType: PropTypes.string.isRequired,
  }).isRequired,
  handleCardClick: PropTypes.func.isRequired,
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      weather: PropTypes.string.isRequired,
    })
  ).isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default Main;
