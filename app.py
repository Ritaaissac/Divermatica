import os
from flask import Flask

from controllers import main_controller, product_controller


def create_app():
    app = Flask(__name__)

    # Registra rotas de autenticação
    main_controller.init_app(app)
    product_controller.init_app(app)


    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
