import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { handleToggleSwitchChange, currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );
  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-switch__checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span className="toggle-switch__circle"></span>
      <span className="toggle-switch__labels">
        <span
          className={`toggle-switch__text toggle-switch__text_F ${
            currentTemperatureUnit === "F"
              ? "toggle-switch__text_color_white"
              : ""
          }`}
        >
          F
        </span>
        <span
          className={`toggle-switch__text toggle-switch__text_C ${
            currentTemperatureUnit === "C"
              ? "toggle-switch__text_color_white"
              : ""
          }`}
        >
          C
        </span>
      </span>
    </label>
  );
}
