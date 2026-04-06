import sqlite3
import json
from datetime import datetime
from config import DB_PATH

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS traffic_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            lane1_count INTEGER,
            lane2_count INTEGER,
            lane3_count INTEGER,
            lane4_count INTEGER,
            green_lane INTEGER,
            total_vehicles INTEGER,
            congestion TEXT
        )
    ''')
    conn.commit()
    conn.close()
    print("[DB] Database initialized.")

def log_traffic(decision: dict):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        INSERT INTO traffic_logs
        (timestamp, lane1_count, lane2_count, lane3_count, lane4_count, green_lane, total_vehicles, congestion)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        datetime.now().isoformat(),
        decision["counts"].get(1, 0),
        decision["counts"].get(2, 0),
        decision["counts"].get(3, 0),
        decision["counts"].get(4, 0),
        decision["green_lane"],
        decision["total_vehicles"],
        json.dumps(decision["congestion"])
    ))
    conn.commit()
    conn.close()

def get_recent_logs(limit=50):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        SELECT timestamp, lane1_count, lane2_count, lane3_count, lane4_count,
               green_lane, total_vehicles
        FROM traffic_logs
        ORDER BY id DESC
        LIMIT ?
    ''', (limit,))
    rows = c.fetchall()
    conn.close()

    return [
        {
            "timestamp": r[0],
            "lane1": r[1],
            "lane2": r[2],
            "lane3": r[3],
            "lane4": r[4],
            "green_lane": r[5],
            "total": r[6]
        }
        for r in rows
    ]