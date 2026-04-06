import cv2
import time
import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from detection.detector import VehicleDetector
from detection.tracker import LaneTracker
from traffic.algorithm import decide_signal
from traffic.database import init_db, log_traffic
from iot.esp32 import ESP32Controller
from api.app import create_app
from api.routes import state
from config import CAMERA_INDEX

import threading

def run_detection():
    cap = cv2.VideoCapture(CAMERA_INDEX)
    detector = VehicleDetector()
    tracker = LaneTracker(window=5)
    esp32 = ESP32Controller()

    last_decision_time = time.time()
    current_green_lane = None
    green_duration = 10

    state["system_running"] = True
    state["esp32_status"] = esp32.status

    print("[MAIN] Traffic system started. Press ESC to quit.")

    while True:
        ret, frame = cap.read()
        if not ret:
            print("[ERROR] Cannot read webcam.")
            break

        annotated, raw_counts, emergency_detected = detector.detect(frame)
        smooth_counts = tracker.update(raw_counts)

        # Check for emergency vehicles
        emergency_lane = None
        for lane, detected in emergency_detected.items():
            if detected:
                emergency_lane = lane
                break

        now = time.time()
        
        # Override if emergency detected
        if emergency_lane:
            state["is_emergency"] = True
            if current_green_lane != emergency_lane:
                print(f"[EMERGENCY] Emergency vehicle detected in Lane {emergency_lane}!")
                current_green_lane = emergency_lane
                green_duration = 15 # Give them enough time
                last_decision_time = now
                
                state["signals"] = {1: "RED", 2: "RED", 3: "RED", 4: "RED"}
                state["signals"][emergency_lane] = "GREEN"
                state["green_lane"] = emergency_lane
                esp32.send_signal(emergency_lane)

        elif current_green_lane is None or (now - last_decision_time) >= green_duration:
            state["is_emergency"] = False
            decision = decide_signal(smooth_counts)
            current_green_lane = decision["green_lane"]
            green_duration = decision["green_duration"]

            state["counts"] = smooth_counts
            state["signals"] = decision["signals"]
            state["congestion"] = decision["congestion"]
            state["green_lane"] = current_green_lane
            state["durations"] = decision["durations"]
            state["total_vehicles"] = decision["total_vehicles"]

            esp32.send_signal(current_green_lane)
            log_traffic(decision)
            last_decision_time = now

            direction_names = {1: "NORTH", 2: "EAST", 3: "SOUTH", 4: "WEST"}
            name = direction_names.get(current_green_lane, f"L{current_green_lane}")
            print(f"\n[TRAFFIC] {name} GREEN | "
                  f"Counts: N={smooth_counts[1]} E={smooth_counts[2]} S={smooth_counts[3]} W={smooth_counts[4]}")

        if os.environ.get("SHOW_VIDEO", "False").lower() == "true":
            cv2.imshow("Smart Traffic System", annotated)
            if cv2.waitKey(1) == 27:
                break
        else:
            # Small sleep to prevent high CPU usage in headless mode if necessary
            time.sleep(0.01)

    cap.release()
    if os.environ.get("SHOW_VIDEO", "False").lower() == "true":
        try:
            cv2.destroyAllWindows()
        except:
            pass
    esp32.close()
    state["system_running"] = False
    print("[MAIN] System stopped.")

if __name__ == "__main__":
    init_db()

    app = create_app()
    api_thread = threading.Thread(
        target=lambda: app.run(port=5000, debug=False, use_reloader=False),
        daemon=True
    )
    api_thread.start()
    print("[API] Flask running on http://localhost:5000")

    run_detection()