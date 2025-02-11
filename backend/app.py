from flask import Flask, jsonify, Response
import plotly.graph_objects as go
import json
import time
import threading
from plotly.utils import PlotlyJSONEncoder  

#app = Flask(__name__)

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


current_time = {"time": "Starting..."}

def update_time():
    while True:
        current_time["time"] = time.strftime("%Y-%m-%d %H:%M:%S")
        time.sleep(60)

@app.route("/mychart")
def mychart():
    fig = go.Figure()
    fig.add_trace(go.Scatter(y=[1, 3, 2, 4], mode='lines', name='Test Line'))
    return json.dumps(fig, cls=PlotlyJSONEncoder)

@app.route("/mychartx")
def mychartx():
    fig = go.Figure()
    fig.add_trace(go.Scatter(y=[1, 3, 2, 4], mode='lines', name='Test Line'))
    return json.dumps(fig, cls=PlotlyJSONEncoder)





@app.route("/time")
def get_time():
    return jsonify(current_time)

@app.route("/time-stream")
def time_stream():
    def event_stream():
        while True:
            yield f"data: {json.dumps(current_time)}\n\n"
            time.sleep(1)  # Send updates every second

    return Response(event_stream(), mimetype="text/event-stream")


if __name__ == "__main__":
    threading.Thread(target=update_time, daemon=True).start()
    app.run(debug=True)
