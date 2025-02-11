import React from "react";
function Sidebar({ setShowChart }) {
  return (
    <nav>
      <button onClick={() => setShowChart(true)} className="btn btn-primary m-3">
        Load Chart
      </button>
    </nav>
  );
}
export default Sidebar;
