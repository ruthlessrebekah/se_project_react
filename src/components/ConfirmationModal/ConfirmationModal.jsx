import { useEffect } from "react";
import "./ConfirmationModal.css";
import closeIcon from "../../assets/close-icon.png";

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
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
      <div className="modal__content modal__content_type_confirmation">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className="confirmation__content">
          <h2 className="confirmation__title">
            Are you sure you want to delete this item?
          </h2>
          <p className="confirmation__subtitle">This action is irreversible.</p>
          <div className="confirmation__buttons">
            <button
              type="button"
              className="confirmation__delete-btn"
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button
              type="button"
              className="confirmation__cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
