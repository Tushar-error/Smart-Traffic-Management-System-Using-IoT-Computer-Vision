"""
🚦 Simple Traffic Light Demo
Run this file and see basic traffic light + vehicle count simulation.
"""

import time
import random

DELAY = 0.7  # change speed here


class TrafficLight:
    def __init__(self, name):
        self.name = name
        self.color = "RED"

    def set(self, color):
        self.color = color
        print(f"🚦 {self.name}: {self.color}")


def basic_cycle():
    print("\n--- Basic Cycle ---")
    light = TrafficLight("Main Street")
    for color in ["RED", "YELLOW", "GREEN"]:
        light.set(color)
        time.sleep(DELAY)


def intersection_demo():
    print("\n--- 4-Way Intersection ---")
    lights = {d: TrafficLight(d) for d in ["North", "South", "East", "West"]}

    def show(ns_color, ew_color):
        for d in ["North", "South"]:
            lights[d].set(ns_color)
        for d in ["East", "West"]:
            lights[d].set(ew_color)

    print("North-South GREEN | East-West RED")
    show("GREEN", "RED")
    time.sleep(DELAY * 2)

    print("Switch...")
    show("RED", "GREEN")
    time.sleep(DELAY * 2)


def random_changes():
    print("\n--- Random Changes ---")
    light = TrafficLight("Random Street")
    for _ in range(5):
        light.set(random.choice(["RED", "YELLOW", "GREEN"]))
        time.sleep(DELAY / 2)


def vehicle_counter():
    print("\n--- Vehicle Counter ---")
    total = 0
    for _ in range(5):
        passed = random.randint(1, 3)
        total += passed
        print(f"🚗 {passed} vehicles passed | Total: {total}")
        time.sleep(DELAY / 2)
    print(f"📊 Final Total Vehicles: {total}")


def main():
    print("🎉 SMART TRAFFIC SYSTEM (SIMPLE DEMO) 🎉")
    basic_cycle()
    intersection_demo()
    random_changes()
    vehicle_counter()
    print("\n✅ Done!")


if __name__ == "__main__":
    main()
