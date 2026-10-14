import { Link } from "react-router-dom";

function About() {
return (
<div className="task-page">
<div className="task-page-card settings-page-card">

    <div className="task-page-header">
      <div>
        <h1>ℹ️ About TaskFlow</h1>
        <p>Application information</p>
      </div>

      <Link to="/settings" className="back-btn">
        ← Settings
      </Link>
    </div>

    <div className="about-content">

      <div className="about-logo">
        <h2>TaskFlow</h2>
        <p>Task Management & Scheduling</p>
      </div>

      <div className="about-item">
        <span>Application</span>
        <strong>TaskFlow</strong>
      </div>

      <div className="about-item">
        <span>Version</span>
        <strong>1.0.0</strong>
      </div>

      <div className="about-item">
        <span>Technology</span>
        <strong>React + Firebase</strong>
      </div>

      <div className="about-item">
        <span>Purpose</span>
        <strong>Task Management</strong>
      </div>

      <div className="about-description">
        <h3>About TaskFlow</h3>
        <p>
          TaskFlow is a task management application designed
          to help users organize, schedule and track their
          daily tasks efficiently.
        </p>
      </div>

    </div>

  </div>
</div>

);
}

export default About;