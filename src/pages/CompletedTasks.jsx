import { Link } from "react-router-dom";

function CompletedTasks({ tasks, onDelete }) {
  const savedTasks = JSON.parse(
    localStorage.getItem("taskflowTasks") || "[]"
  );

  const taskList = tasks.length > 0 ? tasks : savedTasks;

  const completedTasks = taskList.filter((task) => task.completed);

  function handleDelete(task) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this completed task?"
    );

    if (confirmDelete) {
      onDelete(task);
    }
  }

  return (
    <div className="task-page">
      <div className="task-page-card">

        <div className="task-page-header">
          <div>
            <h1>✅ Completed Tasks</h1>
            <p>Tasks that you have completed</p>
          </div>

          <Link to="/" className="back-btn">
            ← Dashboard
          </Link>
        </div>

        <div className="numbered-task-list">

          {completedTasks.length === 0 ? (
            <div className="no-task">
              <h3>No completed tasks</h3>
              <p>Complete a task and it will appear here.</p>
            </div>
          ) : (
            completedTasks.map((task, index) => (

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
                      Status: <strong>Completed ✓</strong>
                    </span>

                  </div>

                </div>

                
<button
  className="delete-task-btn"
  onClick={() => handleDelete(task)}
>
  🗑️ Delete
</button>
                

              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
}

export default CompletedTasks;