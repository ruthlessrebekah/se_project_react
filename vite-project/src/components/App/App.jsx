import { useEffect, useState } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [previousWeatherSelection, setPreviousWeatherSelection] = useState("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Form handling functions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRadioClick = (value) => {
    if (formData.weather === value && previousWeatherSelection === value) {
      // If clicking the same selected radio button, uncheck it
      setFormData((prev) => ({ ...prev, weather: "" }));
      setPreviousWeatherSelection("");
    } else {
      // Otherwise, select the new option
      setPreviousWeatherSelection(formData.weather);
      setFormData((prev) => ({ ...prev, weather: value }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Reset form after submission
    setFormData({ name: "", imageUrl: "", weather: "" });
    setPreviousWeatherSelection("");
    closeActiveModal();
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <Footer />
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              id="hot"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="hot"
              checked={formData.weather === "hot"}
              onClick={() => handleRadioClick("hot")}
              onChange={() => {}} // Controlled by onClick
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="warm"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="warm"
              checked={formData.weather === "warm"}
              onClick={() => handleRadioClick("warm")}
              onChange={() => {}} // Controlled by onClick
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              id="cold"
              type="radio"
              className="modal__radio-input"
              name="weather"
              value="cold"
              checked={formData.weather === "cold"}
              onClick={() => handleRadioClick("cold")}
              onChange={() => {}} // Controlled by onClick
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
