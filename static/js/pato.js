// script.js - jogo Pato da Divisão
(() => {
  // Elementos
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const startScreen = document.getElementById('start-screen');
  const gameEl = document.getElementById('game');
  const gameOverEl = document.getElementById('game-over');
  const questionEl = document.getElementById('question');
  const ducksEl = document.getElementById('ducks');
  const scoreEl = document.getElementById('score');
  const livesEl = document.getElementById('lives');
  const timerEl = document.getElementById('timer');
  const finalScoreEl = document.getElementById('final-score');

  // Estado
  let score = 0;
  let lives = 3;
  let timeLeft = 10;
  let timerId = null;
  let correctAnswer = null;

  // Config
  const POINTS = 10;
  const TIME_PER_QUESTION = 10;

  function resetState() {
    score = 0;
    lives = 3;
    timeLeft = TIME_PER_QUESTION;
    correctAnswer = null;
    updateHUD();
  }

  function updateHUD() {
    scoreEl.textContent = `Pontuação: ${score}`;
    livesEl.innerHTML = `Vidas: ${'❤️'.repeat(lives)}`;
    timerEl.textContent = `Tempo: ${timeLeft}s`;
  }

  function startGame() {
    resetState();
    startScreen.classList.add('hidden');
    gameOverEl.classList.add('hidden');
    gameEl.classList.remove('hidden');
    nextQuestion();
  }

  function endGame() {
    clearInterval(timerId);
    gameEl.classList.add('hidden');
    finalScoreEl.textContent = `Sua pontuação: ${score}`;
    gameOverEl.classList.remove('hidden');
  }

  function loseLife() {
    lives -= 1;
    if (lives <= 0) {
      lives = 0;
      updateHUD();
      endGame();
    } else {
      updateHUD();
      nextQuestion();
    }
  }

  function pickOptions(correct) {
    // Gera 3 alternativas erradas (distintas e plausíveis)
    const opts = new Set();
    opts.add(correct);
    while (opts.size < 4) {
      // variação relativa: +/- até 40% ou número pequeno
      let delta = Math.floor(Math.random() * Math.max(3, Math.floor(correct * 0.4))) + 1;
      if (Math.random() < 0.5) delta = -delta;
      let candidate = correct + delta;
      if (candidate <= 0) candidate = Math.abs(candidate) + 2;
      opts.add(candidate);
    }
    // Embaralhar e retornar array
    return shuffle(Array.from(opts));
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function difficultySettings() {
    // aumenta intervalo de quociente conforme pontuação
    // retorna maxQuotient
    if (score < 40) return 10;
    if (score < 100) return 18;
    return 30;
  }

  function generateDivision() {
    const maxQuot = difficultySettings();
    const quotient = Math.floor(Math.random() * (maxQuot - 1)) + 2; // 2..maxQuot
    const divisor = Math.floor(Math.random() * 11) + 2; // 2..12
    const dividend = quotient * divisor;
    return { dividend, divisor, quotient };
  }

  function nextQuestion() {
    clearInterval(timerId);
    timeLeft = TIME_PER_QUESTION;
    updateHUD();

    const { dividend, divisor, quotient } = generateDivision();
    correctAnswer = quotient;
    questionEl.textContent = `${dividend} ÷ ${divisor} = ?`;

    // montar opções
    const options = pickOptions(quotient);

    // limpar e renderizar
    ducksEl.innerHTML = '';
    options.forEach((num) => {
      const btn = document.createElement('button');
      btn.className = 'duck';
      btn.setAttribute('data-value', String(num));
      btn.innerHTML = `
        <div class="duck-emoji" aria-hidden="true">🦆</div>
        <div class="num">${num}</div>
      `;
      btn.addEventListener('click', onDuckClick);
      ducksEl.appendChild(btn);
    });

    // iniciar timer
    timerId = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(timerId);
        timerEl.textContent = `Tempo: 0s`;
        // tratar como erro por tempo esgotado
        handleWrongSelection(null, true);
      } else {
        timerEl.textContent = `Tempo: ${timeLeft}s`;
      }
    }, 1000);
  }

  function onDuckClick(e) {
    const btn = e.currentTarget;
    const value = Number(btn.getAttribute('data-value'));
    if (value === correctAnswer) {
      handleCorrectSelection(btn);
    } else {
      handleWrongSelection(btn, false);
    }
  }

  function handleCorrectSelection(btn) {
    clearInterval(timerId);
    score += POINTS;
    updateHUD();
    // animação visual
    if (btn) {
      btn.classList.add('correct');
    }
    // brevíssima espera antes da próxima pergunta para efeito
    setTimeout(() => {
      nextQuestion();
    }, 700);
  }

  function handleWrongSelection(btn, byTimeout) {
    clearInterval(timerId);
    // marcar errado
    if (btn) {
      btn.classList.add('wrong');
    } else {
      // se por tempo, piscar todos
      Array.from(document.querySelectorAll('.duck')).forEach((d) => d.classList.add('wrong'));
    }

    // revelar a resposta correta brevemente
    Array.from(document.querySelectorAll('.duck')).forEach((d) => {
      const val = Number(d.getAttribute('data-value'));
      if (val === correctAnswer) {
        d.classList.add('correct');
      }
      // remover listeners para evitar cliques múltiplos
      d.replaceWith(d.cloneNode(true));
    });

    // perder vida
    setTimeout(() => {
      loseLife();
    }, 700);
  }

  // event listeners
  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);

  // acessibilidade: tecla 1-4 para escolher (apenas quando jogo ativo)
  window.addEventListener('keydown', (ev) => {
    if (gameEl.classList.contains('hidden')) return;
    const k = ev.key;
    if (['1','2','3','4'].includes(k)) {
      const idx = Number(k) - 1;
      const ducks = document.querySelectorAll('.duck');
      if (ducks[idx]) ducks[idx].click();
    }
  });

  // Inicia HUD
  updateHUD();
})();
