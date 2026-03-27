class LaneTracker:
    def __init__(self, window=5):
        self.window = window
        self.history = {1: [], 2: [], 3: []}

    def update(self, raw_counts: dict) -> dict:
        for lane in [1, 2, 3]:
            self.history[lane].append(raw_counts.get(lane, 0))
            if len(self.history[lane]) > self.window:
                self.history[lane].pop(0)

        return {
            lane: round(sum(self.history[lane]) / len(self.history[lane]))
            for lane in [1, 2, 3]
        }

    def get_congestion_level(self, count: int) -> str:
        if count == 0:
            return "CLEAR"
        elif count < 4:
            return "LOW"
        elif count < 8:
            return "MEDIUM"
        else:
            return "HIGH"