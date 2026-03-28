#define L1_RED    23
#define L1_YELLOW 22
#define L1_GREEN  21

#define L2_RED    19
#define L2_YELLOW 18
#define L2_GREEN  5

#define L3_RED    17
#define L3_YELLOW 16
#define L3_GREEN  4

int allPins[] = {L1_RED, L1_YELLOW, L1_GREEN,
                 L2_RED, L2_YELLOW, L2_GREEN,
                 L3_RED, L3_YELLOW, L3_GREEN};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < 9; i++) {
    pinMode(allPins[i], OUTPUT);
    digitalWrite(allPins[i], LOW);
  }
  allRed();
  Serial.println("ESP32 Ready");
}

void allOff() {
  for (int i = 0; i < 9; i++) digitalWrite(allPins[i], LOW);
}

void allRed() {
  allOff();
  digitalWrite(L1_RED, HIGH);
  digitalWrite(L2_RED, HIGH);
  digitalWrite(L3_RED, HIGH);
}

void allYellow() {
  allOff();
  digitalWrite(L1_YELLOW, HIGH);
  digitalWrite(L2_YELLOW, HIGH);
  digitalWrite(L3_YELLOW, HIGH);
}

void setGreen(int lane) {
  allRed();
  if (lane == 1) { digitalWrite(L1_RED, LOW); digitalWrite(L1_GREEN, HIGH); }
  if (lane == 2) { digitalWrite(L2_RED, LOW); digitalWrite(L2_GREEN, HIGH); }
  if (lane == 3) { digitalWrite(L3_RED, LOW); digitalWrite(L3_GREEN, HIGH); }
}

void loop() {
  if (Serial.available()) {
    char data = Serial.read();

    if (data == 'Y') {
      allYellow();
      delay(3000);
    }
    else if (data == '1') { setGreen(1); Serial.println("Lane 1 GREEN"); }
    else if (data == '2') { setGreen(2); Serial.println("Lane 2 GREEN"); }
    else if (data == '3') { setGreen(3); Serial.println("Lane 3 GREEN"); }
  }
}

// Dummy change to allow testing git commit

