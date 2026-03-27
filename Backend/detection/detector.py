import cv2
from ultralytics import YOLO

YOLO_MODEL = "yolov8n.pt"
VEHICLE_CLASSES = [2, 3, 5, 7]
CONFIDENCE_THRESHOLD = 0.4
FRAME_WIDTH = 640
FRAME_HEIGHT = 480
LANE_BOUNDARIES = {1: (0, 213), 2: (213, 426), 3: (426, 640)}

class VehicleDetector:
    def __init__(self):
        print("[DETECTOR] Loading YOLO model...")
        self.model = YOLO(YOLO_MODEL)
        print("[DETECTOR] Model loaded.")

    def detect(self, frame):
        frame = cv2.resize(frame, (FRAME_WIDTH, FRAME_HEIGHT))
        lane_counts = {1: 0, 2: 0, 3: 0}
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
                lane = self._get_lane(cx)
                lane_counts[lane] += 1

                detections.append({
                    "bbox": [x1, y1, x2, y2],
                    "lane": lane,
                    "confidence": round(conf, 2),
                    "class": cls
                })

                color = self._lane_color(lane)
                cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)
                cv2.putText(frame, f"L{lane} {conf:.0%}", (x1, y1 - 5),
                            cv2.FONT_HERSHEY_SIMPLEX, 0.45, color, 1)

        self._draw_overlay(frame, lane_counts)
        return frame, lane_counts, detections

    def _get_lane(self, cx):
        for lane, (start, end) in LANE_BOUNDARIES.items():
            if start <= cx < end:
                return lane
        return 3

    def _lane_color(self, lane):
        colors = {1: (0, 120, 255), 2: (0, 255, 120), 3: (255, 120, 0)}
        return colors.get(lane, (255, 255, 255))

    def _draw_overlay(self, frame, lane_counts):
        for lane, (_, end) in LANE_BOUNDARIES.items():
            if lane < 3:
                cv2.line(frame, (end, 0), (end, FRAME_HEIGHT), (255, 255, 255), 1)
        positions = {1: 10, 2: 223, 3: 436}
        for lane, x in positions.items():
            cv2.putText(frame, f"Lane {lane}: {lane_counts[lane]}",
                        (x, 25), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 255), 2)