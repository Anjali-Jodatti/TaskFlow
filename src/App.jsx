import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, signOut,
} from "firebase/auth";
import { auth, db } from "./firebase";
import {collection, addDoc, getDocs, updateDoc, deleteDoc, doc, }from "firebase/firestore";
import "./App.css";
import TotalTasks from "./pages/TotalTasks";
import PendingTasks from "./pages/PendingTasks";
import CompletedTasks from "./pages/CompletedTasks";
import TodayTasks from "./pages/TodayTasks";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ChangePassword from "./pages/ChangePassword";
import Notifications from "./pages/Notifications";
import Appearance from "./pages/Appearance";
import Help from "./pages/Help";
import About from "./pages/About";
import ForgotPassword from "./pages/ForgotPassword";
import TaskAlerts from "./pages/TaskAlerts";
import AddTask from "./pages/AddTask";
import EditProfile from "./pages/EditProfile";


function App() {
  const location=useLocation();
  const navigate = useNavigate();
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks,setTasks]=useState(() => { const saved = localStorage.getItem("taskflowTasks");
    return saved?
    JSON.parse(saved): [];
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [currentUser,setCurrentUser]=useState(null);
  const [tasksLoaded,setTasksLoaded]= useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const[taskTitle, setTaskTitle] = useState("");
  const[taskDescription, setTaskDescription] = useState("");
  const[taskDate, setTaskDate] = useState("");
  const[taskTime, setTaskTime] = useState("");
  const[taskReminder, setTaskReminder] = useState("15");
  const[taskPriority, setTaskPriority] = useState("Low");
  const[editingTask, setEditingTask] = useState(null);
  const[searchTask, setSearchTask]= useState("");
  const[priorityFilter, setPriorityFilter]=useState("All");

  const [hasNewReminder, setHasNewReminder] = useState(() => {
  const notifications = JSON.parse(
    localStorage.getItem("taskFlowNotifications") || "[]"
  );

  return notifications.some((notification) => !notification.read);
});
  

  const scheduledTasks = useRef(new Set());

  const [notificationVersion, setNotificationVersion] = useState(0);


  useEffect(() => {
  const updateNotifications = () => {
    setHasNewReminder(true);
  };

  window.addEventListener(
    "taskflow-notification",
    updateNotifications
  );

  return () => {
    window.removeEventListener(
      "taskflow-notification",
      updateNotifications
    );
  };
}, []);
  

  function getTaskStatus(task) {
  if (task.completed) {
    return "Completed";
  }

  const taskDateTime = new Date(`${task.date}T${task.time}`);
  const currentTime = new Date();

  if (taskDateTime < currentTime) {
    return "Overdue";
  }

  return "Pending";
}


  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    setCurrentUser(user);
    setIsLoggedIn(!!user);
    setAuthLoading(false);
  });

  return () => unsubscribe();
}, []);


useEffect(() => {
  if (!currentUser) return;

  const loadTasks = async () => {
    try {
      const tasksRef = collection(
        db,
        "users",
        currentUser.uid,
        "tasks"
      );

      const snapshot = await getDocs(tasksRef);

      const userTasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(userTasks);
      setTasksLoaded(true);
    } catch (error) {
      console.error("Error loading tasks:", error);
      alert("Unable to load your tasks.");
      setTasksLoaded(true);
    }
  };

  loadTasks();
}, [currentUser]);
  

  useEffect(() => { localStorage.setItem("taskflowTasks", JSON.stringify(tasks));
  },[tasks]);

  // UPDATE TASK STATUS EVERY 30 SECONDS
useEffect(() => {
  const timer = setInterval(() => {
    setTasks((currentTasks) => [...currentTasks]);
  }, 30000);

  return () => clearInterval(timer);
}, []);

useEffect(() => { const remindersEnabled = localStorage.getItem("taskReminders") !== "false";
   if (!remindersEnabled) { 
  return;
 } tasks.forEach((task) => {
   if (!task.completed) { scheduleTaskReminder(task); 
   } 
  });
 }, [tasks]);


  // LOGIN
  async function login() {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      alert("Login Successful!");
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error.code);

      if (
        error.code === "auth/invalid-credential" ||
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        alert("Your email address or password is wrong");
      } else {
        alert(error.message);
      }
    }
  }
function forgotPassword() {
  window.location.href = "/forgot-password";
}
 
//logout

async function logout() {
  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (confirmLogout) {
    try {
      await signOut(auth);

      setIsLoggedIn(false);
      setCurrentUser(null);

      // Clear login fields
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Reset password visibility
      setShowPassword(false);
      setShowConfirmPassword(false);

      alert("You have been logged out successfully");

      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
      alert("Unable to logout. Please try again.");
    }
  }
}



  // SIGNUP
  async function signup() {
    if (!email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      alert("Account Created successfully!");

      setShowSignup(false);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      alert(error.message);
    }
  }

  async function addTask() { console.log("Title:", taskTitle); 
    console.log("Description:", taskDescription); 
    console.log("Date:", taskDate); 
    console.log("Time:", taskTime); 
    console.log("Priority:", taskPriority); 
    if (!taskTitle || !taskDate || !taskTime) { alert("Please fill in task title, date and time."); 
      return; } if (!currentUser) { alert("Please login first.");
         return;

       } const newTask = { title: taskTitle, description: taskDescription, date: taskDate, time: taskTime, reminder: taskReminder, priority: taskPriority, completed: false, }; 
       try { 
        const tasksRef = collection( db, "users", currentUser.uid, "tasks" ); 
        const docRef = await addDoc(tasksRef, newTask); 
        const savedTask = { id: docRef.id, ...newTask, }; 
        setTasks((currentTasks) => [...currentTasks, savedTask]);

         const reminderEnabled = localStorage.getItem("taskReminders") !== "false";
         if (reminderEnabled) { requestNotificationPermission(); 
         
        } setTaskTitle(""); 
          setTaskDescription(""); 
          setTaskDate(""); 
          setTaskTime(""); 
          setTaskReminder("15"); 
          setTaskPriority("Low");
           setShowAddTask(false); 
           alert("Task added successfully!");
           } catch (error) { console.error("Error saving task:", error); 
            alert("Unable to save task to your account.");
           } }

// TASK REMINDER

function scheduleTaskReminder(task) {
  // Check if reminders are enabled
  const remindersEnabled =
    localStorage.getItem("taskReminders") !== "false";
      
  if (!remindersEnabled) {
    return;
  }

  // Don't schedule the same task twice
  if (scheduledTasks.current.has(task.id)) {
    return;
  }

  const taskDateTime = new Date(`${task.date}T${task.time}`);

  const reminderMinutes =
    Number.isFinite(Number(task.reminder))
      ? Number(task.reminder)
      : 15;

  const reminderTime = new Date(
    taskDateTime.getTime() - reminderMinutes * 60 * 1000
  );

  const currentTime = new Date();

  const timeUntilReminder =
    reminderTime.getTime() - currentTime.getTime();

  if (timeUntilReminder <= 0) {
    return;
  }

  // Mark as scheduled only after all checks pass
  scheduledTasks.current.add(task.id);

  setTimeout(() => {
    // Check Reminder setting again before showing notification
    const remindersEnabled =
      localStorage.getItem("taskReminders") !== "false";

    if (!remindersEnabled) {
      scheduledTasks.current.delete(task.id);
      return;
    }
   
    // In-app task reminder 
    const taskNotificationsEnabled = localStorage.getItem("taskNotifications") !== "false";
     if (taskNotificationsEnabled) { const reminderMessage = { id: `${task.id}-${Date.now()}`, title: "Task Reminder", message: `Your task "${task.title}" starts in ${reminderMinutes} minutes.`, date: new Date().toLocaleString(), read: false, }; 
     const savedNotifications = JSON.parse( localStorage.getItem("taskFlowNotifications") || "[]" );
      savedNotifications.unshift(reminderMessage); localStorage.setItem( "taskFlowNotifications", JSON.stringify(savedNotifications) ); 
      window.dispatchEvent(new Event("taskflow-notification")); } 
      scheduledTasks.current.delete(task.id);
      }, 
      timeUntilReminder); 
    }
    

// NOTIFICATION PERMISSION
function requestNotificationPermission() {
  if ("Notification" in window) {
    Notification.requestPermission();
  }
}

// WAIT FOR FIREBASE TO CHECK LOGIN
if (authLoading) {
  return (
    <div className="page">
      <div className="login-card">
        <h1>TaskFlow</h1>
        <p className="subtitle">Checking your login...</p>
      </div>
    </div>
  );
}

   
//frogot password
if (location.pathname === "/forgot-password") {
  return <ForgotPassword />;
}

//change password
if (location.pathname === "/change-password") {
  return <ChangePassword />;
}

if (isLoggedIn && location.pathname === "/task-alerts") {
  return <TaskAlerts />;
}

  // DASHBOARD
  if (isLoggedIn) {
    if (location.pathname === "/add-task") {
  return (
    <AddTask
      taskTitle={taskTitle}
      setTaskTitle={setTaskTitle}
      taskDescription={taskDescription}
      setTaskDescription={setTaskDescription}
      taskDate={taskDate}
      setTaskDate={setTaskDate}
      taskTime={taskTime}
      setTaskTime={setTaskTime}
      taskReminder={taskReminder}
      setTaskReminder={setTaskReminder}
      taskPriority={taskPriority}
      setTaskPriority={setTaskPriority}
      addTask={addTask}
    />
  );
}
    
    if(location.pathname==="/settings"){
    return<Settings/>;
  }

  if (location.pathname === "/profile") {
  return <Profile email={currentUser?.email || ""} />;
}

if (location.pathname === "/edit-profile") {
  return <EditProfile email={currentUser?.email || ""} />;
}

  if(location.pathname==="/notifications"){
    return<Notifications/>;
  }

   if(location.pathname==="/appearance"){
    return<Appearance/>;
  }

  if (location.pathname === "/help") {
return <Help />;
}

if (location.pathname === "/about") {
return <About />;
}

    if (location.pathname === "/total-tasks") {
    return <TotalTasks tasks={tasks} />;
  }

  if (location.pathname === "/pending-tasks") {
    return <PendingTasks tasks={tasks} />;
  }

  if (location.pathname === "/completed-tasks") {
  return (
    <CompletedTasks
      tasks={tasks}
      onDelete={async (task) => {
        try {
          const taskRef = doc(
            db,
            "users",
            currentUser.uid,
            "tasks",
            task.id
          );

          await deleteDoc(taskRef);

          setTasks((currentTasks) =>
            currentTasks.filter((item) => item.id !== task.id)
          );

          alert("Completed task deleted successfully!");
        } catch (error) {
          console.error("Error deleting completed task:", error);
          alert("Unable to delete completed task.");
        }
      }}
    />
  );
}

 
 

  if (location.pathname === "/today-tasks") {
    return <TodayTasks tasks={tasks} />;
  }

  if (location.pathname.startsWith("/edit-task/")) {
  const taskId = location.pathname.split("/")[2];

  const taskToEdit = tasks.find(
    (task) => task.id === taskId
  );

  if (!taskToEdit) {
    return (
      <div className="edit-page">
        <div className="edit-task-card">
          <h2>Task Not Found</h2>
          <button
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-page">
      <div className="edit-task-card">

        <h2>✏️ Edit Task</h2>

        <label>Task Title</label>
        <input
          type="text"
          value={taskToEdit.title}
          onChange={(e) => {
            setTasks((currentTasks) =>
              currentTasks.map((item) =>
                item.id === taskId
                  ? { ...item, title: e.target.value }
                  : item
              )
            );
          }}
        />

        <label>Description</label>
        <textarea
          value={taskToEdit.description || ""}
          onChange={(e) => {
            setTasks((currentTasks) =>
              currentTasks.map((item) =>
                item.id === taskId
                  ? { ...item, description: e.target.value }
                  : item
              )
            );
          }}
        />

        <label>Date</label>
        <input
          type="date"
          value={taskToEdit.date}
          onChange={(e) => {
            setTasks((currentTasks) =>
              currentTasks.map((item) =>
                item.id === taskId
                  ? { ...item, date: e.target.value }
                  : item
              )
            );
          }}
        />

        <label>Time</label>
        <input
          type="time"
          value={taskToEdit.time}
          onChange={(e) => {
            setTasks((currentTasks) =>
              currentTasks.map((item) =>
                item.id === taskId
                  ? { ...item, time: e.target.value }
                  : item
              )
            );
          }}
        />

        <label>Reminder</label>
        <select
          value={taskToEdit.reminder || "15"}
          onChange={(e) => {
            setTasks((currentTasks) =>
              currentTasks.map((item) =>
                item.id === taskId
                  ? { ...item, reminder: e.target.value }
                  : item
              )
            );
          }}
        >
          <option value="0">At task time</option>
          <option value="1">1 minute before</option>
          <option value="5">5 minutes before</option>
          <option value="10">10 minutes before</option>
          <option value="15">15 minutes before</option>
          <option value="30">30 minutes before</option>
          <option value="60">1 hour before</option>
          <option value="1440">1 day before</option>
        </select>

        <label>Priority</label>
        <select
          value={taskToEdit.priority}
          onChange={(e) => {
            setTasks((currentTasks) =>
              currentTasks.map((item) =>
                item.id === taskId
                  ? { ...item, priority: e.target.value }
                  : item
              )
            );
          }}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <div className="edit-page-buttons">

          <button
            className="save-edit-btn"
            onClick={async () => {
              try {
                const taskRef = doc(
                  db,
                  "users",
                  currentUser.uid,
                  "tasks",
                  taskId
                );

                await updateDoc(taskRef, {
                  title: taskToEdit.title,
                  description: taskToEdit.description,
                  date: taskToEdit.date,
                  time: taskToEdit.time,
                  reminder: taskToEdit.reminder,
                  priority: taskToEdit.priority,
                });

                alert("Task updated successfully!");

                navigate("/");
              } catch (error) {
                console.error(
                  "Error updating task:",
                  error
                );

                alert("Unable to update task.");
              }
            }}
          >
            💾 Save Changes
          </button>

          <button
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

        </div>

      </div>
    </div>
  );
}

  
    return (
      <div className="dashboard-page">
        <div className="dashboard-card">

         <header className="dashboard-header">
          <div className="dashboard-logo">
          <h1> TaskFlow</h1>
        </div>

        <div className="dashboard-header-right">
          

          <Link
  to="/task-alerts"
  className="header-notification"
  onClick={() => {
    setHasNewReminder(false);

    const notifications = JSON.parse(
      localStorage.getItem("taskFlowNotifications") || "[]"
    );

    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      read: true,
    }));

    localStorage.setItem(
      "taskFlowNotifications",
      JSON.stringify(updatedNotifications)
    );
  }}
>
  🔔
  {hasNewReminder && (
    <span className="notification-dot"></span>
  )}
</Link>
          
          {/* Logged-in User Account */}
         <Link to="/profile" className="header-account" title="My Profile">
        {(() => {
        const savedProfile = JSON.parse(
        localStorage.getItem("taskflowProfile") || "{}"
        );

       return savedProfile.photo ? (
      <img
        src={savedProfile.photo}
        alt="Profile"
        className="header-account-photo"
      />
      ) : (
      <span className="header-account-avatar">👤</span>
       );
      })()}
     </Link>

          <Link to="/settings" className="dashboard-settings">
          ⚙️ Settings
          </Link>

          
          <button
            className="dashboard-logout"
            onClick={logout }> Logout
            </button>
            </div>
            </header>

         <div className="dashboard-content">

          <h2>Welcome Back </h2>
          <p>Manage and schedule your tasks easily.</p>

          <div className="stats-container">

            <Link to="/total-tasks" className="stat-card">
              <h3>{tasks.length}</h3>
              <p>Total Tasks</p>
            </Link>

            <Link to="/pending-tasks" className="stat-card">
              <h3>{tasks.filter((task) => !task.completed).length}</h3>
              <p>⏰ Pending Tasks</p>
            </Link>

            <Link to="/completed-tasks" className="stat-card">
              <h3>{tasks.filter((task) => task.completed).length}</h3>
              <p>✅ Completed Tasks</p>
            </Link>

            <Link to="/today-tasks" className="stat-card">
              <h3>
                {tasks.filter((task) => task.date === new Date().toISOString().split("T")[0]).length}
                 </h3>
              <p>  📅 Today's Tasks</p>
            </Link>

          </div>

          <div className="tasks-section">

            <div className="tasks-heading">

              <h2>My Tasks</h2>
               
               <div className="search-box">
                 <input
    type="text"
    placeholder="🔍 Search tasks..."
    value={searchTask}
    onChange={(e) => setSearchTask(e.target.value)}
  />
</div>
          
<select
  className="priority-filter"
  value={priorityFilter}
  onChange={(e) => setPriorityFilter(e.target.value)}
>
  <option value="All">All Priorities</option>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>

              <button
            className="add-task-btn"
            onClick={() => navigate("/add-task")}
            >
            + Add Task
            </button>
           </div>

            
            {/* SHOW THIS ONLY WHEN FORM IS CLOSED */}

            {!showAddTask && tasks.length === 0 && (
  <div className="empty-task">
    <p>No tasks yet.</p>
    <p>Click "+ Add Task" to create your first task.</p>
  </div>
)}


{tasks
  .filter((task) => !task.completed)
  .filter((task) =>
    task.title.toLowerCase().includes(searchTask.toLowerCase())
  )
  .filter(
    (task) => 
      priorityFilter ==="All" ||
    task.priority === priorityFilter
  )
  .map((task) => (
  <div
    className={`task-card ${task.completed ? "completed-task" : ""}`}
    key={task.id}
  >

    <h3>{task.title}</h3>

    <p>{task.description}</p>

    <p>
      📅 {task.date} &nbsp; ⏰ {task.time}
    </p>

    <p>
      Priority: <strong>{task.priority}</strong>
    </p>

    <p>
  Status:{" "}
  <strong className={`task-status ${getTaskStatus(task).toLowerCase()}`}>
    {getTaskStatus(task)}
  </strong>
</p>

      <div className="task-actions">

      <button
        className="complete-btn"
        onClick={async () => {
  const newCompletedStatus = !task.completed;

  try {
    const taskRef = doc(
      db,
      "users",
      currentUser.uid,
      "tasks",
      task.id
    );

    await updateDoc(taskRef, {
      completed: newCompletedStatus,
    });

    setTasks(
      tasks.map((item) =>
        item.id === task.id
          ? { ...item, completed: newCompletedStatus }
          : item
      )
    );
  } catch (error) {
    console.error("Error updating task:", error);
    alert("Unable to update task.");
  }
}}
>

        {task.completed ? "↩️ Undo" : "✅ Complete"}
      </button>

<button
  className="edit-btn"
  onClick={() => navigate(`/edit-task/${task.id}`)}
>
  ✏️ Edit
</button>

      <button
        className="delete-btn"
        onClick={async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this task?"
  );

  if (!confirmDelete) {
    return;
  }

  try {
    const taskRef = doc(
      db,
      "users",
      currentUser.uid,
      "tasks",
      task.id
    );

    await deleteDoc(taskRef);

    setTasks(
      tasks.filter((item) => item.id !== task.id)
    );

    alert("Task deleted successfully!");
  } catch (error) {
    console.error("Error deleting task:", error);
    alert("Unable to delete task.");
  }
}}

 >
        🗑️ Delete
      </button>

    </div>

  </div>
))}
           
          </div>

        </div>
        </div>
      </div>
    );
  }

  // LOGIN / SIGNUP PAGE

  return (
    <div className="page">

      <div
        className={`login-card ${
          showSignup ? "signup-card" : ""
        }`}
      >

        <div className="logo"></div>

        {!showSignup ? (
          <>
            <h1>Welcome Back</h1>

            <p className="subtitle">
              Login To Your Account
            </p>

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>
            <div className="password-box">

                <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>

            </div>

            
            <button
              className="login-btn"
              onClick={login}
            >
              Login
            </button>
             <button
  type="button"
  className="forgot-password-btn"
  onClick={forgotPassword}
>
  Forgot Password?
</button>
            
            <div className="divider">
              <span>OR</span>
            </div>

            <p className="signup-text">
              Don't have an Account?
            </p>

            <button
              className="signup-btn"
              onClick={() => setShowSignup(true)}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h1>Create Account</h1>

            <p className="subtitle">
              Signup for a new Account
            </p>

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <div className="password-box">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? <Eye /> : <EyeOff />}
              </button>

            </div>

            <label>Confirm Password</label>

            <div className="password-box">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword ? (
                  <Eye />
                ) : (
                  <EyeOff />
                )}
              </button>

            </div>

            <button
              className="signup-btn"
              onClick={signup}
            >
              Create Account
            </button>

            <div className="divider signup-divider">
              <span>OR</span>
            </div>

            <p className="already-account">
              Already have an account?
            </p>

            <button
              className="login-btn back-login-btn"
              onClick={() => setShowSignup(false)}
            >
              Back to Login
            </button>
          </>
        )}

      </div>

    </div>
  );
}
export default App;