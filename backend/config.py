# Traffic System Settings
import os
from dotenv import load_dotenv

load_dotenv()

# Camera Index can be an integer (webcam) or a string (video file/URL/RTSP)
RAW_CAMERA = os.environ.get("CAMERA_INDEX", "demo_video.mp4")
if RAW_CAMERA.isdigit():
    CAMERA_INDEX = int(RAW_CAMERA)
else:
    CAMERA_INDEX = RAW_CAMERA
    # If using a local file like demo_video.mp4, ensure it resolves correctly in Docker
    if not CAMERA_INDEX.startswith(("http://", "https://", "rtsp://")) and not os.path.isabs(CAMERA_INDEX):
        CAMERA_INDEX = os.path.join(os.path.dirname(__file__), CAMERA_INDEX)

FRAME_WIDTH = int(os.environ.get("FRAME_WIDTH", 640))
FRAME_HEIGHT = int(os.environ.get("FRAME_HEIGHT", 480))

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

YOLO_MODEL = os.environ.get("YOLO_MODEL", "yolov8n.pt")
VEHICLE_CLASSES = [2, 3, 5, 7]
CONFIDENCE_THRESHOLD = float(os.environ.get("CONFIDENCE_THRESHOLD", 0.4))

MIN_GREEN_TIME = int(os.environ.get("MIN_GREEN_TIME", 5))
MAX_GREEN_TIME = int(os.environ.get("MAX_GREEN_TIME", 60))
YELLOW_DURATION = int(os.environ.get("YELLOW_DURATION", 3))

SERIAL_PORT = os.environ.get("SERIAL_PORT", "COM3")
BAUD_RATE = int(os.environ.get("BAUD_RATE", 9600))
SERIAL_TIMEOUT = int(os.environ.get("SERIAL_TIMEOUT", 1))

FLASK_PORT = int(os.environ.get("FLASK_PORT", 5000))
FLASK_DEBUG = os.environ.get("FLASK_DEBUG", "False").lower() == "true"
SECRET_KEY = os.environ.get("SECRET_KEY", "smart_traffic_secret_2024")
if SECRET_KEY == "smart_traffic_secret_2024":
    import warnings
    warnings.warn(
        "[SECURITY] SECRET_KEY is using the insecure default. Set a strong SECRET_KEY in your .env file before deploying.",
        stacklevel=1
    )
JWT_EXPIRY_HOURS = int(os.environ.get("JWT_EXPIRY_HOURS", 24))

DB_PATH = os.environ.get("DB_PATH", os.path.join(os.path.dirname(__file__), "traffic.db"))

ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

# Gemini AI Settings
GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY", "")

def get_green_duration(vehicle_count: int) -> int:
    if vehicle_count == 0:
        return 5
    elif vehicle_count < 5:
        return 10
    elif vehicle_count < 10:
        return 20
    else:
        return 30