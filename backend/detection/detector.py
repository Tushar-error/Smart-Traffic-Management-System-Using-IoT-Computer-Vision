import cv2
from ultralytics import YOLO

YOLO_MODEL = "yolov8n.pt"
VEHICLE_CLASSES = [2, 3, 5, 7]
CONFIDENCE_THRESHOLD = 0.4
from config import DIRECTION_REGIONS, FRAME_WIDTH, FRAME_HEIGHT, NORTH, EAST, SOUTH, WEST

class VehicleDetector:
    def __init__(self):
        print("[DETECTOR] Loading YOLO model...")
        self.model = YOLO(YOLO_MODEL)
        print("[DETECTOR] Model loaded.")

    def detect(self, frame):
        frame = cv2.resize(frame, (FRAME_WIDTH, FRAME_HEIGHT))
        direction_counts = {NORTH: 0, EAST: 0, SOUTH: 0, WEST: 0}
        detections = []

        results = self.model(frame, verbose=False, conf=CONFIDENCE_THRESHOLD)

        for r in results:
            for box in r.boxes:
                cls = int(box.cls[0])
                if cls not in VEHICLE_CLASSES:
                    continue

                conf = float(box.conf[0])
                x1, y1, x2, y2 = map(int, box.xyxy[0])
                cx = (x1 + x2) // 2
                cy = (y1 + y2) // 2
                direction = self._get_direction(cx, cy)
                direction_counts[direction] += 1

                detections.append({
                    "bbox": [x1, y1, x2, y2],
                    "direction": direction,
                    "confidence": round(conf, 2),
                    "class": cls
                })

                color = self._direction_color(direction)
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                dir_label = {NORTH: "N", EAST: "E", SOUTH: "S", WEST: "W"}[direction]
                cv2.putText(frame, f"{dir_label} {conf:.0%}", (x1, y1 - 5),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 1)

        self._draw_overlay(frame, direction_counts)
        return frame, direction_counts, detections

    def _get_direction(self, cx, cy):
        for direction, (x1, x2, y1, y2) in DIRECTION_REGIONS.items():
            if x1 <= cx < x2 and y1 <= cy < y2:
                return direction
        return NORTH

    def _direction_color(self, direction):
        colors = {
            NORTH: (0, 120, 255),  # Blue
            EAST: (0, 255, 120),   # Green
            SOUTH: (255, 120, 0),  # Orange
            WEST: (255, 0, 255)    # Purple
        }
        return colors.get(direction, (255, 255, 255))

    def _draw_overlay(self, frame, direction_counts):
        # Draw grid lines
        cv2.line(frame, (320, 0), (320, 480), (255, 255, 255), 1) # Vertical
        cv2.line(frame, (0, 240), (640, 240), (255, 255, 255), 1) # Horizontal

        labels = {
            NORTH: ("NORTH", 10, 25),
            EAST: ("EAST", 330, 25),
            SOUTH: ("SOUTH", 10, 265),
            WEST: ("WEST", 330, 265)
        }
        for direction, (name, x, y) in labels.items():
            count = direction_counts[direction]
            cv2.putText(frame, f"{name}: {count}",
                        (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)