alert("page produit")

const url = "http://localhost:3000/api/teddies";

// Récupération des données avec Fetch
fetch(url)
    .then(resultat => resultat.json().then(data => {
            // Afficher mes données dans la console
            console.log(data)
        })
        // En cas d'erreur, afficher celle ci en console
    ).catch(err => console.log('Erreur :' + err));


// Récuperer l'id qui a été passée en parametre de mon url 
// Faire un fetch pour recuperer les infos de mon produit
// Afficher les infos de mon produit
// Précisez les options de mon produit dans un selecteur ( couleur..)
// au clic d'un boutton créer, ajouter mon produit dans le local storage


// Bonus : page panier