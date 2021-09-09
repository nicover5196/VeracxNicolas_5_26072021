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
            <button class="btn-delete"> Retirer l'article </button>
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
// -----------------------------------------------------------
let removeProduct = document.querySelectorAll(".btn-delete");
// console.log(removeProduct);
for (let j = 0; j < removeProduct.length; j++) {
    removeProduct[j].addEventListener("click", (event) => {
        event.preventDefault();
        // console.log(event);
        let removeIdProduct = localStorageContent[j].id;
        // console.log("id");
        // console.log(removeIdProduct);
        localStorageContent = localStorageContent.filter(el => el.id !== removeIdProduct);
        // console.log(registerProductStorage);

        localStorage.setItem(
            "panier", JSON.stringify(localStorageContent));
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

    // Gestion du formulaire 
    const textAlert = (value) => {
        return `${value} : Les chiffres et symboles ne sont pas autorisé. \n Ne pas dépasser 20 caractères, minimum 3 caractères.`;
    }

    const regExPrenomNomVille = (value) => {
        return /^[A-Za-z]{3,20}$/.test(value)
    }
    const regExCodePostal = (value) => {
        return /^[0-9]{5}$/.test(value)
    }
    const regExEmail = (value) => {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)
    }
    const regExAdresse = (value) => {
        return /^[A-Za-z0-9\s]{5,50}$/.test(value);
    }

    function prenomControle() {
        // Contrôle du champ prénom
        const LePrenom = formValue.prenom;
        if (regExPrenomNomVille(LePrenom)) {
            // console.log("ok")
            return true;
        } else {
            // console.log("ko")
            alert(textAlert("Prénom"));
            return false;
        }
    }

    function nomControle() {
        // Contrôle du champ nom
        const leNom = formValue.nom;
        if (regExPrenomNomVille(leNom)) {
            // console.log("ok")
            return true;
        } else {
            // console.log("ko")
            alert(textAlert("Nom"));
            return false;
        }
    }
    // inversement du if & else, suppression des return
    function villeControle() {
        // Contrôle du champ ville
        const laVille = formValue.ville;
        if (regExPrenomNomVille(laVille)) {
            // console.log("ok")
            return true;
        } else {
            // console.log("ko")
            alert(textAlert("Ville"));
            return false;
        }
    }


    function codePostalControle() {
        // Contrôle du champ code postal
        const codePostal = formValue.codePostal;
        if (regExCodePostal(codePostal)) {
            // console.log("ok")
            return true;
        } else {
            // console.log("ko")
            alert("Veuillez remplir le code postal à 5 chiffres.");
            return false;
        }
    }

    function emailControle() {
        // Contrôle du champ email
        const leEmail = formValue.email;
        if (regExEmail(leEmail)) {
            // console.log("ok")
            return true;
        } else {
            // console.log("ko")
            alert("L'email n'est pas valide.");
            return false;
        }
    }

    function adresseControle() {
        const leAdresse = formValue.adresse;
        if (regExAdresse(leAdresse)) {
            return true;
        } else {
            alert("L'adresse ne doit contenir que des chiffres et lettres sans accent et symbole.");
            return false;
        }
    }
    // récupérer les données formulaire & articles dans le panier
    const numeroCommande = [];
    numeroCommande.push(localStorageContent)
    numeroCommande.push(localStorage)
    console.log(numeroCommande);

    const random = (max, min) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    numeroCommande.innerHTML = random(10000000, 90000000);
    // Contrôle validité formulaire avant envoie dans le LocalStorage
    if (localStorageContent && prenomControle() && nomControle() && codePostalControle() && emailControle() && adresseControle() && villeControle()) {
        localStorage.setItem("formValue", JSON.stringify(formValue));
        const commandeValide = `
    <div class="commandeValide">
    <p>Votre commande a été valider ! voir mon récapitulatif de commande <a class="lien_commande" href="commande.html"> ici !</a></p>
    </div>
    `;
        const numeroCommandeCreate = `
    <div class="commandeValide">
    <p>Votre numéro de commande : ${numeroCommande.innerHTML}</p>
    </div>
    `;
        affichagePanier.insertAdjacentHTML("afterend", numeroCommandeCreate);
        affichagePanier.innerHTML = commandeValide;
    } else {
        alert("Votre panier est vide ou le formulaire n'est pas correcte");
    }

    // Ajout des données du formulaire & produit dans ma const
    const envoiCommande = {
        localStorageContent,
        formValue,
    }
})
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
    // console.log(prixTotal);
    const affichagePrixPanier = `<p class="prixTotal">Prix total du panier : ${prixTotal}€</p>`
    affichagePanier.insertAdjacentHTML("afterend", affichagePrixPanier);
}