import serial
import time
from config import SERIAL_PORT, BAUD_RATE, SERIAL_TIMEOUT, YELLOW_DURATION

DIRECTION_NAMES = {1: "NORTH", 2: "EAST", 3: "SOUTH", 4: "WEST"}

class ESP32Controller:
    def __init__(self):
        self.connected = False
        self.ser = None
        self.current_lane = None
        self._connect()

    def _connect(self):
        try:
            self.ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=SERIAL_TIMEOUT)
            time.sleep(2)  # Wait for ESP32 to reboot after serial connect
            self.connected = True
            print(f"[ESP32] Connected on {SERIAL_PORT} at {BAUD_RATE} baud")
            # Flush any startup garbage from the buffer
            self.ser.reset_input_buffer()
        except Exception as e:
            print(f"[ESP32] Not connected — running in simulation mode. ({e})")
            self.connected = False

    def send_signal(self, green_lane: int):
        """
        Send a lane-switch command to the ESP32.
        Sequence: Yellow (transition) → wait → Green lane command
        """
        if green_lane not in DIRECTION_NAMES:
            print(f"[ESP32] Invalid lane: {green_lane}. Must be 1-4.")
            return

        if self.current_lane == green_lane:
            return  # Already green, no need to resend

        name = DIRECTION_NAMES[green_lane]

        # Step 1: Send Yellow transition
        self._send("Y")
        print(f"[ESP32] YELLOW — transitioning to {name}...")
        time.sleep(YELLOW_DURATION)

        # Step 2: Send Green command ('1', '2', '3', or '4')
        self._send(str(green_lane))
        self.current_lane = green_lane
        print(f"[ESP32] {name} → GREEN")

    def all_red(self):
        """Force all lanes to RED (emergency override)."""
        self._send("R")
        self.current_lane = None
        print("[ESP32] ALL RED (override)")

    def get_status(self):
        """Ping the ESP32 for its current status."""
        self._send("S")

    def _send(self, cmd: str):
        if self.connected:
            try:
                self.ser.write(cmd.encode())
                self.ser.flush()
            except Exception as e:
                print(f"[ESP32] Send error: {e}")
                self.connected = False  # Mark as disconnected on error
        else:
            name = DIRECTION_NAMES.get(int(cmd), cmd) if cmd.isdigit() else cmd
            print(f"[ESP32 SIM] Command: '{cmd}' → {name if cmd.isdigit() else cmd}")

    def close(self):
        if self.ser and self.connected:
            self.all_red()  # Safe state before disconnect
            time.sleep(0.5)
            self.ser.close()
            print("[ESP32] Connection closed.")

    @property
    def status(self):
        return "connected" if self.connected else "simulation"