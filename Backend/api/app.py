# app.py — Flask app factory

from flask import Flask
from flask_cors import CORS
from api.routes import api
from config import FLASK_PORT, FLASK_DEBUG

def create_app():
    app = Flask(__name__)
    CORS(app, origins=["http://localhost:5173", "http://localhost:3000"])
    app.register_blueprint(api)
    return app

if __name__ == "__main__":
    from traffic.database import init_db
    init_db()
    app = create_app()
    print(f"[API] Running on http://localhost:{FLASK_PORT}")
    app.run(port=FLASK_PORT, debug=FLASK_DEBUG)