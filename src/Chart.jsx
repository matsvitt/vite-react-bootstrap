import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";


/*
  TODO: endpoint must be configurable instead of fixed
  */

function Chart() {
  const [data, setData] = useState(null);
//    const chart = useState(props.chart)
        const chart = "mychartx"


useEffect(() => {
  fetch("http://127.0.0.1:5000/"+chart)
    .then(res => res.json())
    .then(chartData => {
      setData({
        data: chartData.data,
        layout: chartData.layout
      });
    });
}, []);

    
  return data ? <Plot data={data.data} layout={data.layout} /> : <p>Loading Chart...</p>;
}
export default Chart;
