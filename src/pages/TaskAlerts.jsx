import { useState, useEffect } from "react";
 import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
  import { auth, db } from "../firebase";
   import { Link } from "react-router-dom"; 
   function TaskAlerts() { 
    const [alerts, setAlerts] = useState([]); 
    const [loading, setLoading] = useState(true);

    const handleDeleteAlert = async (alertId) => {
  try {
    const user = auth.currentUser;

    if (!user) return;

    await deleteDoc(
      doc(db, "users", user.uid, "tasks", alertId)
    );

    setAlerts((previousAlerts) =>
      previousAlerts.filter((alert) => alert.id !== alertId)
    );
  } catch (error) {
    console.error("Error deleting task alert:", error);
    alert("Unable to delete this task alert.");
  }
};

     useEffect(() => 
        { 
        async function loadAlerts() 
        { 
            try 
            { 
            const user = auth.currentUser;
             if (!user) return; 
            const tasksRef = collection( db, "users", user.uid, "tasks" ); 
            const snapshot = await getDocs(tasksRef); 
            const tasks = snapshot.docs.map((item) => ({ id: item.id, ...item.data(), })); 
            const now = new Date(); 
            const results = [];
             tasks.forEach((task) => { if (task.completed) return;
                 if (!task.date) return; 
                const dueDate = new Date( `${task.date}T${task.time || "23:59"}` ); 
                if (Number.isNaN(dueDate.getTime())) return; 
                const reminderMinutes = Number(task.reminder || 0); 
                const reminderTime = new Date( dueDate.getTime() - reminderMinutes * 60 * 1000 ); 
                if 
                (dueDate < now) { results.push({ id: task.id, icon: "⚠️", title: "Overdue Task", message: `${task.title} is overdue.`, date: task.date, });
             } 
             else if (reminderTime <= now) {
                 results.push({ id: task.id, icon: "🔔", title: "Task Reminder", message: `${task.title} is due soon.`, date: task.date, });
             } 
            }); 

             // Show tasks with the latest due dates first
             results.sort((a, b) => {
             return new Date(b.date + "T" + (b.time || "00:00")) -
             new Date(a.date + "T" + (a.time || "00:00"));              });

setAlerts(results);
            

             } 
             catch (error) { console.error("Error loading task alerts:", error); 

             }
              finally { setLoading(false); } } loadAlerts();
             }, []); 
             return ( 
             <div className="task-page"> 
             <div className="task-page-card"> 
                <div className="task-page-header"> 
                    <div>
                         <h1>🔔 Task Alerts</h1> 
                         <p>Reminders for your scheduled tasks</p>
                          </div> 
                         <Link to="/" className="back-btn"> ← Dashboard </Link> 
                         </div> {loading ? ( 
                            <p>Loading task alerts...</p> 
                            ) : alerts.length === 0 ? ( 
                            <div className="notification-item">
                             <p>🎉 No task reminders are due right now.</p> 
                             </div> 
                            ) : (
                                 <div className="notification-list"> 
                            {alerts.map((alert) => ( <div className="notification-item" key={alert.id}> 
                            <div className="notification-text"> <h3> {alert.icon} 
                            {alert.title}
                             </h3> 
                             <p>{alert.message}</p> 
                             <p>📅 {alert.date}</p>
                              </div> 
                              <button
                              className="delete-task-btn"
                              onClick={() => handleDeleteAlert(alert.id)}
                              >
                             🗑️ Delete
                             </button>


                              </div> 
                            ))} 
                            </div>
                         )} 
                             </div> 
                             </div> );
                          }
                           export default TaskAlerts;