from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

shared_state = {
    "counts": {1: 0, 2: 0, 3: 0},
    "signals": {1: "RED", 2: "RED", 3: "RED"},
    "green_lane": 2,
    "durations": {1: 10, 2: 20, 3: 10}
}

@app.route("/")
def index():
    return jsonify({"status": "Smart Traffic API Running ✅"})

@app.route("/api/status")
def status():
    return jsonify({
        "lane1": {
            "count": shared_state["counts"][1],
            "signal": shared_state["signals"][1],
            "duration": shared_state["durations"][1]
        },
        "lane2": {
            "count": shared_state["counts"][2],
            "signal": shared_state["signals"][2],
            "duration": shared_state["durations"][2]
        },
        "lane3": {
            "count": shared_state["counts"][3],
            "signal": shared_state["signals"][3],
            "duration": shared_state["durations"][3]
        },
        "green_lane": shared_state["green_lane"]
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)