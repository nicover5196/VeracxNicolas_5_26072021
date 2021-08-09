alert("page produit")

// Récuperer l'id qui a été passée en parametre de mon url

const urlId = window.location.search;

// Récuperer l'url 

const monUrl = window.location.href;

// Extraction de l'id 

const urlSearchParams = new URLSearchParams(urlId);
const id = urlSearchParams.get("id")

// Affichage dans la console 
// console.log(urlId);
// console.log(monUrl);
// console.log(urlSearchParams)
// console.log(id);

// Faire un fetch pour recuperer les infos de mon produit
const url = `http://localhost:3000/api/teddies/${id}`;
fetch(url)
    .then(function(res) {
        console.log(res)
        if (res.ok) {
            res.json();
        }
    })
    .then(function(value) {
        console.log(value);
    })
    .catch(function(err) {

    });

// Selection de la classe pour injecter l'html
const affichageArticle = document.querySelector(".product");
// console.log(affichageArticle)

// Création de la structure html du produit 

// const structureArticle = `
//             <article>
//                 <img class="teddy" src="${product.imageUrl}">
//                 <h3>${product.name}</h3>
//                 <ul>
//                     <li>
//                         <p>Description :${product.description} </p>
//                     </li>
//                     <li>
//                         <span>Prix :${product.price} </span>
//                     </li>
//                 </ul>
//                 <form>
//                     <label for="option_produit"></label>
//                     <select name="option_couleur" id="option_produit">
//                         <option value="option1">${product.colors}</option>
//                         <option value="option2">${product.colors}</option>
//                     </select>
//                 </form>
//                 <button id="btn-envoyer" type="submit" name="btn-envoyer">Ajouter au panier</button>
//             </article> 
//                         `;

// affichageArticle.innerHTML = structureArticle;


// Précisez les options de mon produit dans un selecteur ( couleur..)
// au clic d'un boutton créer, ajouter mon produit dans le local storage


// Bonus : page panier