import { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import whiteCloseIcon from "../../assets/white-close-icon.png";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const [imageError, setImageError] = useState(false);

  // Check if the current user is the owner of the current clothing item
  const isOwn = currentUser && card.owner === currentUser._id;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = () => {
    setImageError(true);
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

  // Reset image error when card changes
  useEffect(() => {
    setImageError(false);
  }, [card]);

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
        {imageError ? (
          <div className="modal__image-placeholder">
            <p className="modal__image-error">Image failed to load</p>
            <p className="modal__image-name">{card.name}</p>
          </div>
        ) : (
          <img
            src={card.imageUrl}
            alt={card.name}
            className="modal__image"
            onError={handleImageError}
          />
        )}
        <div className="modal__footer">
          <div className="modal__caption-row">
            <h2 className="modal__caption">{card.name}</h2>
            {isOwn && (
              <button
                className="modal__delete-btn"
                type="button"
                onClick={() => onDelete(card)}
              >
                Delete item
              </button>
            )}
          </div>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

ItemModal.propTypes = {
  activeModal: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  card: PropTypes.shape({
    _id: PropTypes.string,
    owner: PropTypes.string,
    name: PropTypes.string,
    imageUrl: PropTypes.string,
    weather: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ItemModal;
