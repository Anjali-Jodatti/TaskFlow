import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function EditProfile({ email }) {
  const navigate = useNavigate();

  const savedProfile = JSON.parse(
    localStorage.getItem("taskflowProfile") || "{}"
  );

  const [name, setName] = useState(savedProfile.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(savedProfile.dateOfBirth || "");
  const [contact, setContact] = useState(savedProfile.contact || "");
  const [occupation, setOccupation] = useState(savedProfile.occupation || "");
  const [bio, setBio] = useState(savedProfile.bio || "");
  const [photo, setPhoto] = useState(savedProfile.photo || "");

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please select an image smaller than 2 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result);
    reader.readAsDataURL(file);
  }

  function saveProfile(e) {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter your full name.");
      return;
    }

    const profileData = {
      name: name.trim(),
      email: email || savedProfile.email || "",
      dateOfBirth,
      contact: contact.trim(),
      occupation: occupation.trim(),
      bio: bio.trim(),
      photo,
    };

    localStorage.setItem(
      "taskflowProfile",
      JSON.stringify(profileData)
    );

    alert("Profile updated successfully!");
    navigate("/profile");
  }

  const initial = (name || "Your Name").charAt(0).toUpperCase();

  return (

    <div className="task-page profile-layout">
  <div className="edit-profile-topbar">
    <h1 className="taskflow-top-heading">TaskFlow</h1>



    <Link to="/profile" className="back-to-profile-top-btn">
      ← Back to Profile
    </Link>
  </div>
   
      <div className="profile-heading">
        <div>
          <h1>Edit Profile</h1>
          <p>Update your personal information</p>
        </div>
      </div>

      <form className="profile-edit-card" onSubmit={saveProfile}>

  {/* Profile Photo - First Field */}
  <label>Profile Photo</label>

  <div className="profile-photo-row">
    <div className="profile-small-avatar">
      {photo ? (
        <img src={photo} alt="Profile preview" />
      ) : (
        initial
      )}
    </div>

    <div>
      <label
        htmlFor="edit-photo"
        className="profile-choose-photo"
      >
        📤 Choose Photo
      </label>

      <input
        id="edit-photo"
        className="profile-file-input"
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
      />

      <small>JPG, PNG or GIF (Max 2MB)</small>
    </div>
  </div>

  {/* Full Name - Second Field */}
  <label htmlFor="edit-name">Full Name</label>
  <input
    id="edit-name"
    type="text"
    placeholder="Enter your full name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />

        <label htmlFor="edit-dob">Date of Birth</label>
        <input
          id="edit-dob"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <label htmlFor="edit-email">Email Address</label>
        <input
          id="edit-email"
          type="email"
          value={email || savedProfile.email || ""}
          readOnly
        />

        <label htmlFor="edit-contact">Contact Number</label>
        <input
          id="edit-contact"
          type="tel"
          placeholder="Enter your contact number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <label htmlFor="edit-occupation">Occupation</label>
        <input
          id="edit-occupation"
          type="text"
          placeholder="e.g. Student, Developer"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
        />

        <label htmlFor="edit-bio">Bio</label>
        <textarea
          id="edit-bio"
          placeholder="Write something about yourself..."
          value={bio}
          maxLength={200}
          rows={3}
          onChange={(e) => setBio(e.target.value)}
        />

        <p className="profile-character-count">{bio.length}/200</p>

        

        <div className="profile-form-actions">
          <button type="submit" className="save-profile-btn">
            💾 Save Changes
          </button>

          <button
            type="button"
            className="profile-cancel-btn"
            onClick={() => navigate("/profile")}
          >
            ✕ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;