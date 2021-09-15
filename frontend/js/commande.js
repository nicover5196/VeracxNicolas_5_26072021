// Récupération de l'id Serveur
const responseId = localStorage.getItem("order");
// console.log(responseId)

// Récupération du prix total
const prixTotal = localStorage.getItem("prixTotal");
// console.log(prixTotal)

// Structure HTML de confirmation commande
const positionStructure = document.querySelector(".recapitulatif");
// console.log(positionStructure)

const strusctureHtml = `
<div>
    <p>Merci pour vos achats !</p>
    <p>Votre commande numéro : <span class="numeroCommande">${responseId}</span> a bien été prise en compte </p>
    <p>Le montant de votre commande est de : <span class="numeroCommande" >${prixTotal} €</span>
    <p>A bientôt chez Orinoco !</p>
</div>
`;

// Injection HTML

positionStructure.innerHTML = strusctureHtml;

// Vider le localStorage sauf Form

function removeKeyStorage(key) {
    localStorage.removeItem(key);
};

removeKeyStorage("panier");
removeKeyStorage("prixTotal");
removeKeyStorage("order");