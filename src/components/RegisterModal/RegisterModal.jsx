import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onRegister, onClose, onLoginClick }) => {
  const { formData, handleInputChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    onRegister(formData)
      .then(() => {
        resetForm();
      })
      .catch(() => {
        setError("Failed to register. Please try again.");
      });
  };

  const isFormValid =
    formData.name.trim().length >= 1 &&
    formData.name.trim().length <= 30 &&
    formData.avatar.trim().length > 0 &&
    /^https?:\/\/.+\..+/.test(formData.avatar.trim()) &&
    formData.email.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.password.trim().length >= 6;

  // Move the submit button into our custom container after render
  useEffect(() => {
    if (isOpen) {
      const form = document.querySelector(".modal__form");
      const submitButton = form?.querySelector(".modal__submit");
      const buttonRow = form?.querySelector(".modal__buttons-row");

      if (submitButton && buttonRow && !buttonRow.contains(submitButton)) {
        buttonRow.insertBefore(submitButton, buttonRow.firstChild);
      }
    }
  }, [isOpen, isFormValid]);

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      {error && (
        <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
      )}
      <label htmlFor="registerName" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="registerName"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="registerAvatar" className="modal__label">
        Avatar
        <input
          type="url"
          className="modal__input"
          id="registerAvatar"
          name="avatar"
          placeholder="Avatar URL"
          required
          value={formData.avatar}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="registerEmail" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="registerEmail"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="registerPassword" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          id="registerPassword"
          name="password"
          placeholder="Password"
          required
          minLength="6"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      <div className="modal__buttons-row">
        <button type="button" className="modal__link" onClick={onLoginClick}>
          or Log In
        </button>
      </div>
    </ModalWithForm>
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default RegisterModal;
