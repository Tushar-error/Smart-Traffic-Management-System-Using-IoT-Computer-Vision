from config import get_green_duration, MIN_GREEN_TIME, MAX_GREEN_TIME

def decide_signal(lane_counts: dict) -> dict:
    total = sum(lane_counts.values())

    green_lane = max(lane_counts, key=lane_counts.get)

    if total == 0:
        green_lane = 1

    duration = get_green_duration(lane_counts[green_lane])
    duration = max(MIN_GREEN_TIME, min(MAX_GREEN_TIME, duration))

    signals = {}
    for lane in [1, 2, 3]:
        if lane == green_lane:
            signals[lane] = "GREEN"
        else:
            signals[lane] = "RED"

    congestion = {}
    for lane in [1, 2, 3]:
        c = lane_counts[lane]
        if c == 0:
            congestion[lane] = "CLEAR"
        elif c < 4:
            congestion[lane] = "LOW"
        elif c < 8:
            congestion[lane] = "MEDIUM"
        else:
            congestion[lane] = "HIGH"

    return {
        "green_lane": green_lane,
        "signals": signals,
        "durations": {lane: get_green_duration(lane_counts[lane]) for lane in [1, 2, 3]},
        "green_duration": duration,
        "congestion": congestion,
        "counts": lane_counts,
        "total_vehicles": total
    }