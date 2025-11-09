import { useEffect } from "react";
import PropTypes from "prop-types";
import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  isSubmitDisabled = false,
  name,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(e);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal modal_opened" onClick={handleOverlayClick}>
      <div className="modal__content modal__content_type_new-clothes">
        <h2 className="modal__title">{title}</h2>
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <form className="modal__form" name={name} onSubmit={handleSubmit}>
          {children}
          <button
            type="submit"
            className="modal__submit"
            disabled={isSubmitDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

ModalWithForm.propTypes = {
  children: PropTypes.node.isRequired,
  buttonText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitDisabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

export default ModalWithForm;
