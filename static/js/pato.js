(() => {
  // ELEMENTOS
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

  // ESTADO
  let score = 0;
  let lives = 3;
  let timeLeft = 10;
  let timerId = null;
  let correctAnswer = null;

  let combo = 0;
  let level = 1;

  // CONFIGURAÇÕES
  const POINTS = 10;
  const TIME_PER_Q = 10;

  function resetState() {
    score = 0;
    lives = 3;
    combo = 0;
    level = 1;
    timeLeft = TIME_PER_Q;
    updateHUD();
  }

  function updateHUD() {
    scoreEl.textContent = `Pontuação: ${score}  | Combo x${combo}`;
    livesEl.innerHTML = `Vidas: ${'❤️'.repeat(lives)}`;
    timerEl.textContent = `Tempo: ${timeLeft}s`;

    if (timeLeft <= 3) timerEl.classList.add('low-time');
    else timerEl.classList.remove('low-time');
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
    lives--;
    if (lives <= 0) {
      lives = 0;
      updateHUD();
      endGame();
    } else {
      updateHUD();
      nextQuestion();
    }
  }

  function difficultySettings() {
    if (score < 40) return 10;
    if (score < 100) return 18;
    return 30;
  }

  function generateDivision() {
    const maxQ = difficultySettings();
    const quotient = Math.floor(Math.random() * (maxQ - 1)) + 2;
    const divisor = Math.floor(Math.random() * 11) + 2;
    return { dividend: quotient * divisor, divisor, quotient };
  }

  function pickOptions(correct) {
    const opts = new Set([correct]);
    while (opts.size < 4) {
      let delta = Math.floor(Math.random() * Math.max(3, Math.floor(correct * 0.4))) + 1;
      if (Math.random() < 0.5) delta = -delta;

      let cand = correct + delta;
      if (cand <= 0) cand = Math.abs(cand) + 2;

      opts.add(cand);
    }
    return shuffle([...opts]);
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function nextQuestion() {
    clearInterval(timerId);
    timeLeft = TIME_PER_Q;
    updateHUD();

    const { dividend, divisor, quotient } = generateDivision();
    correctAnswer = quotient;
    questionEl.textContent = `${dividend} ÷ ${divisor} = ?`;

    const opts = pickOptions(quotient);
    ducksEl.innerHTML = '';

    opts.forEach(num => {
      const btn = document.createElement('button');
      btn.className = 'duck';
      btn.dataset.value = num;
      btn.innerHTML = `
        <div class="duck-emoji">🦆</div>
        <div class="num">${num}</div>
      `;
      btn.addEventListener('click', onDuckClick);
      ducksEl.appendChild(btn);
    });

    timerId = setInterval(() => {
      timeLeft--;
      updateHUD();
      if (timeLeft <= 0) {
        clearInterval(timerId);
        handleWrong(null, true);
      }
    }, 1000);
  }

  function onDuckClick(e) {
    const val = Number(e.currentTarget.dataset.value);
    if (val === correctAnswer) {
      handleCorrect(e.currentTarget);
    } else {
      handleWrong(e.currentTarget, false);
    }
  }

  function handleCorrect(btn) {
    clearInterval(timerId);

    btn.classList.add('correct');

    combo++;
    score += POINTS + combo;

    if (combo % 5 === 0) level++;

    updateHUD();

    setTimeout(nextQuestion, 650);
  }

  function handleWrong(btn, timeout) {
    clearInterval(timerId);

    combo = 0;
    updateHUD();

    if (timeout) {
      document.querySelectorAll('.duck').forEach(d => d.classList.add('wrong'));
    } else if (btn) {
      btn.classList.add('wrong');
    }

    document.querySelectorAll('.duck').forEach(d => {
      if (Number(d.dataset.value) === correctAnswer) d.classList.add('correct');
      d.replaceWith(d.cloneNode(true));
    });

    setTimeout(() => loseLife(), 700);
  }

  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', startGame);

})();
