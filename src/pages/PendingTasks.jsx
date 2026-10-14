import { Link } from "react-router-dom";

function PendingTasks({ tasks }) {
  const savedTasks = JSON.parse(
    localStorage.getItem("taskflowTasks") || "[]"
  );

  const taskList = tasks.length > 0 ? tasks : savedTasks;

  const pendingTasks = taskList.filter((task) => !task.completed);

  return (
    <div className="task-page">
      <div className="task-page-card">

        <div className="task-page-header">
          <div>
            <h1>⏳ Pending Tasks</h1>
            <p>Tasks that are waiting to be completed</p>
          </div>

          <Link to="/" className="back-btn">
            ← Dashboard
          </Link>
        </div>

        <div className="numbered-task-list">

          {pendingTasks.length === 0 ? (
            <div className="no-task">
              <h3>No pending tasks</h3>
              <p>Great! You have completed all your tasks.</p>
            </div>
          ) : (
            pendingTasks.map((task, index) => (

              <div className="numbered-task-card" key={task.id}>

                <div className="task-number">
                  Task {index + 1}
                </div>

                <div className="task-details">

                  <h3>{task.title}</h3>

                  <p className="task-description">
                    {task.description}
                  </p>

                  <div className="task-info">

                    <span>
                      📅 {task.date}
                    </span>

                    <span>
                      ⏰ {task.time}
                    </span>

                    <span>
                      Priority: <strong>{task.priority}</strong>
                    </span>

                    <span>
                      Status: <strong>Pending</strong>
                    </span>

                  </div>

                </div>

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default PendingTasks;