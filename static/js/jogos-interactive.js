// Interatividade adicional para a página de jogos

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.jogo-card');

    // Adicionar efeito de som ao passar o mouse (opcional)
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Efeito visual
            this.style.transform = 'translateY(-15px) scale(1.05)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });

        // Feedback ao clicar
        card.addEventListener('click', function(e) {
            if (this.querySelector('.btn-jogar:disabled')) {
                e.preventDefault();
                this.classList.add('shake');
                setTimeout(() => {
                    this.classList.remove('shake');
                }, 500);
            }
        });
    });

    // Animação de shake para cards desativados
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-10px); }
            75% { transform: translateX(10px); }
        }
        .jogo-card.shake {
            animation: shake 0.4s;
        }
    `;
    document.head.appendChild(style);
});
