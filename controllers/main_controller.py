from flask import render_template


def init_app(app):
    # Home / index
    def index():
        return render_template('index.html')

    app.add_url_rule('/', endpoint='index', view_func=index, methods=['GET'])

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

    def sobre():
        return render_template('sobre.html')

    app.add_url_rule('/sobre', endpoint='sobre', view_func=sobre, methods=['GET'])

    def ajuda():
        return render_template('ajuda.html')

    app.add_url_rule('/ajuda', endpoint='ajuda', view_func=ajuda, methods=['GET'])

    def politica_privacidade():
        return render_template('politica_privacidade.html')

    app.add_url_rule('/politica-privacidade', endpoint='politica_privacidade', view_func=politica_privacidade, methods=['GET'])
