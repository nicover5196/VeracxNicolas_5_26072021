/* Affichage de mon produit par son ID */
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

        // Choix des options de couleur de mon article (boucle)
        // ma variable qui contient les couleurs de mon produit
        const choixCouleurs = product.colors
            // console.log(choixCouleurs)
        let stuctureOptions = [];
        for (let i = 0; i < choixCouleurs.length; i++) {
            stuctureOptions = stuctureOptions +
                `
            <option value="${i+1}">${choixCouleurs[i]}</option>
            `;
            // console.log(stuctureOptions)
        }
        // Afficher ma structure dans ma variable qui contient l'element de ma classe html
        affichageArticle.innerHTML = structureArticle;
        // Selection de la classe pour l'ajouter dans ma variable
        const optionColor = document.querySelector("#option_produit");
        // Afficher dans un tableau ma boucle qui numérote & qui contient les couleurs de mon produit
        optionColor.innerHTML = stuctureOptions;
        // Récupérer mon article dans mon panier
        // récupere l 'id de mon selecteur dans mon html dynamique située dans ma structure article
        const idForm = document.querySelector("#option_produit");
        // console.log(idForm)
        // récupere le bouton ajouter l'article
        const btnSubmit = document.querySelector("#btn");

        // Ecouter le boutton au click de souris (event prevent permet d'annuler tout comportement autre)
        btnSubmit.addEventListener("click", (event) => {
            event.preventDefault();

            // Regarder se que contient mon Local Storage
            let registerProductStorage = JSON.parse(localStorage.getItem("panier"));

            // récupère la valeur de ma variable idform
            const choixForm = idForm.value;
            // variable qui récupérer les données de mon produit ( id, img, ...)
            let optionsProduit = {
                    id: id,
                    imageUrl: product.imageUrl,
                    Name: product.name,
                    description: product.description,
                    choixCouleurs: choixForm,
                    quantite: 1,
                    price: product.price / 100
                }
                // création d'une fonction qui envoie ma variable options ( données) dans le local storage, puis qui les modifie
            const addLocalStorage = () => {
                registerProductStorage.push(optionsProduit);
                localStorage.setItem("panier", JSON.stringify(registerProductStorage));
            }
            const messageValide = document.querySelector(".msg");

            if (registerProductStorage === null) {
                registerProductStorage = [];
                addLocalStorage();
                // ajout du message dans ma variable qui contient la classe
                messageValide.innerHTML = `Votre article a été ajouter au <strong><a class="lienPanier" href="panier.html">panier</a></strong>
                </br><p class="msgBlack">Retournez sur la page <strong><a class="lienAccueil" href="index.html">d'accueil ?</a></strong></p>`;
                console.log("article ajouté si le local contient rien")
                    // SI condition EST STRICTEMENT EGALE A null (si il y a des articles car ce n'est pas null)== afficher dans ma console 
            } else {
                // SINON condition (mon panier n'est pas vide) récupere l'article ajouter, vérifie si l'id et = au même id, si oui, modifié la quantité
                registerProductStorage.forEach((element) => {
                    if (element.choixCouleurs === choixForm && element.id === id) element.quantite++
                        localStorage.setItem("panier", JSON.stringify(registerProductStorage))
                });
                messageValide.innerHTML = `Votre article a été ajouter au <strong><a class="lienPanier" href="panier.html">panier</a></strong>
                </br><p class="msgBlack">Retournez sur la page <strong><a class="lienAccueil" href="index.html">d'accueil ?</a></strong></p>`;
                console.log("article ajouté si le local contient le même article avec le même choix couleurs & id ")
            }
        })
    })
    .catch(function(err) {

    });