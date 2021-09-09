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
// let montantPanier = [];
// for (let m = 0; m < localStorageContent.length; m++) {
//     prixProduct = localStorageContent[m].price * localStorageContent[m].quantity;
//     // quantityProduct = localStorageContent[m].quantity;
//     // montantPanier.push(quantityProduct)
//     montantPanier.push(prixProduct)
//     console.log(prixProduct);
// }

// // (multiplication) + addition 
// if (localStorageContent) {
//     const reducer = (accumulator, currentValue) => accumulator + currentValue;
//     const prixTotal = montantPanier.reduce(reducer, 0);
//     console.log(prixTotal);
//     const affichagePrixPanier = `<p class="prixTotal">Prix total du panier : ${prixTotal}€</p>`
//     affichagePanier.insertAdjacentHTML("afterend", affichagePrixPanier);
// }