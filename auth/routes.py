from flask import request, render_template, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db
from models.user import User
from flask_login import login_user, logout_user, login_required


def init_app(app):
    """Register auth-related routes on the given Flask app."""

    def cadastro():
        if request.method == 'POST':
            username = request.form.get('username')
            password = request.form.get('password')

            if User.query.filter_by(username=username).first():
                flash('Usuário já existe.')
                return redirect(url_for('auth_register'))

            hashed_password = generate_password_hash(password)
            novo_usuario = User(username=username, password=hashed_password)
            db.session.add(novo_usuario)
            db.session.commit()

            flash('Cadastro realizado com sucesso! Faça login.')
            return redirect(url_for('auth_login'))

        return render_template('cadastro.html')

    app.add_url_rule('/register', endpoint='auth_register', view_func=cadastro, methods=['GET', 'POST'])

    def login():
        if request.method == 'POST':
            username = request.form.get('username')
            password = request.form.get('password')

            user = User.query.filter_by(username=username).first()

            if user and check_password_hash(user.password, password):
                login_user(user)
                flash('Login realizado com sucesso!')
                return redirect(url_for('index'))

            flash('Usuário ou senha incorretos.')
            return redirect(url_for('auth_login'))

        return render_template('login.html')

    app.add_url_rule('/login', endpoint='auth_login', view_func=login, methods=['GET', 'POST'])

    def _logout():
        logout_user()
        flash('Você saiu da sua conta.')
        return redirect(url_for('index'))

    # protect logout route with login_required wrapper when registering
    app.add_url_rule('/logout', endpoint='logout', view_func=login_required(_logout), methods=['GET'])
