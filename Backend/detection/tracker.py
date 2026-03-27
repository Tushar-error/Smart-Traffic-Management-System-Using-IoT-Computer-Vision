class LaneTracker:
    def __init__(self, window=5):
        self.window = window
        self.history = {}

    def update(self, raw_counts: dict) -> dict:
        for lane, count in raw_counts.items():
            if lane not in self.history:
                self.history[lane] = []
            self.history[lane].append(count)
            if len(self.history[lane]) > self.window:
                self.history[lane].pop(0)

        return {
            lane: round(sum(counts) / len(counts))
            for lane, counts in self.history.items()
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