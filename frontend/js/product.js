alert("page produit")

// Récuperer l'id qui a été passée en parametre de mon url

const urlId = window.location.search;

// Affichage dans la console 
console.log(urlId)

// Récupérer la valeur du paramètre

const urlParams = new URLSearchParams(urlId);

// Faire un fetch pour recuperer les infos de mon produit



// Précisez les options de mon produit dans un selecteur ( couleur..)
// au clic d'un boutton créer, ajouter mon produit dans le local storage


// Bonus : page panier