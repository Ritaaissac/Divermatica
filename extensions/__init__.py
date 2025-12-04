from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager

db = SQLAlchemy()
login_manager = LoginManager()


def init_app(app):
    """Initialize extensions with the Flask app."""
    db.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'auth_login'

    # Lazy import to avoid circular imports
    from models.user import User

    @login_manager.user_loader
    def _load_user(user_id):
        try:
            return User.query.get(int(user_id))
        except Exception:
            return None
