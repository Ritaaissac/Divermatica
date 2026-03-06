class JogoArraste {
    constructor() {
        this.score = 0;
        this.correctAnswer = 0;
        this.num1El = document.getElementById('num1');
        this.num2El = document.getElementById('num2');
        this.dropzone = document.getElementById('dropzone');
        this.numerosContainer = document.getElementById('numeros');
        this.scoreEl = document.getElementById('score');
        this.novoJogoBtn = document.getElementById('novo-jogo');
        
        this.init();
    }

    init() {
        this.gerarNovaConta();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Drag and drop events
        this.dropzone.addEventListener('dragover', this.handleDragOver.bind(this));
        this.dropzone.addEventListener('dragleave', this.handleDragLeave.bind(this));
        this.dropzone.addEventListener('drop', this.handleDrop.bind(this));
        
        // Touch events for mobile
        this.dropzone.addEventListener('touchstart', this.handleTouchStart.bind(this));
        this.dropzone.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Novo jogo button
        this.novoJogoBtn.addEventListener('click', () => {
            this.resetJogo();
        });
        
        // Prevent default drag behavior on document
        document.addEventListener('dragover', (e) => e.preventDefault());
        document.addEventListener('drop', (e) => e.preventDefault());
    }

    gerarNovaConta() {
        this.numerosContainer.innerHTML = '';
        
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        this.correctAnswer = num1 + num2;
        
        this.num1El.textContent = num1;
        this.num2El.textContent = num2;
        this.dropzone.textContent = '?';
        this.dropzone.classList.remove('drag-over');
        
        // Generate options (correct answer + 5 random wrong ones)
        const opcoes = new Set();
        opcoes.add(this.correctAnswer);
        
        while (opcoes.size < 6) {
            const randomNum = Math.floor(Math.random() * 20) + 1;
            if (randomNum !== this.correctAnswer) {
                opcoes.add(randomNum);
            }
        }
        
        // Shuffle options
        const opcoesArray = Array.from(opcoes).sort(() => Math.random() - 0.5);
        
        // Create draggable number elements
        opcoesArray.forEach(num => {
            const numeroEl = document.createElement('div');
            numeroEl.className = 'numero-draggable';
            numeroEl.textContent = num;
            numeroEl.draggable = true;
            
            // Desktop drag events
            numeroEl.addEventListener('dragstart', this.handleDragStart.bind(this));
            numeroEl.addEventListener('dragend', this.handleDragEnd.bind(this));
            
            // Touch events for mobile
            numeroEl.addEventListener('touchstart', this.handleTouchStart.bind(this));
            numeroEl.addEventListener('touchmove', this.handleTouchMove.bind(this));
            numeroEl.addEventListener('touchend', this.handleTouchEnd.bind(this));
            
            this.numerosContainer.appendChild(numeroEl);
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.textContent);
        e.target.classList.add('drag-start');
        this.dropzone.classList.add('drag-over');
    }

    handleDragEnd(e) {
        e.target.classList.remove('drag-start');
        this.dropzone.classList.remove('drag-over');
    }

    handleDragOver(e) {
        e.preventDefault();
        this.dropzone.classList.add('drag-over');
    }

    handleDragLeave(e) {
        if (!this.dropzone.contains(e.relatedTarget)) {
            this.dropzone.classList.remove('drag-over');
        }
    }

    handleDrop(e) {
        e.preventDefault();
        this.dropzone.classList.remove('drag-over');
        
        const resposta = parseInt(e.dataTransfer.getData('text/plain'));
        this.verificarResposta(resposta);
    }

    handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.draggedElement = e.target;
        this.draggedElement.classList.add('drag-start');
    }

    handleTouchMove(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        const touch = e.touches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        
        this.draggedElement.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        
        // Check if touching dropzone
        const dropRect = this.dropzone.getBoundingClientRect();
        const isOverDropzone = (
            touch.clientX >= dropRect.left &&
            touch.clientX <= dropRect.right &&
            touch.clientY >= dropRect.top &&
            touch.clientY <= dropRect.bottom
        );
        
        if (isOverDropzone) {
            this.dropzone.classList.add('drag-over');
        } else {
            this.dropzone.classList.remove('drag-over');
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        if (!this.draggedElement) return;
        
        this.draggedElement.style.transform = '';
        this.draggedElement.classList.remove('drag-start');
        
        const touch = e.changedTouches[0];
        const dropRect = this.dropzone.getBoundingClientRect();
        const isOverDropzone = (
            touch.clientX >= dropRect.left &&
            touch.clientX <= dropRect.right &&
            touch.clientY >= dropRect.top &&
            touch.clientY <= dropRect.bottom
        );
        
        if (isOverDropzone) {
            const resposta = parseInt(this.draggedElement.textContent);
            this.verificarResposta(resposta);
        }
        
        this.dropzone.classList.remove('drag-over');
        this.draggedElement = null;
    }

    verificarResposta(resposta) {
        if (resposta === this.correctAnswer) {
            this.score++;
            this.scoreEl.textContent = this.score;
            this.mostrarFeedback('acertou');
            setTimeout(() => {
                this.gerarNovaConta();
            }, 1000);
        } else {
            this.mostrarFeedback('errou');
            setTimeout(() => {
                this.gerarNovaConta();
            }, 1000);
        }
    }

    mostrarFeedback(tipo) {
        this.dropzone.classList.add(tipo);
        setTimeout(() => {
            this.dropzone.classList.remove(tipo);
        }, 500);
    }

    resetJogo() {
        this.score = 0;
        this.scoreEl.textContent = this.score;
        this.gerarNovaConta();
    }

}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JogoArraste();
});

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new JogoArraste();
});