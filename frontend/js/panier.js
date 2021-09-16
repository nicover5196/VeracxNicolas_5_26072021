// création d'une variable qui récupére les données de mon localstorage sur la key panier
let localStorageContent = JSON.parse(localStorage.getItem("panier"));

// Injection du code html dans la classe panier sur mon html
const affichagePanier = document.querySelector(".panier");


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
    }
    // SI k est égale aux  nombre de données du pannier, alors afficher dans ma variable qui contient la classe html 
    if (k == localStorageContent.length) {
        affichagePanier.innerHTML = productPanier;
    }
}
// -----------------------------------------------------------
let removeProduct = document.querySelectorAll(".btn-delete");
// console.log(removeProduct);
for (let j = 0; j < removeProduct.length; j++) {
    removeProduct[j].addEventListener("click", (event) => {
        event.preventDefault();
        let removeIdProduct = localStorageContent[j].id;
        localStorageContent = localStorageContent.filter(el => el.id !== removeIdProduct);

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
            return true;
        } else {
            alert(textAlert("Nom"));
            return false;
        }
    }

    function villeControle() {
        // Contrôle du champ ville
        const laVille = formValue.ville;
        if (regExPrenomNomVille(laVille)) {
            return true;
        } else {
            alert(textAlert("Ville"));
            return false;
        }
    }


    function codePostalControle() {
        // Contrôle du champ code postal
        const codePostal = formValue.codePostal;
        if (regExCodePostal(codePostal)) {
            return true;
        } else {
            alert("Veuillez remplir le code postal à 5 chiffres.");
            return false;
        }
    }

    function emailControle() {
        // Contrôle du champ email
        const leEmail = formValue.email;
        if (regExEmail(leEmail)) {
            return true;
        } else {
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
    // Contrôle validité formulaire avant envoie dans le LocalStorage
    if (localStorageContent && prenomControle() && nomControle() && codePostalControle() && emailControle() && adresseControle() && villeControle()) {
        localStorage.setItem("formValue", JSON.stringify(formValue));
        let contact = {
            firstName: formValue.prenom,
            lastName: formValue.nom,
            address: formValue.adresse,
            city: formValue.ville,
            email: formValue.email,
        }
        for (m = 0; m < localStorageContent.length; m++) {
            monId = localStorageContent[m].id;
        }
        let products = []
        products.push(monId)
        const promesse1 = fetch("http://localhost:3000/api/teddies/order", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ contact, products }),

        });
        promesse1.then(async(response) => {
            try {
                console.log(response)
                const contenu = await response.json();
                console.log(contenu)
                if (response.ok) {
                    console.log(`Resultat de response.ok : ${response.ok}`);

                    // récupération id response serveur
                    console.log(contenu.orderId)
                        // envoie vers localstorage l'id response
                    localStorage.setItem("order", contenu.orderId);
                    // redirection page confirmation
                    window.location = "commande.html";
                } else {
                    alert(`Problème avec le serveur : ${response.status}`)
                }
            } catch (e) {
                console.log(e);
                alert(`Erreur : ${e}`);
            }
        })
    } else {
        alert("Votre panier est vide ou le formulaire n'est pas correcte");
    }
})
let montantPanier = [];
for (let m = 0; m < localStorageContent.length; m++) {
    prixProduct = localStorageContent[m].price * localStorageContent[m].quantity;
    montantPanier.push(prixProduct)
}
if (localStorageContent) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const prixTotal = montantPanier.reduce(reducer, 0);
    const affichagePrixPanier = `<p class="prixTotal">Prix total du panier : ${prixTotal}€</p>`
    affichagePanier.insertAdjacentHTML("afterend", affichagePrixPanier);
    localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
}