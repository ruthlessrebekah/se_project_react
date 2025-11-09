import "./ClothesSection.css";
import PropTypes from "prop-types";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleCardClick,
  handleAddClick,
  clothingItems,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  // Filter clothing items to show only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id
  );
  return (
    <div className="clothes-section">
      <div className="clothes-section__header-row">
        <p className="clothes-section__title">Your items</p>
        <button
          className="clothes-section__add-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__cards__list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={handleCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

ClothesSection.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  handleAddClick: PropTypes.func.isRequired,
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      // Add other item properties as needed
    })
  ).isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default ClothesSection;
