const cards = document.querySelectorAll(".card");
const modalParabens = document.getElementById("modalParabens");
const btnJogarNovamente = document.getElementById("btnJogarNovamente");

// Garante que o modal fica colado direto no <body> para cobrir a página inteira até o final
if (modalParabens) {
    document.body.appendChild(modalParabens);
}

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

function flipCard({ target: clickedCard }) {
    if (cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
            cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if (img1 === img2) {
        matched++;
        
        // Exibe o modal centralizado cobrindo todo o ecrã
        if (matched === 8) {
            setTimeout(() => {
                if (modalParabens) {
                    modalParabens.classList.add("mostrar");
                }
            }, 600);
        }

        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return (disableDeck = false);
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    
    // Esconde o modal
    if (modalParabens) {
        modalParabens.classList.remove("mostrar");
    }

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `/static/images/images-jogomemoria/img-${arr[i]}.svg`;
        card.addEventListener("click", flipCard);
    });
}

if (btnJogarNovamente) {
    btnJogarNovamente.addEventListener("click", shuffleCard);
}

shuffleCard();

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});