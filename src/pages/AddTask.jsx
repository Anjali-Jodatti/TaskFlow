import { Link, useNavigate } from "react-router-dom";
 function AddTask({ taskTitle, setTaskTitle, taskDescription, setTaskDescription, taskDate, setTaskDate, taskTime, setTaskTime, taskReminder, setTaskReminder, taskPriority, setTaskPriority, addTask, })
  { 
    const navigate = useNavigate();
     return ( <div className="edit-page">
         <div className="edit-task-card">
         <h2>➕ Add New Task</h2> 
     <label>Task Title</label> 
     <input type="text" placeholder="Enter task title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} /> 
     <label>Description</label> 
     <textarea placeholder="Enter task description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} /> 
     <label>Date</label>
      <input type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} /> 
      <label>Time</label> 
      <input type="time" value={taskTime} onChange={(e) => setTaskTime(e.target.value)} /> 
      <label>Reminder</label> 
      <select value={taskReminder} onChange={(e) => setTaskReminder(e.target.value)} > 
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
        <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} > 
            <option>Low</option> <option>Medium</option> 
        <option>High</option> 
       </select> 
       <button type="button" className="add-task-btn" onClick={addTask} > Save Task </button> 
       <Link to="/" className="back-btn"> ← Back to Dashboard </Link>
        </div> 
        </div> 
        ); 
       } 
       export default AddTask;