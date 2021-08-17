let registerProductStorage = JSON.parse(localStorage.getItem("panier"));
console.log(registerProductStorage);

// Injection du code html 
const affichagePanier = document.querySelector(".panier");
// console.log(affichagePanier);
if (registerProductStorage === null) {
    const emptyPanier = `
    <div class="emptyPanier">
    <p>Votre panier est vide ! Rendez-vous sur notre page <strong><a href="index.html">d'accueil !</a></strong></p>
    </div>
    `;
    affichagePanier.innerHTML = emptyPanier;
} else {
    let productPanier = [];
    for (k = 0; k < registerProductStorage.length; k++) {
        // console.log(registerProductStorage.length);
        productPanier = productPanier + `
        <section class="sectionPanier">
        <article>
            <img class="teddy" src="${registerProductStorage[k].imageUrl}" alt="ours en peluche" width=100 height=50>
            <h3>${registerProductStorage[k].Name}</h3>
            <p>Quantité :${registerProductStorage[k].quantite}</p>
            <p>Options couleurs : ${registerProductStorage[k].choixCouleurs}</br>
            <span>Prix :${registerProductStorage[k].price} €</span>
        </article>
        </section>
        `;
    }
    if (k == registerProductStorage.length) {
        affichagePanier.innerHTML = productPanier;
    }
}