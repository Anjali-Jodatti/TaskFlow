import { useState } from "react";
 import { Link } from "react-router-dom"; 
 import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, } from "firebase/auth"; 
 import { auth } from "../firebase";

 function ChangePassword() { 
    const isForgotPassword =
      new URLSearchParams(window.location.search).get("from") === "forgot";

    const [currentPassword, setCurrentPassword] = useState(""); 
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

async function changePassword() {

  if (
  (!isForgotPassword && !currentPassword) ||
  !newPassword ||
  !confirmPassword
) {
  alert("Please fill in all fields.");
  return;
}
    

if (newPassword !== confirmPassword) {
  alert("New passwords do not match.");
  return;
}

if (newPassword.length < 6) {
  alert("New password must be at least 6 characters.");
  return;
}

const user = auth.currentUser;

if (!user || !user.email) {
  alert("User is not logged in.");
  return;
}

try {
  const credential = EmailAuthProvider.credential(
    user.email,
    currentPassword
  );

  await reauthenticateWithCredential(user, credential);

  await updatePassword(user, newPassword);

  alert("Password changed successfully!");

  setCurrentPassword("");
  setNewPassword("");
  setConfirmPassword("");

} catch (error) {
  console.log(error);

  if (error.code === "auth/invalid-credential") {
    alert("Current password is incorrect.");
  }
   else {
    alert("Unable to change password. Please try again.");
  }
}
}
return (  
    <div className="task-page">
        <div className="task-page-card profile-page-card">
          <div className="task-page-header">
      <div>
        <h1>🔐 Change Password</h1>
        <p>Update your TaskFlow account password</p>
      </div>

      <Link to="/settings" className="back-btn">
        ← Settings
      </Link> 
    </div>

    <div className="profile-form">

      {!isForgotPassword && (
  <>
    <label>Current Password</label>

    <input
      type="password"
      placeholder="Enter current password"
      value={currentPassword}
      onChange={(e) => setCurrentPassword(e.target.value)}
    />
  </>
)}

      

      <label>New Password</label>

      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label>Confirm New Password</label>

      <input
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        className="save-profile-btn"
        onClick={changePassword}
      >
        🔐 Change Password
      </button>

    </div>

  </div>
</div>
);
 }
export default ChangePassword;