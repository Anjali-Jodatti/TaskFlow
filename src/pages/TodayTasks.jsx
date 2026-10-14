import { Link } from "react-router-dom";

function TodayTasks({ tasks }) {
  const savedTasks = JSON.parse(
    localStorage.getItem("taskflowTasks") || "[]"
  );

  const taskList = tasks.length > 0 ? tasks : savedTasks;

  const today = new Date().toISOString().split("T")[0];

  const todayTasks = taskList.filter(
    (task) => task.date === today
  );

  return (
    <div className="task-page">
      <div className="task-page-card">
        

        <div className="task-page-header">
          <div>
            
            <h1>📅 Today's Tasks</h1>
            <p>Tasks scheduled for today</p>
          </div>

          <Link to="/" className="back-btn">
            ← Dashboard
          </Link>
        </div>

        <div className="numbered-task-list">

          {todayTasks.length === 0 ? (
            <div className="no-task">
              <h3>No tasks for today</h3>
              <p>You don't have any tasks scheduled for today.</p>
            </div>
          ) : (
            todayTasks.map((task, index) => (

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
                      Status:
                      <strong>
                        {task.completed
                          ? " Completed"
                          : " Pending"}
                      </strong>
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

export default TodayTasks;