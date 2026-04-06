// ============================================================
//  Smart Traffic Management System — ESP32 Firmware
//  4-Lane X-Intersection Controller
//  Lanes: NORTH=1  EAST=2  SOUTH=3  WEST=4
//
//  Serial Commands (from Python backend):
//    'Y'       → All Yellow (transition phase, 3 sec)
//    '1'       → NORTH Green (others Red)
//    '2'       → EAST  Green (others Red)
//    '3'       → SOUTH Green (others Red)
//    '4'       → WEST  Green (others Red)
//    'R'       → All Red  (emergency / manual override)
//    'S'       → Status report (prints current lane)
// ============================================================

// --- NORTH (Lane 1) ---
#define L1_RED    23
#define L1_YELLOW 22
#define L1_GREEN  21

// --- EAST (Lane 2) ---
#define L2_RED    19
#define L2_YELLOW 18
#define L2_GREEN   5

// --- SOUTH (Lane 3) ---
#define L3_RED    17
#define L3_YELLOW 16
#define L3_GREEN   4

// --- WEST (Lane 4) ---
#define L4_RED    14
#define L4_YELLOW 12
#define L4_GREEN  13

// ── Pin array (all 12 LED pins) ──────────────────────────────
const int PIN_COUNT = 12;
int allPins[PIN_COUNT] = {
  L1_RED, L1_YELLOW, L1_GREEN,
  L2_RED, L2_YELLOW, L2_GREEN,
  L3_RED, L3_YELLOW, L3_GREEN,
  L4_RED, L4_YELLOW, L4_GREEN
};

// Lane names for serial feedback
const char* laneNames[5] = {"", "NORTH", "EAST", "SOUTH", "WEST"};

// Track which lane is currently green (-1 = none)
int currentGreenLane = -1;

// ── Helpers ──────────────────────────────────────────────────
void allOff() {
  for (int i = 0; i < PIN_COUNT; i++) {
    digitalWrite(allPins[i], LOW);
  }
}

void allRed() {
  allOff();
  digitalWrite(L1_RED, HIGH);
  digitalWrite(L2_RED, HIGH);
  digitalWrite(L3_RED, HIGH);
  digitalWrite(L4_RED, HIGH);
}

void allYellow() {
  allOff();
  digitalWrite(L1_YELLOW, HIGH);
  digitalWrite(L2_YELLOW, HIGH);
  digitalWrite(L3_YELLOW, HIGH);
  digitalWrite(L4_YELLOW, HIGH);
}

// Set one lane GREEN, all others RED
void setGreen(int lane) {
  if (lane < 1 || lane > 4) return;

  allRed(); // Safety: all red first

  switch (lane) {
    case 1:
      digitalWrite(L1_RED,   LOW);
      digitalWrite(L1_GREEN, HIGH);
      break;
    case 2:
      digitalWrite(L2_RED,   LOW);
      digitalWrite(L2_GREEN, HIGH);
      break;
    case 3:
      digitalWrite(L3_RED,   LOW);
      digitalWrite(L3_GREEN, HIGH);
      break;
    case 4:
      digitalWrite(L4_RED,   LOW);
      digitalWrite(L4_GREEN, HIGH);
      break;
  }

  currentGreenLane = lane;
  Serial.print("[OK] ");
  Serial.print(laneNames[lane]);
  Serial.println(" GREEN");
}

// ── Setup ─────────────────────────────────────────────────────
void setup() {
  Serial.begin(9600);

  // Configure all LED pins as output, start LOW
  for (int i = 0; i < PIN_COUNT; i++) {
    pinMode(allPins[i], OUTPUT);
    digitalWrite(allPins[i], LOW);
  }

  // Safe startup state: all red
  allRed();

  Serial.println("============================================");
  Serial.println("  Smart Traffic ESP32 — 4 Lane Mode Ready  ");
  Serial.println("  N=1  E=2  S=3  W=4  | Y=Yellow  R=AllRed");
  Serial.println("============================================");
}

// ── Main Loop ─────────────────────────────────────────────────
void loop() {
  if (Serial.available() > 0) {
    char data = Serial.read();

    if (data == 'Y') {
      // --- Transition: yellow flash before lane switch ---
      allYellow();
      Serial.println("[YELLOW] Transitioning...");
      delay(3000);
      // After yellow, hold all-red until next command
      allRed();
      Serial.println("[RED] Waiting for lane command...");
    }

    else if (data >= '1' && data <= '4') {
      // --- Set the green lane ---
      int lane = data - '0'; // char '1'-'4' → int 1-4
      setGreen(lane);
    }

    else if (data == 'R') {
      // --- Emergency / manual all-red override ---
      allRed();
      currentGreenLane = -1;
      Serial.println("[OVERRIDE] ALL RED");
    }

    else if (data == 'S') {
      // --- Status ping ---
      if (currentGreenLane == -1) {
        Serial.println("[STATUS] No lane active (All Red)");
      } else {
        Serial.print("[STATUS] Current GREEN: ");
        Serial.println(laneNames[currentGreenLane]);
      }
    }
  }
}
