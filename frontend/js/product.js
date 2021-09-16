const currentLocation = window.location.search;
const URLparams = new URLSearchParams(currentLocation);
const currentProductId = URLparams.get('id');
const affichageArticle = document.querySelector(".product");



const teddiesRoute = `http://localhost:3000/api/teddies/${currentProductId}`;


function displayProduct(product) {
    const structureArticle = `
            <article class="article_alone">
                <img class="teddy" src="${product.imageUrl}" alt="ours en peluche" width=350 height=200>
                <h3>${product.name}</h3>
                <p>Description :${product.description} </p>
                <span>Prix :${product.price / 100} €</span>
                <form>
                    <label for="option_produit">Choisir l'option :</label>
                    <select id="option_produit" name="option_produit"></select>
                </form>
                <button id="btn" type="submit" name="btn-envoyer">Ajouter au panier</button>
            </article>`;

    affichageArticle.innerHTML = structureArticle;
    const colorOptions = product.colors;
    const selectColor = document.querySelector('#option_produit');
    colorOptions.forEach((value, index) => {
        selectColor.innerHTML += `<option value="${index}">${value}</option>`;
    });
}

function addProduct(product) {
    const localStorageContent = JSON.parse(localStorage.getItem("panier"));
    if (localStorageContent === null) {
        let productsList = [];
        productsList.push(product);
        localStorage.setItem("panier", JSON.stringify(productsList));
    } else {
        //je fais une boucle autour des éléments de mon localStorageContent
        // si un de mes éléments a pour id l'id de mon produit
        // alors pour cet élément je lui incrémente sa quantité
        // et je mets à jour mon localStorage puis avec le return j'arrête ma boucle
        for (let i = 0; i < localStorageContent.length; i++) {
            if (localStorageContent[i].id === product.id) {
                localStorageContent[i].quantity++;
                localStorage.setItem("panier", JSON.stringify(localStorageContent));
                return;
            }
        }
        localStorageContent.push(product);
        localStorage.setItem("panier", JSON.stringify(localStorageContent));
    }
}

const messageValide = document.querySelector(".msg");

fetch(teddiesRoute)
    .then(data => data.json())
    .then((product) => {
        //Send product to HTML
        displayProduct(product);

        // Create formated product for localstorage
        const cartProduct = {
            id: product._id,
            imageUrl: product.imageUrl,
            name: product.name,
            description: product.description,
            quantity: 1,
            price: product.price / 100
        }

        // When adding product to cart
        const addProductButton = document.querySelector("#btn");
        addProductButton.addEventListener('click', function() {
            addProduct(cartProduct);
            messageValide.innerHTML = `Votre article a été ajouter au <strong><a class="lienPanier" href="panier.html">panier</a></strong>
            </br><p class="msgBlack">Retournez sur la page <strong><a class="lienAccueil" href="index.html">d'accueil ?</a></strong></p>`;
        });
    })
    .catch((e) => {
        console.log(e);
    })