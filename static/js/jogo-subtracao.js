let score = 0

function gerarPergunta(){

let num1 = Math.floor(Math.random()*20)+5
let num2 = Math.floor(Math.random()*10)

let resposta = num1 - num2

document.getElementById("question").innerHTML =
num1 + " - " + num2 + " = ?"

let area = document.getElementById("butterflies")
area.innerHTML = ""

let opcoes = [resposta]

while(opcoes.length < 3){

let falso = resposta + Math.floor(Math.random()*5)-2

if(!opcoes.includes(falso) && falso >= 0){
opcoes.push(falso)
}

}

opcoes.sort(()=>Math.random()-0.5)

opcoes.forEach(valor => {

let butterfly = document.createElement("div")
butterfly.classList.add("butterfly")

butterfly.innerHTML = "🦋 <span>"+valor+"</span>"

butterfly.onclick = () => {

if(valor === resposta){

score++
document.getElementById("score").innerHTML =
"Pontuação: "+score

}

gerarPergunta()

}

area.appendChild(butterfly)

})

}

document.getElementById("start-btn").onclick = () =>{

document.getElementById("start-screen").classList.add("hidden")
document.getElementById("game").classList.remove("hidden")

gerarPergunta()

}

document.getElementById("restart-btn").onclick = () =>{
location.reload()
}