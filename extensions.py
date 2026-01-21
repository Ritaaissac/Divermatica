from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def init_app(app):
    """Initialize Flask extensions with the app"""
    db.init_app(app)
