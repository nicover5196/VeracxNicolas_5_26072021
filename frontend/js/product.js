// Récuperer l'id qui a été passée en parametre de mon url
const urlId = window.location.search;

// Récuperer l'url 
const monUrl = window.location.href;

// Extraction de l'id 
const urlSearchParams = new URLSearchParams(urlId);
const id = urlSearchParams.get("id")

// Selection de la classe pour injecter l'html
const affichageArticle = document.querySelector(".product");

// Faire un fetch pour recuperer les infos de mon produit
const url = `http://localhost:3000/api/teddies/${id}`;
fetch(url)
    .then(function(data) {
        return data.json()
    })
    .then(function(product) {
        const structureArticle = `
            <article class="article_alone">
                <img class="teddy" src="${product.imageUrl}" alt="ours en peluche" width=350 height=200>
                <h3>${product.name}</h3>
                <p>Description :${product.description} </p>
                <span>Prix :${product.price/100} €</span>
                <form>
                    <label for="option_produit">Choisir l'option :</label>
                    <select id="option_produit" name="option_produit"></select>
                </form>
                <button id="btn" type="submit" name="btn-envoyer">Ajouter au panier</button>
            </article> 
                        `;
        const choixCouleurs = product.colors
        let stuctureOptions = [];

        // Choix des options de couleur de mon article (boucle)
        for (let i = 0; i < choixCouleurs.length; i++) {
            stuctureOptions = stuctureOptions +
                `
            <option value="${i+1}">${choixCouleurs[i]}</option>
            `;
        }

        affichageArticle.innerHTML = structureArticle;

        const optionColor = document.querySelector("#option_produit");
        optionColor.innerHTML = stuctureOptions;

        // Récupérer mon article dans mon panier
        const idForm = document.querySelector("#option_produit");

        // Selection du bouton ajouter l'article
        const btnSubmit = document.querySelector("#btn");

        // Ecouter le bouton
        btnSubmit.addEventListener("click", (event) => {
            event.preventDefault();

            // Regarder se que contient mon Local Storage
            let registerProductStorage = JSON.parse(localStorage.getItem("panier"));

            if (registerProductStorage === null) {
                // si le local storage est vide
            } else {
                // le local Storage a des produits, si le produit que je met dans mon panier est dans le local storage, alors je change la quantite du produit et ne rajoute pas new product
                registerProductStorage.forEach((element) => {
                    if (element.id === id) element.quantite++
                });
            }
            // Choix de l'option dans une variable
            const choixForm = idForm.value;
            // console.log(choixForm);

            // Récupération des valeurs
            let optionsProduit = {
                    id: id,
                    imageUrl: product.imageUrl,
                    Name: product.name,
                    description: product.description,
                    choixCouleurs: choixForm,
                    quantite: 1,
                    price: product.price / 100
                }
                // Fonction pour répétition
            const addLocalStorage = () => {
                registerProductStorage.push(optionsProduit);
                localStorage.setItem("panier", JSON.stringify(registerProductStorage));
            }

            // Ajout de mon article dans le localStorage

            const messageValide = document.querySelector(".msg");

            if (registerProductStorage) {
                addLocalStorage();
                messageValide.innerHTML = `Votre article a été ajouter au <strong><a class="lienPanier" href="panier.html">panier</a></strong>
                </br><p class="msgBlack">Retournez sur la page <strong><a class="lienAccueil" href="index.html">d'accueil ?</a></strong></p>`;
            } else {
                registerProductStorage = [];
                addLocalStorage();
                messageValide.innerHTML = `Votre article a été ajouter au <strong><a class="lienPanier" href="panier.html">panier</a></strong>
                </br><p class="msgBlack">Retournez sur la page <strong><a class="lienAccueil" href="index.html">d'accueil ?</a></strong></p>`;
                // console.log(registerProductStorage);

            }
        });
    })
    .catch(function(err) {

    });

// -------------------------


// affiche sur dans le panier
// fonction clear le panier (et les element individuel)

// popufconfirmation, remplacer par du inner

// formulaire de commande 
// verifier chaque champs ()