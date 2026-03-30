from flask import request, jsonify, session, redirect, url_for, render_template
from extensions import db
from models.user import User
from auth.utils import hash_password, verify_password

def init_app(app):
    """Inicializa rotas de autenticação"""
    
    @app.route('/cadastro', methods=['GET', 'POST'])
    def cadastro():
        if request.method == 'GET':
            return render_template('cadastro.html')
        
        if request.method == 'POST':
            data = request.get_json()
            username = data.get('username', '').strip()
            password = data.get('password', '').strip()
            password_confirm = data.get('password_confirm', '').strip()
            
            # Validações
            if not username or not password:
                return jsonify({'success': False, 'message': 'Usuário e senha são obrigatórios'}), 400
            
            if password != password_confirm:
                return jsonify({'success': False, 'message': 'Senhas não conferem'}), 400
            
            if len(password) < 6:
                return jsonify({'success': False, 'message': 'Senha deve ter no mínimo 6 caracteres'}), 400
            
            # Verifica se usuário já existe
            existing_user = User.query.filter_by(username=username).first()
            if existing_user:
                return jsonify({'success': False, 'message': 'Usuário já existe'}), 400
            
            # Cria novo usuário
            new_user = User(username=username, password=hash_password(password))
            db.session.add(new_user)
            db.session.commit()
            
            # Salva na sessão
            session['user_id'] = new_user.id
            session['username'] = new_user.username
            
            return jsonify({'success': True, 'message': 'Cadastro realizado com sucesso!', 'redirect': url_for('jogos_index')}), 201
    
    
    @app.route('/api/login', methods=['POST'])
    def api_login():
        """Rota de login via API (POST)"""
        data = request.get_json()
        username = data.get('username', '').strip()
        password = data.get('password', '').strip()
        
        if not username or not password:
            return jsonify({'success': False, 'message': 'Usuário e senha são obrigatórios'}), 400
        
        # Busca usuário no banco
        user = User.query.filter_by(username=username).first()
        
        if user and verify_password(user.password, password):
            # Login bem-sucedido
            session['user_id'] = user.id
            session['username'] = user.username
            return jsonify({'success': True, 'message': 'Login realizado!', 'redirect': url_for('jogos_index')}), 200
        
        return jsonify({'success': False, 'message': 'Usuário ou senha incorretos'}), 401
    
    
    @app.route('/api/logout', methods=['POST'])
    def api_logout():
        """Rota de logout"""
        session.clear()
        return jsonify({'success': True, 'message': 'Logout realizado!'}), 200
    
    
    @app.route('/api/user', methods=['GET'])
    def get_user():
        """Retorna dados do usuário logado"""
        user_id = session.get('user_id')
        username = session.get('username')
        
        if user_id:
            return jsonify({
                'logged_in': True,
                'user_id': user_id,
                'username': username
            }), 200
        
        return jsonify({'logged_in': False}), 200
