from flask import Flask
from flask_cors import CORS
from app.extensions import db, migrate
from app.config import Config

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Register blueprints
    from app.routes.traffic_routes import traffic_bp
    from app.routes.history_routes import history_bp
    from app.routes.settings_routes import settings_bp
    
    app.register_blueprint(traffic_bp, url_prefix='/api/traffic')
    app.register_blueprint(history_bp, url_prefix='/api/history')
    app.register_blueprint(settings_bp, url_prefix='/api/settings')
    
    return app
