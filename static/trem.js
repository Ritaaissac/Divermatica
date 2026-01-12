let num1, num2, resposta;
let caindo = false;

const perguntaEl = document.getElementById("pergunta");
const bolinha = document.getElementById("bolinha");
const trem = document.getElementById("trem");
const vagoes = document.querySelectorAll(".vagao");
const mensagem = document.getElementById("mensagem");

// cria pergunta
function novaPergunta() {
  num1 = Math.floor(Math.random() * 5) + 1;
  num2 = Math.floor(Math.random() * 5) + 1;
  resposta = num1 * num2;

  perguntaEl.innerText = `${num1} × ${num2} = ?`;
  mensagem.innerText = "";

  let respostas = [
    resposta,
    resposta + 1,
    resposta - 1
  ].sort(() => Math.random() - 0.5);

  vagoes.forEach((v, i) => {
    v.innerText = respostas[i];
    v.dataset.valor = respostas[i];
  });

  bolinha.style.top = "0px";
  caindo = false;
}

novaPergunta();

// movimento do trem
let posTrem = -400;
setInterval(() => {
  posTrem += 2;
  if (posTrem > window.innerWidth) posTrem = -400;
  trem.style.left = posTrem + "px";
}, 20);

// clique para soltar a bolinha
document.addEventListener("click", () => {
  if (caindo) return;
  caindo = true;

  let queda = setInterval(() => {
    let top = bolinha.offsetTop;
    bolinha.style.top = top + 10 + "px";


    vagoes.forEach(v => {
      let bRect = bolinha.getBoundingClientRect();
      let vRect = v.getBoundingClientRect();

      if (
        bRect.bottom >= vRect.top &&
        bRect.left >= vRect.left &&
        bRect.right <= vRect.right
      ) {
        clearInterval(queda);

        if (parseInt(v.dataset.valor) === resposta) {
          mensagem.innerText = "🎉 Acertou!";
        } else {
          mensagem.innerText = "❌ Tente novamente!";
        }

        setTimeout(novaPergunta, 1500);
      }
    });

  }, 20);
});
