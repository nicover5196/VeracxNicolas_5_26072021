// création d'une variable qui récupére les données de mon localstorage sur la key panier
let registerProductStorage = JSON.parse(localStorage.getItem("panier"));
// console.log(registerProductStorage);

// Injection du code html dans la classe panier sur mon html
const affichagePanier = document.querySelector(".panier");
// console.log(affichagePanier);


// SI condition (localstorage) est vide alors afficher ma constante qui contient un msg dans ma variable qui contient ma classe panier
if (registerProductStorage === null) {
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
    for (k = 0; k < registerProductStorage.length; k++) {

        // console.log(registerProductStorage.length);
        // création d'une variable qui est égale à mon tableau + le contenu de mon localstorage et l'affiche de maniere dynamique
        productPanier = productPanier + `
        <section class="sectionPanier">
        <article id="${k}">
            <img class="teddy" src="${registerProductStorage[k].imageUrl}" alt="ours en peluche" width=100 height=50>
            <h3>${registerProductStorage[k].Name}</h3>
            <p>Quantité :${registerProductStorage[k].quantite}</p>
            <p>Options couleurs : ${registerProductStorage[k].choixCouleurs}</br>
            <span>Prix :${registerProductStorage[k].price} €</span></br>
            <button class="btn-delete"> Retirer l'article </button>
        </article>
        </section>
        `;
        // console.log(k)
    }
    // SI k est égale aux  nombre de données du pannier, alors afficher dans ma variable qui contient la classe html 
    if (k == registerProductStorage.length) {
        affichagePanier.innerHTML = productPanier;
        // console.log(registerProductStorage.length)
    }
}
// -----------------------------------------------------------
let removeProduct = document.querySelectorAll(".btn-delete");
// console.log(removeProduct);
for (let j = 0; j < removeProduct.length; j++) {
    removeProduct[j].addEventListener("click", (event) => {
        event.preventDefault();
        // console.log(event);
        let removeIdProduct = registerProductStorage[j].id;
        // console.log("id");
        // console.log(removeIdProduct);
        registerProductStorage = registerProductStorage.filter(el => el.id !== removeIdProduct);
        // console.log(registerProductStorage);

        localStorage.setItem(
            "panier", JSON.stringify(registerProductStorage));
        document.location.reload();
    })
}

const resetPanier = `<div class="resetLePanier">
<button class="resetLocalPanier">Vider le panier</button>
</div>
`;

affichagePanier.insertAdjacentHTML("beforebegin", resetPanier);

const resetMyPanier = document.querySelector(".resetLocalPanier");
// console.log(resetMyPanier);

resetMyPanier.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.removeItem("panier");
    document.location.reload();
})

// -------------------------------------------
// Formulaire de validation de commande

// Création d'une fonction 

const affichageFormulaire = () => {
    const formulaireHtml = document.querySelector(".formPanier")
    const structureFormulaire = `
        <form class="formValidPanier">
        <label for="prenom">Prénom :</label>
        <input type="text" id="prenom" name="prenom" required>

        <label for="nom">Nom :</label>
        <input type="text" id="nom" name="nom" required>

        <label for="adresse">Adresse :</label>
        <input name="text" id="adresse" name="adresse" required>

        <label for="ville">Ville :</label>
        <input type="text" id="ville" name="ville" required>

        <label for="codePostal">Code Postal :</label>
        <input type="text" id="codePostal" name="codePostal" required>

        <label for="email">Email :</label>
        <input type="text" id="email" name="email" required>

        <button id="envoyerFormulaire" type="submit" name="envoyerFormulaire">Confirmation de la commande</button>
    </form>
    `;

    // Injection de mon formulaire
    document.querySelector(".formPanier").innerHTML = structureFormulaire;
};

// Affichage du formulaire
affichageFormulaire();

// Selection du bouton qui envoie le formulaire
const btnFormulaire = document.querySelector("#envoyerFormulaire");
// console.log(btnFormulaire)

// Ecouter le boutton au clic
btnFormulaire.addEventListener("click", (e) => {
    e.preventDefault();

    // Récupération des données du forms dans un objet
    const formValue = {
        prenom: document.querySelector("#prenom").value,
        nom: document.querySelector("#nom").value,
        adresse: document.querySelector("#adresse").value,
        ville: document.querySelector("#ville").value,
        codePostal: document.querySelector("#codePostal").value,
        email: document.querySelector("#email").value,
    }

    // Mettre l'objet dans le localStorage & le convertit en chaîne JSON

    localStorage.setItem("formValue", JSON.stringify(formValue));

    // Ajout des données du formulaire & produit dans ma const
    const envoiCommande = {
        registerProductStorage,
        formValue
    }
    console.log(envoiCommande);
})