// Création d'une variable pour récuperer l'url API
const url = "http://localhost:3000/api/teddies";

// Récupération des données avec Fetch
fetch(url)
    .then(resultat => resultat.json()
        .then(data => {
            // Afficher mes données dans la console
            console.log(data)
                // Afficher mes données sur ma page index 
            let affichage = "";
            for (let donnees of data) {
                affichage += `<a id="test" href="product.html?${donnees._id}">`;
                affichage += '<article>';
                affichage += `<img class="teddy" src="${donnees.imageUrl}"width=350 height=200>`;
                affichage += `<h3>${donnees.name}</h3>`;
                affichage += `<p>Description : ${donnees.description}</p>`;
                affichage += `<p class="color">Choix couleurs : ${donnees.colors}</p>`;
                affichage += `<span>Prix : ${donnees.price}€</span>`;
                affichage += '</article>';
                affichage += '</a>';
            }
            document.querySelector(".section_products").innerHTML = affichage;

        })
        // En cas d'erreur, afficher celle ci en console
    ).catch(err => console.log('Erreur :' + err));