import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from traffic.algorithm import decide_signal
from config import NORTH, EAST, SOUTH, WEST

def test_logic():
    print("--- Testing 4-Way Traffic Logic ---")
    
    # Case 1: All clear
    counts = {NORTH: 0, EAST: 0, SOUTH: 0, WEST: 0}
    decision = decide_signal(counts)
    print(f"Empty Intersection: Green -> {decision['green_lane']} (Expected: NORTH/1)")
    
    # Case 2: North Busy
    counts = {NORTH: 10, EAST: 2, SOUTH: 5, WEST: 1}
    decision = decide_signal(counts)
    print(f"North Busy: Green -> {decision['green_lane']} (Expected: NORTH/1), Duration: {decision['green_duration']}s")
    
    # Case 3: West Busy
    counts = {NORTH: 3, EAST: 4, SOUTH: 2, WEST: 15}
    decision = decide_signal(counts)
    print(f"West Busy: Green -> {decision['green_lane']} (Expected: WEST/4), Duration: {decision['green_duration']}s")
    
    # Case 4: Equal counts (should pick first max)
    counts = {NORTH: 5, EAST: 5, SOUTH: 5, WEST: 5}
    decision = decide_signal(counts)
    print(f"Equal Busy: Green -> {decision['green_lane']}, Counts: {decision['counts']}")

if __name__ == "__main__":
    test_logic()
