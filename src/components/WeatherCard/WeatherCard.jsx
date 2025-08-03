import "./WeatherCard.css";
import cloudy from "../../assets/cloudy.png";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}°F</p>
      <img src={cloudy} alt="Cloudy" className="weather-card__image" />
    </section>
  );
}
export default WeatherCard;
