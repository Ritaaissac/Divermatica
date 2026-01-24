
from flask import render_template
from flask_login import login_required


def init_app(app):
    # Home / index
    def index():
        return render_template('index.html')

    app.add_url_rule('/', endpoint='index', view_func=index, methods=['GET'])

    def boas_vindas():
            return render_template('boas_vindas.html')
    
    app.add_url_rule('/boas-vindas', endpoint='boas_vindas', view_func=boas_vindas, methods=['GET'])

    def sobre():
        return render_template('sobre.html')
    
    app.add_url_rule('/sobre', endpoint='sobre', view_func=sobre, methods=['GET'])

    def quiz():
        return render_template('quiz.html')
    
    app.add_url_rule('/quiz', endpoint='quiz', view_func=quiz, methods=['GET'])

    def perfil():
        return render_template('perfil.html')
    
    app.add_url_rule('/perfil', endpoint='perfil', view_func=perfil, methods=['GET'])


    # Jogos list (placeholder)
    
    def jogos_index():
        return render_template('jogos.html')

    app.add_url_rule('/jogos', endpoint='jogos_index', view_func=jogos_index, methods=['GET'])

    
    def jogo_memoria():
        return render_template('jogo_memoria.html')

    app.add_url_rule('/jogo-memoria', endpoint='jogo_memoria', view_func=jogo_memoria, methods=['GET'])

    
    def jogo_divisao():
        return render_template('jogo_divisao.html')

    app.add_url_rule('/jogo-divisao', endpoint='jogo_divisao', view_func=jogo_divisao, methods=['GET'])

   
    def jogo_multiplicacao():
        return render_template('jogo_multiplicacao.html')

    app.add_url_rule(
        '/jogo_multiplicacao',
        endpoint='jogo_multiplicacao',
        view_func=jogo_multiplicacao,
        methods=['GET']
    )

    
