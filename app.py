from flask import Flask, render_template, request, redirect, url_for, flash, abort, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, login_user, login_required, logout_user, current_user, UserMixin
from werkzeug.security import generate_password_hash, check_password_hash
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'sua_chave_secreta'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usuarios.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(150), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cadastro', methods=['GET', 'POST'])
def cadastro():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if User.query.filter_by(username=username).first():
            flash('Usuário já existe.')
            return redirect(url_for('cadastro'))
        hashed_password = generate_password_hash(password)
        novo_usuario = User(username=username, password=hashed_password)
        db.session.add(novo_usuario)
        db.session.commit()
        flash('Cadastro realizado com sucesso! Faça login.')
        return redirect(url_for('login'))
    return render_template('cadastro.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password, password):
            login_user(user)
            flash('Login realizado com sucesso!')
            return redirect(url_for('index'))
        else:
            flash('Usuário ou senha incorretos.')
            return redirect(url_for('login'))
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Você saiu da sua conta.')
    return redirect(url_for('index'))


@app.route('/jogo-memoria')
@login_required
def jogo_memoria():
    return render_template('jogo_memoria.html')

@app.route('/jogo-divisao')
@login_required
def jogo_divisao():
    return render_template('jogo_divisao.html')



if __name__ == '__main__':
    if not os.path.exists('usuarios.db'):
        with app.app_context():
            db.create_all()
    app.run(debug=True)
