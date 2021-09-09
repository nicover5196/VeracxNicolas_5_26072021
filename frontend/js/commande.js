// création d'une variable qui récupére les données de mon localstorage sur la key panier
let localStorageContent = JSON.parse(localStorage.getItem("panier"));
// console.log(localStorageContent);

// Injection du code html dans la classe panier sur mon html
const affichagePanier = document.querySelector(".panier");
// console.log(affichagePanier);


// SI condition (localstorage) est vide alors afficher ma constante qui contient un msg dans ma variable qui contient ma classe panier
if (localStorageContent === null) {
    const emptyPanier = `
    <div class="emptyPanier">
    <p>Votre panier est vide ! Rendez-vous sur notre page <strong><a href="index.html">d'accueil !</a></strong></p>
    </div>
    `;
    affichagePanier.innerHTML = emptyPanier;
    // SINON  crée une variable qui contient un tableau
} else {
    let productPanier = [];
    // création d'une boucle k qui numerote le contenu de mon localstorage
    for (k = 0; k < localStorageContent.length; k++) {

        // console.log(registerProductStorage.length);
        // création d'une variable qui est égale à mon tableau + le contenu de mon localstorage et l'affiche de maniere dynamique
        productPanier = productPanier + `
        <section class="sectionPanier">
        <article id="${k}">
            <img class="teddy" src="${localStorageContent[k].imageUrl}" alt="ours en peluche" width=100 height=50>
            <h3>${localStorageContent[k].name}</h3>
            <p>Quantité :${localStorageContent[k].quantity}</p>
            <span>Prix :${localStorageContent[k].price} €</span></br>
        </article>
        </section>
        `;
        // console.log(k)
    }
    // SI k est égale aux  nombre de données du pannier, alors afficher dans ma variable qui contient la classe html 
    if (k == localStorageContent.length) {
        affichagePanier.innerHTML = productPanier;
        // console.log(registerProductStorage.length)
    }
}

// --------------------------------

// création d'une variable qui récupére les données de mon localstorage sur la key panier
let localStorageContentCommande = JSON.parse(localStorage.getItem("formValue"));
// Injection du code html dans la classe panier sur mon html
const affichageForm = document.querySelector(".donneeForm");

if (localStorageContentCommande) {
    const commande = `<h3 class="cordonnee">Vos coordonnées :</h3>
    <ul class="afficheCommande">
    <li><strong>Prénom :</strong> ${localStorageContentCommande.prenom}</li></br>
    <li><strong>Nom :</strong> ${localStorageContentCommande.nom}</li></br>
    <li><strong>Email :</strong> ${localStorageContentCommande.email}</li></br>
    <li><strong>Ville :</strong> ${localStorageContentCommande.ville}</li></br>
    <li><strong>Adresse :</strong> ${localStorageContentCommande.adresse}</li></br>
    <li><strong>Code postale :</strong> ${localStorageContentCommande.codePostal}</li></br>
    </ul>
    `
    affichageForm.innerHTML = commande;
}
let montantPanier = [];
for (let m = 0; m < localStorageContent.length; m++) {
    prixProduct = localStorageContent[m].price;
    // quantityProduct = localStorageContent[m].quantity;
    // montantPanier.push(quantityProduct)
    montantPanier.push(prixProduct)
        // console.log(montantPanier);
}
if (localStorageContent) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = montantPanier.reduce(reducer, 0);
    console.log(prixTotal);
    const affichagePrixPanier = `<p class="prixTotal">Prix total du panier : ${prixTotal}€</p>`
    affichagePanier.insertAdjacentHTML("afterend", affichagePrixPanier);
}