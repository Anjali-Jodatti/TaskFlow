import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";

function Profile({ email }) {
  const savedProfile = JSON.parse(
    localStorage.getItem("taskflowProfile") || "{}"
  );
  const navigate = useNavigate();

   const [name, setName] = useState(savedProfile.name || "");
  const [dateOfBirth, setDateOfBirth] = useState(savedProfile.dateOfBirth || "");
  const [contact, setContact] = useState(savedProfile.contact || "");
  const [occupation, setOccupation] = useState(savedProfile.occupation || "");
  const [bio, setBio] = useState(savedProfile.bio || "");
  const [photo, setPhoto] = useState(savedProfile.photo || "");
  const [isEditing, setIsEditing] = useState(false);

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

  function saveProfile() {
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

    alert("Profile saved successfully!");
    setIsEditing(false);
  }

  function cancelChanges() {
    const saved = JSON.parse(
      localStorage.getItem("taskflowProfile") || "{}"
    );

    setName(saved.name || "");
    setContact(saved.contact || "");
    setDateOfBirth(saved.dateOfBirth || "");
    setOccupation(saved.occupation || "");
    setBio(saved.bio || "");
    setPhoto(saved.photo || "");
    setIsEditing(false);
  }

  const displayName = name || "Your Name";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="task-page profile-layout">

<div className="profile-topbar">
  <div className="profile-brand-row">
    <h1 className="taskflow-top-heading">TaskFlow</h1>
    
  <Link to="/settings" className="back-btn">
        ← Settings
      </Link> 
    
  </div>

  <div className="profile-heading">
    <h1>My Profile</h1>
    <p>Manage your personal information and account settings</p>
  </div>
</div>
       
    
  <div className="profile-grid">


        {/* Left: Profile summary */}
          <section className="profile-summary-card profile-horizontal-card">
          <div className="profile-summary-left">
            <div className="profile-large-avatar">
  {photo ? (
    <img src={photo} alt="Profile" />
  ) : (
    initial
  )}
</div>

<button
  type="button"
  className="profile-picture-edit-btn"
  onClick={() => navigate("/edit-profile")}
>
  ✏️ Edit Profile
</button>

<h2>{displayName}</h2>
          
    <p className="profile-email">
  ✉️ {email || savedProfile.email || "Email not available"}
   </p>

   </div>

  <div className="profile-summary-right">
    <h2>Personal Information</h2>

    <div className="profile-info-grid">
      <div className="profile-info-item">
        <span>👤 Full Name</span>
        <strong>{name || "Not added"}</strong>
      </div>

      <div className="profile-info-item">
        <span>🎂 Date of Birth</span>
        <strong>{dateOfBirth || "Not added"}</strong>
      </div>

      <div className="profile-info-item">
        <span>📞 Contact Number</span>
        <strong>{contact || "Not added"}</strong>
      </div>

      <div className="profile-info-item">
        <span>💼 Occupation</span>
        <strong>{occupation || "Not added"}</strong>
      </div>

      <div className="profile-info-item profile-info-bio">
        <span>📝 Bio</span>
        <p>{bio || "Add a short bio about yourself."}</p>
      </div>
    </div>
  </div>
</section>


        {/* Right: Edit profile form */}
        {isEditing && (
        <section className="profile-edit-card">
          <div className="profile-edit-heading">
            <span>📝</span>
            <div>
              <h2>Edit Profile</h2>
              <p>Update your profile information</p>
            </div>
          </div>

          <label htmlFor="profile-name">Full Name</label>
          <input
            id="profile-name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="profile-dob">Date of Birth</label>
          <input
          id="profile-dob"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          />

          <label htmlFor="profile-email">Email Address</label>
          <input
            id="profile-email"
            type="email"
            value={email || ""}
            readOnly
          />

          <label htmlFor="profile-contact">
            Phone Number <span>(Optional)</span>
          </label>
          <input
            id="profile-contact"
            type="tel"
            placeholder="Enter your phone number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />

          <label htmlFor="profile-occupation">Occupation</label>
          <input
          id="profile-occupation"
          type="text"
          placeholder="e.g. Student, Developer"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          />

          <label htmlFor="profile-bio">Bio</label>
          <textarea
            id="profile-bio"
            placeholder="Write something about yourself..."
            value={bio}
            maxLength={200}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
          />

          <p className="profile-character-count">
            {bio.length}/200
          </p>

          <label htmlFor="profile-photo">Profile Photo</label>
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
                htmlFor="profile-photo"
                className="profile-choose-photo"
              >
                📤 Choose Photo
              </label>
              <input
                id="profile-photo"
                className="profile-file-input"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <small>JPG, PNG or GIF (Max 2MB)</small>
            </div>
          </div>

          <div className="profile-form-actions">
            <button
              type="button"
              className="save-profile-btn"
              onClick={saveProfile}
            >
              💾 Save Changes
            </button>

            <button
              type="button"
              className="profile-cancel-btn"
              onClick={cancelChanges}
            >
              ✕ Cancel
            </button>
          </div>

          <Link to="/" className="profile-dashboard-link">
            ← Back to Dashboard
          </Link>
        </section>
        )}
      </div>
    </div>
  );
}

export default Profile;
