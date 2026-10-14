import { Link } from "react-router-dom";

function TotalTasks({ tasks }) {

  const savedTasks = JSON.parse(
    localStorage.getItem("taskflowTasks") || "[]"
  );

  const taskList = tasks.length > 0 ? tasks : savedTasks;

  return (
    <div className="task-page">

      <div className="task-page-card">

        {/* HEADER */}
        <div className="task-page-header">

          <div>
            <h1>📋 Total Tasks</h1>
            <p>All your scheduled tasks</p>
          </div>

          <Link to="/" className="back-btn">
            ← Dashboard
          </Link>

        </div>


        {/* TASK LIST */}
        <div className="numbered-task-list">

          {taskList.length === 0 ? (

            <div className="no-task">

              <h3>No tasks yet</h3>

              <p>
                Go to the dashboard and add your first task.
              </p>

            </div>

          ) : (

            taskList.map((task, index) => (

              <div
                className="numbered-task-card"
                key={task.id}
              >

                {/* TASK NUMBER */}
                <div className="task-number">
                  Task {index + 1}
                </div>


                {/* TASK DETAILS */}
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

export default TotalTasks;