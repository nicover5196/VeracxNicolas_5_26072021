// Création d'une variable pour récuperer l'url
let url = "http://localhost:3000/api/teddies";

// Récupération des données avec Fetch
fetch(url)
    .then(resultat => resultat.json()
        .then(data => {
            // Afficher mes données dans la console
            console.log(data)
                // Afficher mes données sur ma page index 
            let affichage = "<article>";
            for (let donnees of data) {
                affichage += `${donnees.name}`;
                affichage += `${donnees.description}`;
                affichage += `${donnees.imageUrl}`;
                affichage += `${donnees.price}`;
            }
            affichage += '</article>';
            document.querySelector(".section_products").innerHTML = affichage;
        })
        // En cas d'erreur, afficher celle ci en console
    ).catch(err => console.log('Erreur :' + err));