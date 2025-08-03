import "./MenuModal.css";
import closeIcon from "../../assets/black-close-icon.png";
import avatar from "../../assets/avatar.png";

function MenuModal({ isOpen, onClose, onAddClick }) {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`menu-modal ${isOpen ? "menu-modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="menu-modal__content">
        <button className="menu-modal__close" type="button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>

        <div className="menu-modal__user-section">
          <div className="menu-modal__user-container">
            <img
              className="menu-modal__user-avatar"
              src={avatar}
              alt="User Avatar"
            />
            <p className="menu-modal__username">User Name</p>
          </div>
        </div>

        <button
          className="menu-modal__add-clothes-btn"
          type="button"
          onClick={() => {
            onAddClick();
            onClose();
          }}
        >
          + Add clothes
        </button>
      </div>
    </div>
  );
}

export default MenuModal;
