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

        annotated, raw_counts, _ = detector.detect(frame)
        smooth_counts = tracker.update(raw_counts)

        now = time.time()
        if current_green_lane is None or (now - last_decision_time) >= green_duration:
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

            print(f"\n[TRAFFIC] Lane {current_green_lane} GREEN | "
                  f"Counts: L1={smooth_counts[1]} L2={smooth_counts[2]} L3={smooth_counts[3]}")

        cv2.imshow("Smart Traffic System", annotated)
        if cv2.waitKey(1) == 27:
            break

    cap.release()
    cv2.destroyAllWindows()
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