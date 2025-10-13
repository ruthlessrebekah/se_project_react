import "./App.css";

// React imports
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

// Utils/API
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  likeItem,
  unlikeItem,
} from "../../utils/api";
import { coordinates, apiKey } from "../../utils/constants";
import { signup, signin, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    temp: { F: 999, C: 999 },
    city: "",
    weatherType: "",
    isDay: true,
    condition: "sunny",
  });

  const [isWeatherDataLoaded, setIsWeatherDataLoaded] = useState(false);

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [itemToDelete, setItemToDelete] = useState(null);

  // Authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleCardDelete = (card) => {
    setItemToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleDeleteConfirm = () => {
    deleteItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        closeActiveModal();
        setItemToDelete(null);
      })
      .catch((err) => {
        // Handle delete error silently or show user feedback
      });
  };
  const handleDeleteCancel = () => {
    setActiveModal("preview");
    setItemToDelete(null);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  // Authentication handlers
  const handleRegister = (userData) => {
    return signup(userData)
      .then((res) => {
        // After successful registration, automatically sign the user in
        return signin({ email: userData.email, password: userData.password });
      })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          // Fetch user data using the token
          return checkToken(res.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogin = (userData) => {
    return signin(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);
          // Fetch user data using the token
          return checkToken(res.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        closeActiveModal();
      })
      .catch((err) => {
        throw err;
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleEditProfile = (userData) => {
    return updateProfile(userData)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        throw err;
      });
  };

  const onAddItem = (item) => {
    return addItem(item)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch((err) => {
        throw err; // rethrow so the modal can catch it
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        likeItem(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => {
            // Handle like error silently
          })
      : // if not, send a request to remove the user's id from the card's likes array
        unlikeItem(id)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => {
            // Handle unlike error silently
          });
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
        setIsWeatherDataLoaded(true);
      })
      .catch((err) => {
        // Set fallback weather data so app can still function
        setWeatherData({
          temp: { F: 999, C: 999 },
          city: "Unknown Location",
          weatherType: "clear",
          isDay: true,
          condition: "sunny",
        });
        setIsWeatherDataLoaded(true);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        // Handle items fetch error silently
      });
  }, []);

  // Check for existing token on app load
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((user) => {
          setIsLoggedIn(true);
          setCurrentUser(user);
          setIsLoading(false);
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Global double-click handler for text selection
  useEffect(() => {
    const handleDoubleClick = (e) => {
      // For input and textarea elements, select all text
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
        e.target.select();
      }
      // For other text elements, select the text content
      else if (e.target.textContent && e.target.textContent.trim() !== "") {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(e.target);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    };

    document.addEventListener("dblclick", handleDoubleClick);

    return () => {
      document.removeEventListener("dblclick", handleDoubleClick);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{
          currentTemperatureUnit,
          setCurrentTemperatureUnit,
          handleToggleSwitchChange,
        }}
      >
        <div className="page">
          {!isWeatherDataLoaded || isLoading ? (
            <div className="page__loading">Loading...</div>
          ) : (
            <>
              <div className="page__content">
                <Header
                  handleAddClick={handleAddClick}
                  handleRegisterClick={handleRegisterClick}
                  handleLoginClick={handleLoginClick}
                  handleLogout={handleLogout}
                  weatherData={weatherData}
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Main
                        weatherData={weatherData}
                        handleCardClick={handleCardClick}
                        clothingItems={clothingItems}
                        onCardLike={handleCardLike}
                      />
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute loggedIn={isLoggedIn}>
                        <Profile
                          handleCardClick={handleCardClick}
                          handleAddClick={handleAddClick}
                          clothingItems={clothingItems}
                          currentUser={currentUser}
                          handleEditProfileClick={handleEditProfileClick}
                          onCardLike={handleCardLike}
                          handleLogout={handleLogout}
                        />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
              <Footer />
              <AddItemModal
                isOpen={activeModal === "add-garment"}
                onAddItem={onAddItem}
                onClose={closeActiveModal}
              />
              <ItemModal
                activeModal={activeModal}
                card={selectedCard}
                onClose={closeActiveModal}
                onDelete={handleCardDelete}
              />
              <RegisterModal
                isOpen={activeModal === "register"}
                onRegister={handleRegister}
                onClose={closeActiveModal}
                onLoginClick={() => setActiveModal("login")}
              />
              <LoginModal
                isOpen={activeModal === "login"}
                onLogin={handleLogin}
                onClose={closeActiveModal}
                onRegisterClick={() => setActiveModal("register")}
              />
              <EditProfileModal
                isOpen={activeModal === "edit-profile"}
                onEditProfile={handleEditProfile}
                onClose={closeActiveModal}
              />
              <ConfirmationModal
                isOpen={activeModal === "confirm-delete"}
                onClose={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
              />
            </>
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
