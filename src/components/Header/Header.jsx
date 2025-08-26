import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import menu from "../../assets/menu.png";
import MenuModal from "../MenuModal/MenuModal";
import { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData, username = "User Name" }) {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const handleMenuClick = () => {
    setIsMenuModalOpen(true);
  };

  const closeMenuModal = () => {
    setIsMenuModalOpen(false);
  };

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        closeMenuModal();
      }
    };

    if (isMenuModalOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isMenuModalOpen]);

  return (
    <>
      <header className="header">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>
        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
        <button
          className="header__menu-btn"
          type="button"
          onClick={handleMenuClick}
        >
          <img className="header__menu-icon" src={menu} alt="Menu" />
        </button>
        <div className="header__nav">
          <ToggleSwitch />
          <button
            className="header__add-clothes-btn"
            type="button"
            onClick={handleAddClick}
          >
            + Add clothes
          </button>
          <Link to="/profile" className="header__profile-link">
            <div className="header__user-container">
              <p className="header__username">{username}</p>
              {avatar ? (
                <img
                  className="header__user-avatar"
                  src={avatar}
                  alt="User Avatar"
                />
              ) : (
                <span className="header__avatar header__avatar_none">
                  {username?.toUpperCase().charAt(0) || ""}
                </span>
              )}
            </div>
          </Link>
        </div>
      </header>

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={closeMenuModal}
        onAddClick={handleAddClick}
      />
    </>
  );
}

export default Header;
