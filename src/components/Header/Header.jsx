import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import menu from "../../assets/menu.png";
import MenuModal from "../MenuModal/MenuModal";
import { useState, useEffect, useContext } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  handleRegisterClick,
  handleLoginClick,
  handleLogout,
}) {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

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

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767 && isMenuModalOpen) {
        closeMenuModal();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuModalOpen]);

  return (
    <>
      <header className="header">
        <div className="header__top-row">
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
        </div>

        {isLoggedIn ? (
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
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>
                {currentUser?.avatar ? (
                  <img
                    className="header__user-avatar"
                    src={currentUser.avatar}
                    alt="User Avatar"
                  />
                ) : (
                  <span className="header__avatar header__avatar_none">
                    {currentUser?.name?.toUpperCase().charAt(0) || "U"}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ) : (
          <div className="header__nav">
            <ToggleSwitch />
            <button
              className="header__signup-btn"
              type="button"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__signin-btn"
              type="button"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </header>

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={closeMenuModal}
        onAddClick={handleAddClick}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        onRegisterClick={handleRegisterClick}
        onLoginClick={handleLoginClick}
      />
    </>
  );
}

export default Header;
