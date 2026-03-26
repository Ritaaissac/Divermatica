import os
from flask import Flask
from config import Config
from extensions import init_app, db

from controllers import main_controller, product_controller


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_app(app)

 
    main_controller.init_app(app)
    product_controller.init_app(app)

    if not os.path.exists('usuarios.db'):
        with app.app_context():
            db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
