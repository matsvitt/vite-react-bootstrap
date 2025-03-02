import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Chart from "./Chart";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [showChart, setShowChart] = useState(false);
  const [currentTime, setCurrentTime] = useState("Loading...");

/*Pull Trigger by CLient*/
/*    
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:5000/time")
        .then(res => res.json())
        .then(data => setCurrentTime(data.time));
    }, 60000);
    return () => clearInterval(interval);
  }, []);
*/

/*Server Push*/
    useEffect(() => {
    const eventSource = new EventSource("http://127.0.0.1:5000/time-stream");
     eventSource.onopen = () => console.log(">>> Connection opened!");
     eventSource.onerror = (e) => console.log(">>> Error",e);
    eventSource.onmessage = (event) => {
	const data = JSON.parse(event.data);
	console.log(">>> Data",data.time);
      setCurrentTime(data.time);
    };

    return () => eventSource.close(); // Clean up on unmount
  }, []);

    

    
    return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 bg-light">
          <Sidebar setShowChart={setShowChart} />
        </div>
        <div className="col-10">
          <h1>React & Flask Plotly App</h1>
          <p>Current Time: {currentTime}</p>
          {showChart && <Chart />}
        </div>
      </div>
    </div>
  );
}

export default App;
