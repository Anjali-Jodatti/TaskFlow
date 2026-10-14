import { useState, useEffect } from "react";
import {doc, setDoc, getDoc } from "firebase/firestore";
import {auth, db} from "../firebase";
 import { Link } from "react-router-dom";


function Notifications() { 
    const [taskNotifications, setTaskNotifications] = useState( localStorage.getItem("taskNotifications") !== "false" );
const [reminders, setReminders] = useState( localStorage.getItem("taskReminders") !== "false" );


async function handleTaskNotifications(value) { setTaskNotifications(value); 
  localStorage.setItem("taskNotifications", value); 
if(auth.currentUser){
  await setDoc(
    doc(db,"users", auth.currentUser.uid),
    {
      taskNotifications: value},{merge:true}
    );
  }}


  async function handleReminders(value) { setReminders(value); localStorage.setItem("taskReminders", value);
 if(auth.currentUser){
  await setDoc(
    doc(db,"users", auth.currentUser.uid),
    {
      taskReminders: value},{merge:true}
    );
  }}

 
  return ( 
    <div className="task-page">
        <div className="task-page-card settings-page-card"> 
<div className="task-page-header">
      <div>
        <h1>🔔 Notifications</h1>
        <p>Manage your TaskFlow notifications</p>
      </div>

      <Link to="/settings" className="back-btn">
        ← Settings
      </Link>
    </div>

    <div className="notification-list">

      <div className="notification-item">
        <div className="notification-text">
          <h3>Task Notifications</h3>
          <p>Receive notifications about your tasks</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={taskNotifications}
            onChange={(e) =>
              handleTaskNotifications(e.target.checked)
            }
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="notification-item">
        <div className="notification-text">
          <h3>Task Reminders</h3>
          <p>Get reminders for your scheduled tasks</p>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={reminders}
            onChange={(e) =>
              handleReminders(e.target.checked)
            }
          />
          <span className="slider"></span>
        </label>
      </div>

    </div>

  </div>
</div>
); }
export default Notifications;