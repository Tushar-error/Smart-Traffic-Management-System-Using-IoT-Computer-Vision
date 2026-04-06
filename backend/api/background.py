import threading
import time
import os
import cv2
import sys

# Ensure backend root is in Path for relative imports
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from detection.detector import VehicleDetector
from detection.tracker import LaneTracker
from traffic.algorithm import decide_signal
from traffic.database import init_db, log_traffic
from iot.esp32 import ESP32Controller
from api.routes import state
from config import CAMERA_INDEX

class TrafficSystem:
    _instance = None
    _thread = None
    _stop_flag = threading.Event()

    @classmethod
    def start(cls):
        if cls._instance is None:
            cls._instance = cls()
            cls._stop_flag.clear()
            cls._thread = threading.Thread(target=cls._instance.run_loop, daemon=True)
            cls._thread.start()
            print("[SYSTEM] Background traffic thread started.")

    @classmethod
    def stop(cls):
        cls._stop_flag.set()
        print("[SYSTEM] Stop signal sent to traffic thread.")

    def run_loop(self):
        init_db()
        cap = cv2.VideoCapture(CAMERA_INDEX)
        
        # If camera cannot be opened, try a fallback if it's a number
        if not cap.isOpened() and isinstance(CAMERA_INDEX, int):
            print(f"[WARN] Camera {CAMERA_INDEX} not found, trying fallback 0...")
            cap = cv2.VideoCapture(0)

        detector = VehicleDetector()
        tracker = LaneTracker(window=5)
        esp32 = ESP32Controller()

        last_decision_time = time.time()
        current_green_lane = None
        green_duration = 10

        state["system_running"] = True
        state["esp32_status"] = esp32.status

        print(f"[MAIN] Traffic loop active. Camera: {CAMERA_INDEX}")

        while not TrafficSystem._stop_flag.is_set():
            ret, frame = cap.read()
            if not ret:
                # If error, try to reopen camera after a short delay (for streams)
                print("[ERROR] Cannot read stream. Retrying in 5s...")
                time.sleep(5)
                cap.release()
                cap = cv2.VideoCapture(CAMERA_INDEX)
                continue

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
                    print(f"[EMERGENCY] Lane {emergency_lane}!")
                    current_green_lane = emergency_lane
                    green_duration = 15 
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

            # Small sleep to prevent high CPU usage in headless mode
            time.sleep(0.01)

        cap.release()
        esp32.close()
        state["system_running"] = False
        print("[SYSTEM] Traffic loop stopped cleanly.")
