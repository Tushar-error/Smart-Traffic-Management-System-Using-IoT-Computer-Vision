from config import get_green_duration, MIN_GREEN_TIME, MAX_GREEN_TIME

def decide_signal(lane_counts: dict) -> dict:
    total = sum(lane_counts.values())

    green_lane = max(lane_counts, key=lane_counts.get)

    if total == 0:
        green_lane = next(iter(lane_counts)) # Default to first key (usually North)

    duration = get_green_duration(lane_counts[green_lane])
    duration = max(MIN_GREEN_TIME, min(MAX_GREEN_TIME, duration))

    signals = {}
    for lane in lane_counts.keys():
        if lane == green_lane:
            signals[lane] = "GREEN"
        else:
            signals[lane] = "RED"

    congestion = {}
    for lane, count in lane_counts.items():
        if count == 0:
            congestion[lane] = "CLEAR"
        elif count < 4:
            congestion[lane] = "LOW"
        elif count < 8:
            congestion[lane] = "MEDIUM"
        else:
            congestion[lane] = "HIGH"

    return {
        "green_lane": green_lane,
        "signals": signals,
        "durations": {lane: get_green_duration(count) for lane, count in lane_counts.items()},
        "green_duration": duration,
        "congestion": congestion,
        "counts": lane_counts,
        "total_vehicles": total
    }