import { useEffect } from "react";
import whiteCloseIcon from "../../assets/white-close-icon.png";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
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

    if (activeModal === "preview") {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [activeModal, onClose]);

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button
          type="button"
          className="modal__close modal__close_type_preview"
          onClick={onClose}
        >
          <img src={whiteCloseIcon} alt="Close" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__caption-row">
            <h2 className="modal__caption">{card.name}</h2>
            <button
              className="modal__delete-btn"
              type="button"
              onClick={() => onDelete(card)}
            >
              Delete
            </button>
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
