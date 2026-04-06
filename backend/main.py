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
from api.background import TrafficSystem
from config import CAMERA_INDEX

import threading

if __name__ == "__main__":
    init_db()

    # Start the robust traffic background loop (handles video looping)
    TrafficSystem.start()

    # Flask must bind to 0.0.0.0 in the cloud, using the PORT env var
    port = int(os.environ.get("PORT", 5000))
    app = create_app()
    
    print(f"[API] Flask running on http://0.0.0.0:{port}")
    app.run(host="0.0.0.0", port=port, debug=False, use_reloader=False)
