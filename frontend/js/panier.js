let registerProductStorage = JSON.parse(localStorage.getItem("panier"));
// console.log(registerProductStorage);

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
    }

    if (k == registerProductStorage.length) {
        affichagePanier.innerHTML = productPanier;
    }
}
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