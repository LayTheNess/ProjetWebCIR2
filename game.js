const NUM_POKEMONS = 1025; // Nombre total de Pokémon dans la génération actuelle

document.getElementById('reset-button').addEventListener('click', resetGame);

let longueur = 6;
let largeur = 4;
if ((longueur * largeur) % 2 !== 0) {
    largeur = largeur + 1;
}

let gameBoard = document.getElementById('game-board');
let images = [];
let possiblePokemons = [];
let flippedCards = [];
let foundpairs = 0;

document.documentElement.style.setProperty('--longueur', longueur);
document.documentElement.style.setProperty('--largeur', largeur);

const NUM_PAIRS = longueur * largeur / 2;

function generateRandomPokemons() {
    for (let i=1 ; i<1026 ; i++) {
        possiblePokemons.push(i);
    }
    for (let i= 10000 ; i<10264 ; i++) {
        possiblePokemons.push(i);
    }
    
    for (let i=0 ; i<NUM_PAIRS ; i++) {
        let randomIndex = Math.floor(Math.random() * possiblePokemons.length);
        let randomPokemon = possiblePokemons[randomIndex];
        let shiny = Math.floor(Math.random() * 1024);
        if (shiny === 0 && randomPokemon < 1024) {
            randomPokemon = `shiny/${randomPokemon}`;
        }
        possiblePokemons.splice(randomIndex,1);
        images.push(randomPokemon);
        images.push(randomPokemon);
    }
}

// Mélanger les images
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

function displayGrid() {
    images = shuffle(images);
    let cid = 0;
    images.forEach(image => {
        let card = document.createElement('div');
        card.classList.add('card');
        let img = document.createElement('img');
        img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${image}.png`;
        card.appendChild(img);
        card.addEventListener('click', function() {
          revealCard(img);
        });
        gameBoard.appendChild(card);
    });

}

// Fonction pour retourner une carte
const revealCard = (img) => {
    if (flippedCards.length < 2 && img.style.display != 'block') {
        img.style.display = 'block';
        img.removeEventListener('click', revealCard);
        flippedCards.push(img);
        if (flippedCards.length === 2) {
            if (flippedCards[0].src === flippedCards[1].src) {
                checkForMatch();
            }
            else {
                setTimeout(checkForMatch, 500);
            }
        }
    }

  };
  
const checkForMatch = () => {
    if (flippedCards[0].src === flippedCards[1].src) {
        // Cartes identiques, les laisser affichées
        flippedCards.forEach(img => {
            img.removeEventListener('click', revealCard);
        });
        foundpairs += 1;
        if(foundpairs === NUM_PAIRS){

            setTimeout(resetGame, 1500);
            foundpairs = 0;
        }
    } else {
        // Cartes différentes, les cacher à nouveau
        flippedCards.forEach(img => {
            img.style.display = 'none';
            img.addEventListener('click', revealCard);
        });
    }
    flippedCards = []; // Réinitialiser la liste des cartes retournées
};

function resetGame() {

    // Supprimer tous les enfants de game-board
    while (gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }

    images = [];
    possiblePokemons = [];
    flippedCards = [];

    generateRandomPokemons();
    displayGrid();
}




/// MAIN
resetGame();