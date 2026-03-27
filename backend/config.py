import os

CAMERA_INDEX = 0
FRAME_WIDTH = 640
FRAME_HEIGHT = 480

# Direction indices
NORTH = 1
EAST = 2
SOUTH = 3
WEST = 4

# Region boundaries for a 2x2 grid split of the 640x480 frame
# Format: (x_start, x_end, y_start, y_end)
DIRECTION_REGIONS = {
    NORTH: (0, 320, 0, 240),    # Top-Left
    EAST: (320, 640, 0, 240),   # Top-Right
    SOUTH: (0, 320, 240, 480),  # Bottom-Left
    WEST: (320, 640, 240, 480), # Bottom-Right
}

YOLO_MODEL = "yolov8n.pt"
VEHICLE_CLASSES = [2, 3, 5, 7]
CONFIDENCE_THRESHOLD = 0.4

def get_green_duration(vehicle_count: int) -> int:
    if vehicle_count == 0:
        return 5
    elif vehicle_count < 5:
        return 10
    elif vehicle_count < 10:
        return 20
    else:
        return 30

MIN_GREEN_TIME = 5
MAX_GREEN_TIME = 60
YELLOW_DURATION = 3

SERIAL_PORT = "COM3"
BAUD_RATE = 9600
SERIAL_TIMEOUT = 1

FLASK_PORT = 5000
FLASK_DEBUG = False
SECRET_KEY = "smart_traffic_secret_2024"
JWT_EXPIRY_HOURS = 24

DB_PATH = os.path.join(os.path.dirname(__file__), "traffic.db")

ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"