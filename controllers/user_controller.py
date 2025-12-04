from flask import render_template
from flask_login import login_required


def init_app(app):
    @login_required
    def perfil():
        return render_template('perfil.html')

    app.add_url_rule('/perfil', endpoint='perfil', view_func=perfil, methods=['GET'])
