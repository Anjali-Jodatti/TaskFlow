import { Link } from "react-router-dom";

function Help() {
return (
<div className="task-page">
<div className="task-page-card settings-page-card">

    <div className="task-page-header">
      <div>
        <h1>❓ Help & Support</h1>
        <p>Get help and learn how to use TaskFlow</p>
      </div>

      <Link to="/settings" className="back-btn">
        ← Settings
      </Link>
    </div>

    <div className="help-list">

      <div className="help-item">
        <div className="help-icon">📋</div>
        <div>
          <h3>How to Add a Task</h3>
          <p>
            Go to the Dashboard, click the Add Task button,
            enter the task details and save the task.
          </p>
        </div>
      </div>

      <div className="help-item">
        <div className="help-icon">✏️</div>
        <div>
          <h3>How to Edit a Task</h3>
          <p>
            Find the task on the Dashboard and click the Edit
            button to update its details.
          </p>
        </div>
      </div>

      <div className="help-item">
        <div className="help-icon">✅</div>
        <div>
          <h3>How to Complete a Task</h3>
          <p>
            Click the Complete button on a task when you have
            finished it.
          </p>
        </div>
      </div>

      <div className="help-item">
        <div className="help-icon">🔍</div>
        <div>
          <h3>How to Search Tasks</h3>
          <p>
            Use the search box on the Dashboard to quickly
            find a specific task.
          </p>
        </div>
      </div>

      <div className="help-item">
        <div className="help-icon">📧</div>
        <div>
          <h3>Need More Help?</h3>
          <p>
            If you have any problems using TaskFlow, contact
            the TaskFlow support team.
          </p>
        </div>
      </div>

    </div>

  </div>
</div>

);
}

export default Help; 