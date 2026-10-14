import { useEffect, useState } from "react";
 import { Link } from "react-router-dom"; 
 function Appearance() { const [appearance, setAppearance] = useState( localStorage.getItem("taskflowAppearance") || "light" ); 
  useEffect(() => { document.body.classList.remove("light-mode", "dark-mode");
     if (appearance === "dark") { document.body.classList.add("dark-mode");

      } else if (appearance === "light") { document.body.classList.add("light-mode"); 

      } localStorage.setItem("taskflowAppearance", appearance); 
    }, [appearance]);
       return ( <div className="task-page"> 
       <div className="task-page-card settings-page-card">
         <div className="task-page-header"> 
       <div> 
        <h1>🎨 Appearance</h1>
        <p>Customize how TaskFlow looks</p> 
        </div> 
        <Link to="/settings" className="back-btn"> ← Settings </Link> 
       </div> 
       <div className="appearance-list">
         <div className={`appearance-item ${ appearance === "light" ? "selected" : "" }`} onClick={() => setAppearance("light")} > <div className="appearance-icon">🌞</div> <div> <h3>Light Mode</h3> 
       <p>Use the light appearance</p> </div> 
       <input type="radio" checked={appearance === "light"} onChange={() => setAppearance("light")} /> </div> 
       <div className={`appearance-item ${ appearance === "dark" ? "selected" : "" }`} onClick={() => setAppearance("dark")} >
         <div className="appearance-icon">🌙</div>
          <div> 
            <h3>Dark Mode</h3> 
            <p>Use the dark appearance</p> 
       </div> 
       <input type="radio" checked={appearance === "dark"} onChange={() => setAppearance("dark")} /> </div> 
       
        </div> 
        </div> 
        </div>
         );
        } 
        export default Appearance;