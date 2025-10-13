import { useState } from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const { formData, handleInputChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    onAddItem(formData)
      .then(() => {
        resetForm();
        onClose();
      })
      .catch((err) => {
        setError("Failed to add item. Please try again.");
      });
  };

  const isFormValid =
    formData.name.trim().length >= 1 &&
    formData.name.trim().length <= 30 &&
    formData.imageUrl.trim().length > 0 &&
    /^https?:\/\/.+\..+/.test(formData.imageUrl.trim()) &&
    formData.weather;

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      {error && (
        <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
      )}
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
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
            onChange={handleInputChange}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="warm"
            checked={formData.weather === "warm"}
            onChange={handleInputChange}
            required
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            value="cold"
            checked={formData.weather === "cold"}
            onChange={handleInputChange}
            required
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
