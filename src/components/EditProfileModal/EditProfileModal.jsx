import { useState, useContext, useEffect } from "react";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ isOpen, onEditProfile, onClose }) => {
  const currentUser = useContext(CurrentUserContext);
  const { formData, handleInputChange, resetForm, setFormData } = useForm({
    name: "",
    avatar: "",
  });
  const [error, setError] = useState("");

  // Pre-populate form with current user data when modal opens
  useEffect(() => {
    if (isOpen && currentUser) {
      setFormData({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, setFormData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    onEditProfile(formData)
      .then(() => {
        resetForm();
      })
      .catch((err) => {
        setError("Failed to update profile. Please try again.");
      });
  };

  const isFormValid =
    formData.name.trim().length >= 1 &&
    formData.name.trim().length <= 30 &&
    formData.avatar.trim().length > 0 &&
    /^https?:\/\/.+\..+/.test(formData.avatar.trim());

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={!isFormValid}
    >
      {error && (
        <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
      )}
      <label htmlFor="editProfileName" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="editProfileName"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="editProfileAvatar" className="modal__label">
        Avatar
        <input
          type="url"
          className="modal__input"
          id="editProfileAvatar"
          name="avatar"
          placeholder="Avatar URL"
          required
          value={formData.avatar}
          onChange={handleInputChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
