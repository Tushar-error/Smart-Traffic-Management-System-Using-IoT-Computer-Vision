from flask import Blueprint, jsonify, request
from api.auth import token_required, generate_token, check_credentials
from traffic.database import get_recent_logs

api = Blueprint("api", __name__)

state = {
    "counts": {1: 0, 2: 0, 3: 0},
    "signals": {1: "RED", 2: "RED", 3: "RED"},
    "congestion": {1: "CLEAR", 2: "CLEAR", 3: "CLEAR"},
    "green_lane": None,
    "durations": {1: 0, 2: 0, 3: 0},
    "total_vehicles": 0,
    "esp32_status": "simulation",
    "system_running": False
}

@api.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username", "")
    password = data.get("password", "")

    if check_credentials(username, password):
        token = generate_token(username)
        return jsonify({"token": token, "username": username})

    return jsonify({"error": "Invalid credentials"}), 401

@api.route("/api/status")
@token_required
def status():
    return jsonify({
        "lane1": {
            "count": state["counts"].get(1, 0),
            "signal": state["signals"].get(1, "RED"),
            "duration": state["durations"].get(1, 0),
            "congestion": state["congestion"].get(1, "CLEAR")
        },
        "lane2": {
            "count": state["counts"].get(2, 0),
            "signal": state["signals"].get(2, "RED"),
            "duration": state["durations"].get(2, 0),
            "congestion": state["congestion"].get(2, "CLEAR")
        },
        "lane3": {
            "count": state["counts"].get(3, 0),
            "signal": state["signals"].get(3, "RED"),
            "duration": state["durations"].get(3, 0),
            "congestion": state["congestion"].get(3, "CLEAR")
        },
        "green_lane": state["green_lane"],
        "total_vehicles": state["total_vehicles"],
        "esp32_status": state["esp32_status"],
        "system_running": state["system_running"]
    })

@api.route("/api/history")
@token_required
def history():
    logs = get_recent_logs(50)
    return jsonify(logs)

@api.route("/api/override", methods=["POST"])
@token_required
def override():
    data = request.get_json()
    lane = data.get("lane")
    if lane not in [1, 2, 3]:
        return jsonify({"error": "Invalid lane"}), 400

    state["green_lane"] = lane
    state["signals"] = {1: "RED", 2: "RED", 3: "RED"}
    state["signals"][lane] = "GREEN"

    return jsonify({"message": f"Lane {lane} manually set to GREEN"})

@api.route("/api/health")
def health():
    return jsonify({"status": "ok"})