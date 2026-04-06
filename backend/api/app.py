# app.py — Flask app factory

from flask import Flask
from flask_cors import CORS
from api.routes import api
from config import FLASK_PORT, FLASK_DEBUG
from api.background import TrafficSystem

import os

def create_app():
    app = Flask(__name__)
    allowed_origins = os.environ.get("CORS_ALLOWED_ORIGINS", "*").split(",")
    CORS(app, origins=allowed_origins)
    app.register_blueprint(api)
    
    # Start the background traffic monitoring system
    TrafficSystem.start()
    
    return app

if __name__ == "__main__":
    from traffic.database import init_db
    init_db()
    app = create_app()
    print(f"[API] Running on http://localhost:{FLASK_PORT}")
    app.run(port=FLASK_PORT, debug=FLASK_DEBUG)