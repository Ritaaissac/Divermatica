let score = 0 // pontuação 
let vidas = 3 // vidas

// Timer
let timeLeft = 10
let timerId = null
const TEMPO_PERGUNTA = 10

// ATUALIZA O HUD
function atualizarHUD(){
    document.getElementById("score").innerHTML =
    "Pontuação: " + score
    document.getElementById("lives").innerHTML =
    "Vidas: " + "❤️".repeat(vidas)
    document.getElementById("timer").innerHTML =
    "Tempo: " + timeLeft + "s"
}

function iniciarTimer(){
    clearInterval(timerId)
    timerId = setInterval(() => {
        timeLeft--
        atualizarHUD()

        if(timeLeft <= 0){
            clearInterval(timerId)
            perderVida()

            if(vidas > 0){
                gerarPergunta()}
        }
    }, 1000)
}

// GERA O JOGO COM A PERGUNTA E AS RESPOSTAS
function gerarPergunta(){
    clearInterval(timerId)
    timeLeft = TEMPO_PERGUNTA
    atualizarHUD()

    let num1 = Math.floor(Math.random()*20)+5 // número 1 da equação
    let num2 = Math.floor(Math.random()*10) // número 2 da equação
    let resposta = num1 - num2 // resposta correta da equação
    document.getElementById("question").innerHTML = num1 + " - " + num2 + " = ?"

    let area = document.getElementById("butterflies")
    area.innerHTML = ""
    
    let opcoes = [resposta]
    while(opcoes.length < 3){
        let falso = resposta + Math.floor(Math.random()*5)-2
        if (!opcoes.includes(falso) && falso >= 0){
            opcoes.push(falso)}}

    opcoes.sort(()=>Math.random()-0.5)
    opcoes.forEach(valor => {

        let butterfly = document.createElement("div")
        butterfly.classList.add("butterfly")

        butterfly.innerHTML = "🦋 <span>"+valor+"</span>" // borboletas com as opções de resposta

        butterfly.onclick = () => {
            clearInterval(timerId) // para o timer da pergunta atual

            // resposta correta
            if(valor === resposta){
                score++
                atualizarHUD()}

            // resposta errada
            else{
                perderVida()}

            // continua jogo
            if(vidas > 0){
                gerarPergunta()}
        }
        area.appendChild(butterfly)
    })
    iniciarTimer()
}

// REDUZ O CORAÇÃO QUANDO ERRA A RESPOSTA
function perderVida(){
    vidas-- 

    atualizarHUD()

    document.getElementById("lives").innerHTML =
    "Vidas: " + "❤️".repeat(vidas)

    if(vidas <= 0){
        mostrarGameOver()}
}

// TELA FINAL
function mostrarGameOver(){
    clearInterval(timerId)
    document.getElementById("game").classList.add("hidden")
    document.getElementById("game-over").classList.remove("hidden")
    document.getElementById("final-score").innerHTML = "Sua pontuação final: " + score
}

// INICIALIZA O JOGO
document.getElementById("start-btn").onclick = () =>{
    document.getElementById("start-screen").classList.add("hidden")
    document.getElementById("game").classList.remove("hidden")
    document.getElementById("con-jogo").classList.remove("hidden")
    document.getElementById("hud").classList.remove("hidden")
    gerarPergunta()
}

function sairJogo(){
    clearInterval(timerId) // para o timer

    // reseta variáveis
    score = 0
    vidas = 3
    timeLeft = TEMPO_PERGUNTA

    document.getElementById("question").innerHTML = ""
    document.getElementById("butterflies").innerHTML = ""

    atualizarHUD() // atualiza HUD

    document.getElementById("game")
    .classList.add("hidden")

    document.getElementById("game-over")
    .classList.add("hidden")

    document.getElementById("start-screen")
    .classList.remove("hidden")
}

// BOTÃO DE REINICIAR
document.getElementById("restart-btn").onclick = () =>{
    location.reload()
}
