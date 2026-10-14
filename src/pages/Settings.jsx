import { Link } from "react-router-dom";

function Settings() {
  function clearTaskData() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete all your tasks?"
    );

    if (confirmDelete) {
      localStorage.removeItem("taskflowTasks");
      alert("All task data has been deleted.");
    }
  }

  return (
    <div className="task-page">
      <div className="task-page-card settings-page-card">

        <div className="task-page-header">
          <div>
            <h1>⚙️ Settings</h1>
            <p>Manage your TaskFlow preferences</p>
          </div>

          <Link to="/" className="back-btn">
            ← Dashboard
          </Link>
        </div>

        <div className="settings-list">

           <Link to="/profile" className="settings-item">
           <div className="settings-icon">👤</div>
           <div>
           <h3>Profile</h3>
          <p>Manage your personal information</p>
         </div>
          </Link>

           <Link to="/change-password" className="settings-item">
           <div className="settings-icon">🔐</div>
            <div>
              <h3>Change Password</h3>
              <p>Change your account password</p>
            </div>
          </Link>

          <Link to="/notifications" className="settings-item">
            <div className="settings-icon">🔔</div>
            <div>
              <h3>Notifications</h3>
              <p>Manage task notifications and reminders</p>
            </div>
          </Link>

          <Link to="/appearance" className="settings-item">
            <div className="settings-icon">🎨</div>
            <div>
              <h3>Appearance</h3>
              <p>Change the appearance of TaskFlow</p>
            </div>
          </Link>

          <Link to="/help" className="settings-item">
            <div className="settings-icon">❓</div>
            <div>
              <h3>Help & Support</h3>
              <p>Get help and learn how to use TaskFlow</p>
            </div>
          </Link>

          <Link to="/about" className="settings-item">
            <div className="settings-icon">ℹ️</div>
            <div>
              <h3>About TaskFlow</h3>
              <p>View application information and version</p>
            </div>
          </Link>

          

        </div>

      </div>
    </div>
  );
}

export default Settings;