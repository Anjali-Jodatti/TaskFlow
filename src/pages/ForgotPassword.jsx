import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleForgotPassword() {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);

      setMessage(
        "Password reset link has been sent to your email address. Please check your inbox."
      );

      setEmail("");
    } catch (error) {
      console.log(error);

      if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address.");
      } else if (error.code === "auth/user-not-found") {
        alert("No account found with this email address.");
      } else {
        alert("Unable to send reset link. Please try again.");
      }
    }
  }

  return (
    <div className="task-page">
      <div className="task-page-card profile-page-card">

        <div className="task-page-header">
          <div>
            <h1>🔐 Forgot Password</h1>
            <p>Reset your TaskFlow account password</p>
          </div>

          <Link to="/" className="dashboard-settings">
            🔑 Login
          </Link>
        </div>

        <div className="profile-form">

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            className="save-profile-btn"
            onClick={handleForgotPassword}
          >
            📧 Send Reset Link
          </button>

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;