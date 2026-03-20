
from flask import render_template
from flask_login import login_required


def init_app(app):
    # Home / index
    def index():
        return render_template('index.html')

    app.add_url_rule('/', endpoint='index', view_func=index, methods=['GET'])

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

    def quiz_contas():
        return render_template('quiz_contas.html')
    app.add_url_rule('/quiz-contas', endpoint='quiz_contas', view_func=quiz_contas, methods=['GET'])
    
    def quiz_contexto():
        return render_template('quiz_contexto.html')
    app.add_url_rule('/quiz-contexto', endpoint='quiz_contexto', view_func=quiz_contexto, methods=['GET'])

   
    def jogo_multiplicacao():
        return render_template('jogo_multiplicacao.html')

    app.add_url_rule(
        '/jogo_multiplicacao',
        endpoint='jogo_multiplicacao',
        view_func=jogo_multiplicacao,
        methods=['GET']
    )

    def chuva():
        return render_template('chuva.html')

    app.add_url_rule(
        '/chuva',
        endpoint='chuva',
        view_func=chuva,
        methods=['GET']
    )

    
    def jogo_adicao():
        return render_template('jogo_adicao.html')

    app.add_url_rule('/jogo-adicao', endpoint='jogo_adicao', view_func=jogo_adicao, methods=['GET'])

    def jogo_subtracao():
        return render_template('jogo_subtracao.html')

    app.add_url_rule('/jogo-subtracao', endpoint='jogo_subtracao', view_func=jogo_subtracao, methods=['GET'])
    
