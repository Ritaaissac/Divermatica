let pontos = 0;
let vidas = 5;
let contas = [];
let jogoIniciado = false;

const LIMITE_CONTAS = 6;

document.getElementById("vidas").innerText = vidas;

function iniciarJogo() {
  document.getElementById("tela-inicial").style.display = "none";
  jogoIniciado = true;
}

function criarConta() {

  if (!jogoIniciado) return;
  if (contas.length >= LIMITE_CONTAS) return;

  let num1 = Math.floor(Math.random() * 10);
  let num2 = Math.floor(Math.random() * 10);
  let resposta = num1 * num2;

  let conta = document.createElement("div");
  conta.classList.add("conta");
  conta.innerText = `${num1} × ${num2}`;
  conta.style.left = Math.random() * 340 + "px";
  conta.style.top = "0px";

  document.getElementById("jogo").appendChild(conta);

  contas.push({
    elemento: conta,
    resposta: resposta,
    y: 0,
    velocidade: 0.5 + Math.random() * 0.8
  });
}

function atualizar() {
  contas.forEach((c, index) => {
    c.y += c.velocidade;
    c.elemento.style.top = c.y + "px";

    if (c.y > 480) {
      c.elemento.remove();
      contas.splice(index, 1);
      perderVida();
    }
  });
}

function verificar() {
  let valor = document.getElementById("resposta").value;

  contas.forEach((c, index) => {
    if (valor == c.resposta) {
      c.elemento.remove();
      contas.splice(index, 1);
      pontos++;
      document.getElementById("pontos").innerText = pontos;
    }
  });

  document.getElementById("resposta").value = "";
}

function perderVida() {
  vidas--;
  document.getElementById("vidas").innerText = vidas;

  if (vidas <= 0) {
    alert("💀 Game Over!");
    location.reload();
  }
}

/* Enter para responder */
document.getElementById("resposta").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    verificar();
  }
});

/* Loop */
setInterval(criarConta, 2200);
setInterval(atualizar, 40);