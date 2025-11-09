import "./MenuModal.css";
import closeIcon from "../../assets/black-close-icon.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function MenuModal({
  isOpen,
  onClose,
  onAddClick,
  isLoggedIn,
  onRegisterClick,
  onLoginClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleUsernameClick = () => {
    navigate("/profile");
    onClose();
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

        {isLoggedIn ? (
          <>
            <div className="menu-modal__user-section">
              <div className="menu-modal__user-container">
                <button
                  className="menu-modal__username"
                  type="button"
                  onClick={handleUsernameClick}
                >
                  {currentUser?.name || "User"}
                </button>
                {currentUser?.avatar ? (
                  <img
                    className="menu-modal__user-avatar"
                    src={currentUser.avatar}
                    alt="User Avatar"
                  />
                ) : (
                  <span className="menu-modal__avatar menu-modal__avatar_none">
                    {currentUser?.name?.toUpperCase().charAt(0) || "U"}
                  </span>
                )}
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

            <div className="menu-modal__temperature-switch">
              <ToggleSwitch />
            </div>
          </>
        ) : (
          <>
            <div className="menu-modal__temperature-switch">
              <ToggleSwitch />
            </div>

            <button
              className="menu-modal__signup-btn"
              type="button"
              onClick={() => {
                onRegisterClick();
                onClose();
              }}
            >
              Sign Up
            </button>

            <button
              className="menu-modal__login-btn"
              type="button"
              onClick={() => {
                onLoginClick();
                onClose();
              }}
            >
              Log In
            </button>
          </>
        )}
      </div>
    </div>
  );
}

MenuModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onRegisterClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

export default MenuModal;
