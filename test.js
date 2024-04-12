// Générer un nombre aléatoire entre 1 et 1025
let randomNumber = Math.floor(Math.random() * 1025) + 1;
randomNumber=1000;
// URL du dépôt GitHub
const githubBaseUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';

// URL de l'image
const imageUrl = `${githubBaseUrl}${randomNumber}.png`;

// Créer un élément d'image
const img = document.createElement('img');
img.src = imageUrl;

// Ajouter l'image à la page
document.body.appendChild(img);