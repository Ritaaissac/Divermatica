let num1, num2, resposta;
let caindo = false;
let jogoRodando = true;

const perguntaEl = document.getElementById("pergunta");
const bolinha = document.getElementById("bolinha");
const trem = document.getElementById("trem");
const vagoes = document.querySelectorAll(".vagao");
const mensagem = document.getElementById("mensagem");
const gameBox = document.getElementById("game-box");
const btnParar = document.getElementById("btnParar");

// 🛑 ENCERRAR JOGO
btnParar.addEventListener("click", () => {
  jogoRodando = false;

  mensagem.innerText = "🛑 Jogo encerrado!";
  bolinha.style.display = "none";

  btnParar.disabled = true;
});

// PERGUNTA
function novaPergunta() {
  if (!jogoRodando) return;

  num1 = Math.floor(Math.random() * 5) + 1;
  num2 = Math.floor(Math.random() * 5) + 1;
  resposta = num1 * num2;

  perguntaEl.innerText = `${num1} × ${num2} = ?`;
  mensagem.innerText = "";

  let respostas = [resposta, resposta+1, resposta-1].sort(() => Math.random() - 0.5);

  vagoes.forEach((v,i)=>{
    v.innerText = respostas[i];
    v.dataset.valor = respostas[i];
  });

  bolinha.style.top = "20px";
  bolinha.style.display = "block";
  caindo = false;
}

novaPergunta();

// MOVIMENTO DO TREM
let posTrem = -400;
setInterval(()=>{
  if(!jogoRodando) return;

  posTrem += 2;
  if(posTrem > gameBox.offsetWidth) posTrem = -400;

  trem.style.left = posTrem+"px";
},20);

// CLIQUE
document.addEventListener("click", ()=>{
  if (!jogoRodando || caindo) return;

  caindo = true;

  let queda = setInterval(()=>{
    bolinha.style.top = bolinha.offsetTop + 10 + "px";

    let acertou = false;

    vagoes.forEach(v=>{
      let b = bolinha.getBoundingClientRect();
      let r = v.getBoundingClientRect();

      if(b.bottom>=r.top && b.left>=r.left && b.right<=r.right){
        clearInterval(queda);
        acertou = true;

        if(parseInt(v.dataset.valor)===resposta){
          mensagem.innerText="🎉 Acertou!";
        } else {
          mensagem.innerText="❌ Errou!";
        }

        setTimeout(novaPergunta,1500);
      }
    });

    // SE ERROU (fora dos vagões)
    if(!acertou && bolinha.offsetTop>250){
      clearInterval(queda);
      mensagem.innerText="😅 Tente novamente";

      setTimeout(()=>{
        if (!jogoRodando) return;
        bolinha.style.top="20px";
        caindo=false;
      },500);
    }

  },20);
});