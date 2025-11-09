import "./SideBar.css";
import { useContext } from "react";
import PropTypes from "prop-types";
import CurrentUserContext from "../../contexts/CurrentUserContext";

// SideBar component for user profile and actions
function SideBar({ handleEditProfileClick, handleSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <div className="sidebar__user-info">
          {currentUser?.avatar ? (
            <img
              className="sidebar__avatar"
              src={currentUser.avatar}
              alt="User Avatar"
            />
          ) : (
            <span className="sidebar__avatar sidebar__avatar_placeholder">
              {currentUser?.name?.toUpperCase().charAt(0) || "U"}
            </span>
          )}
          <p className="sidebar__username">
            {currentUser?.name || "User Name"}
          </p>
        </div>
        <button
          className="sidebar__edit-btn"
          type="button"
          onClick={handleEditProfileClick}
        >
          Change profile data
        </button>
        <button
          className="sidebar__signout-btn"
          type="button"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </div>
    </aside>
  );
}

SideBar.propTypes = {
  handleEditProfileClick: PropTypes.func.isRequired,
  handleSignOut: PropTypes.func.isRequired,
};

export default SideBar;
