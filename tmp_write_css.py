from pathlib import Path
css = '''@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&display=swap');

html, body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-family: 'Poppins', 'Baloo 2', 'Arial Rounded MT Bold', Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    background: radial-gradient(circle at top left, #f8efff 0%, #ffffff 55%);
    overflow-x: hidden;
}

body {
    width: 100%;
}

.jogo-area {
    position: relative;
    background: #ffffff;
    padding: 40px 32px 32px;
    border-radius: 32px;
    box-shadow: 0 22px 45px rgba(78, 47, 132, 0.12);
    max-width: 720px;
    width: min(95%, 720px);
    text-align: center;
    z-index: 2;
}

.circle {
    position: absolute;
    border-radius: 50%;
    z-index: 0;
    opacity: 0.45;
}

.circle-left {
    width: 240px;
    height: 240px;
    top: -90px;
    left: -80px;
    background: #f7e3ff;
}

.circle-bottom {
    width: 260px;
    height: 260px;
    bottom: -90px;
    right: -100px;
    background: #e9f1ff;
}

.favocima,
.favobaixo {
    position: absolute;
    width: clamp(90px, 16vw, 180px);
    height: auto;
    z-index: 1;
}

.favocima {
    top: 18px;
    right: 18px;
}

.favobaixo {
    bottom: -18px;
    left: -12px;
}

.mascote_abelha {
    position: absolute;
    top: 24px;
    right: 24px;
    width: clamp(170px, 22vw, 240px);
    height: auto;
    z-index: 0;
}

.titulo-jogo {
    color: #b450f2;
    font-size: clamp(1.65rem, 2.4vw, 2.15rem);
    margin-bottom: 18px;
    text-transform: capitalize;
    letter-spacing: 0.04em;
    text-shadow: 0 2px 12px rgba(180, 80, 242, 0.16);
}

.operacao {
    font-size: 1.95rem;
    margin-bottom: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    color: #7b41d3;
}

.resposta-drop {
    width: 90px;
    height: 90px;
    border: 3px dashed #a259ff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    background: #e7d5ff;
    transition: all 0.25s ease;
}

.resposta-drop.drag-over {
    background: #e3f2fd;
    border-color: #2196f3;
    transform: scale(1.04);
}

.numeros-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
    gap: 18px;
    margin-bottom: 32px;
    justify-items: center;
}

.numero-draggable {
    width: 80px;
    height: 80px;
    background: linear-gradient(180deg, #d7ffd8 0%, #a8ffb0 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 800;
    color: #2a2a2a;
    cursor: grab;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    position: relative;
    user-select: none;
}

.numero-draggable:hover {
    transform: translateY(-4px) scale(1.03);
}

.numero-draggable:active {
    cursor: grabbing;
    transform: translateY(-2px) scale(0.98);
}

.numero-draggable.drag-start {
    opacity: 0.5;
    animation: bounce 0.3s;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
}

.controles {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 18px;
}

#novo-jogo {
    background: #9932cc;
    color: #ffffff;
    border: none;
    padding: 14px 28px;
    border-radius: 28px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    box-shadow: 0 8px 18px rgba(153, 50, 204, 0.28);
}

#novo-jogo:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(153, 50, 204, 0.35);
}

#novo-jogo:active {
    transform: translateY(0);
}

.resposta-drop.acertou {
    background: #c4ffd9;
    border-color: #2eb82e;
}

.resposta-drop.errou {
    background: #ffcccb;
    border-color: #e63946;
}

.pontuacao {
    font-size: 1.15rem;
    font-weight: 700;
    color: #2b2b2b;
}

#score {
    color: #5b6cf7;
}

@media (max-width: 768px) {
    body {
        align-items: flex-start;
        padding: 28px 0;
    }

    .jogo-area {
        padding: 24px 22px 26px;
    }

    .operacao {
        font-size: 1.75rem;
        gap: 12px;
    }

    .resposta-drop, .numero-draggable {
        width: 70px;
        height: 70px;
        font-size: 1.4rem;
    }

    .numeros-container {
        gap: 14px;
    }

    .controles {
        flex-direction: column;
        align-items: stretch;
    }

    .favocima,
    .favobaixo,
    .mascote_abelha,
    .circle {
        display: none;
    }
}

@media (max-width: 480px) {
    .jogo-area {
        padding: 20px 18px 22px;
    }

    .operacao {
        font-size: 1.45rem;
    }

    .resposta-drop, .numero-draggable {
        width: 60px;
        height: 60px;
        font-size: 1.25rem;
    }

    .numeros-container {
        grid-template-columns: repeat(3, 1fr);
    }
}
'''
Path('static/css/jogo-adicao.css').write_text(css, encoding='utf-8')
