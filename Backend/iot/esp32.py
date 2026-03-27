import serial
import time
from config import SERIAL_PORT, BAUD_RATE, SERIAL_TIMEOUT, YELLOW_DURATION

class ESP32Controller:
    def __init__(self):
        self.connected = False
        self.ser = None
        self.current_lane = None
        self._connect()

    def _connect(self):
        try:
            self.ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=SERIAL_TIMEOUT)
            time.sleep(2)
            self.connected = True
            print(f"[ESP32] Connected on {SERIAL_PORT}")
        except Exception as e:
            print(f"[ESP32] Not connected — simulation mode. ({e})")
            self.connected = False

    def send_signal(self, green_lane: int):
        if self.current_lane == green_lane:
            return

        self._send("Y")
        time.sleep(YELLOW_DURATION)

        command = str(green_lane)
        self._send(command)
        self.current_lane = green_lane
        print(f"[ESP32] Lane {green_lane} → GREEN")

    def _send(self, cmd: str):
        if self.connected:
            try:
                self.ser.write(cmd.encode())
            except Exception as e:
                print(f"[ESP32] Send error: {e}")
        else:
            print(f"[ESP32 SIM] Command: {cmd}")

    def close(self):
        if self.ser and self.connected:
            self.ser.close()

    @property
    def status(self):
        return "connected" if self.connected else "simulation"