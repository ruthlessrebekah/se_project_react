import ClothesSection from "../ClothesSection/ClothesSection";
import PropTypes from "prop-types";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  handleCardClick,
  handleAddClick,
  clothingItems,
  handleEditProfileClick,
  onCardLike,
  handleLogout,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar
          handleEditProfileClick={handleEditProfileClick}
          handleSignOut={handleLogout}
        />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

Profile.propTypes = {
  handleCardClick: PropTypes.func.isRequired,
  handleAddClick: PropTypes.func.isRequired,
  clothingItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleEditProfileClick: PropTypes.func.isRequired,
  onCardLike: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Profile;
