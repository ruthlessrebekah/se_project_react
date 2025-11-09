import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onLogin, onClose, onRegisterClick }) => {
  const { formData, handleInputChange, resetForm } = useForm({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsPasswordIncorrect(false);

    onLogin(formData)
      .then(() => {
        resetForm();
        setError("");
        setIsPasswordIncorrect(false);
      })
      .catch(() => {
        // Always show "Incorrect password" label for any authentication error
        setError("Email or password is incorrect");
        setIsPasswordIncorrect(true);
      });
  };

  const isFormValid =
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
      title="Log In"
      buttonText="Log In"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      <label htmlFor="loginEmail" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="loginEmail"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="loginPassword" className="modal__label">
        {isPasswordIncorrect ? "Incorrect password" : "Password"}
        <input
          type="password"
          className="modal__input"
          id="loginPassword"
          name="password"
          placeholder="Password"
          required
          minLength="6"
          value={formData.password}
          onChange={handleInputChange}
        />
      </label>
      {error && <div className="modal__error">{error}</div>}
      <div className="modal__buttons-row">
        <button type="button" className="modal__link" onClick={onRegisterClick}>
          or Sign Up
        </button>
      </div>
    </ModalWithForm>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
};

export default LoginModal;
