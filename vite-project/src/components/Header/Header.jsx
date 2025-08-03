import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import menu from "../../assets/menu.png";
import MenuModal from "../MenuModal/MenuModal";
import { useState, useEffect } from "react";

function Header({ handleAddClick, weatherData }) {
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
        <img className="header__logo" src={logo} alt="Logo" />
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
        <button
          className="header__add-clothes-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">User Name</p>
          <img className="header__user-avatar" src={avatar} alt="User Avatar" />
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
