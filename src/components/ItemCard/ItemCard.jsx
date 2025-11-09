import "./ItemCard.css";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import likedHeart from "../../assets/liked-heart.png";
import unlikedHeart from "../../assets/unliked-heart.png";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const [imageError, setImageError] = useState(false);

  // Check if the item was liked by the current user
  const isLiked =
    item.likes && currentUser
      ? item.likes.some((id) => id === currentUser._id)
      : false;

  // Create className for the like button based on user login status and like status
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={itemLikeButtonClassName}
            type="button"
            onClick={handleLike}
          >
            <img
              src={isLiked ? likedHeart : unlikedHeart}
              alt={isLiked ? "Liked" : "Not liked"}
              className="card__like-icon"
            />
          </button>
        )}
      </div>
      {imageError ? (
        <div className="card__image-placeholder" onClick={handleCardClick}>
          <p className="card__image-error">Image failed to load</p>
          <p className="card__image-name">{item.name}</p>
        </div>
      ) : (
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl}
          alt={item.name}
          onError={handleImageError}
        />
      )}
    </li>
  );
}

ItemCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    likes: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onCardClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
};

export default ItemCard;
