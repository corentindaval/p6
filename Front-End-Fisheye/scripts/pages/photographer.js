const url = new URL(window.location.href);
const photographerId = url.searchParams.get("id");
const menuSelect = document.querySelector(".choix");



//header et media

//recup json
async function getPhotographers() {
    const response = await fetch("data/photographers.json");  //appel du json
    const media = await response.json();   // recup des données du json
    return media;                           //  retourne les données json
}


//affichage header

function displayData(photographers) {
    const photographerHeader = document.querySelector(".photograph-header");
    let bandeauPrix = 0;

    photographers.forEach(photographer => {  //dans les données de tous les photographes, pour chaque photographe
        if (photographer.id == photographerId) {  //si l'id du photographe est égal à l'id de photographerId dans json
            const photographerModel = photographerFactoryInfo(photographer); //creation de la const qui met en place la fonction de create pour un photographe
            const userCardDOM = photographerModel.getUserMediaCardDOM();  //creation de la const qui regroupe la 1ère et la 2ème fonction de create pour un photographe
            photographerHeader.appendChild(userCardDOM);

            bandeauPrix = photographer.price;// textcontent = prix du photographe
            console.log(bandeauPrix);
        }
    });
    const bandeau_prix = document.getElementById("gain");//cible le bandeau au niveau du prix
    bandeau_prix.innerHTML = bandeauPrix + "€ / jour";//insere le prix plus le texte
}

// affichage contenue
function displayDataMedia(medias) {
    switch (menuSelect.value) {       // selection

        case "pop":
            medias.sort(function (a, b) {
                return b.likes - a.likes;
            })
            break;

        case "date":
            medias.sort(function (a, b) {
                return new Date(b.date) - new Date(a.date);
            })
            break;

        case "titre":
            medias.sort(function (a, b) {
                return a.title.localeCompare(b.title);
            })
            break;
    }
    //affichage de la selection
    const cartesMedias = document.querySelector(".cartes_medias");
    cartesMedias.innerHTML = "";

    //affichage lightbox
    const lightbox = document.querySelector(".lightbox");
    lightbox.innerHTML = "";
    let totalLikes = 0;
    let i = 0;
    let test = 0;
    medias.forEach(media => {
        if (media.photographerId == photographerId) {
           
            const mediaModel = mediaFactory(media);
            const userMediaDOM = mediaModel.getUserMediaDOM();
            cartesMedias.appendChild(userMediaDOM);
            createMediaLightboxDom(media);

            totalLikes += media.likes;
        }
    })
    ajoutLikes();   //appel de la fonction de gestion des likes, pour agir aussi si les medias sont triés

    let total_likes = document.getElementById("total_likes");
    total_likes.innerHTML = totalLikes;// textcontent = addition des likes de base du photographe

    //event click sur photo
    let mediaArticle = document.querySelector(".cartes_medias");
    for (let i = 0; i < mediaArticle.childNodes.length; i++) {
        mediaArticle.childNodes[i].childNodes[0].addEventListener("click", function () {
            mediaLocal(i + 1);
            open();
            createIconeLightboxDom();
        })
        //event clavier sur photo
        mediaArticle.childNodes[i].childNodes[0].addEventListener("keypress", function (e) {
            if (e.key == "Enter") {
                mediaLocal(i + 1);
                open();
                createIconeLightboxDom();
            }
        });
    }

}



//system de likes

function ajoutLikes() {
    const coeurs = document.querySelectorAll(".coeur");// je cible le span des coeurs
    coeurs.forEach(e => {
        var ischecked = false;
        //event click
        e.addEventListener("click", function () {// au click sur l'element

            const nbreLike = e.parentElement.children[1];//creation constante qui cible le nbre de like
            if (ischecked == false) {
                nbreLike.textContent++;// j'ajoute 1 au nbre de like
                let totalLikes = document.getElementById("total_likes");// je cible le total des likes dans le bandeau
                totalLikes.innerHTML++; // j'ajoute 1 a ce total
                ischecked = true;
            } else {
                nbreLike.textContent--;// j'ajoute 1 au nbre de like
                let totalLikes = document.getElementById("total_likes");// je cible le total des likes dans le bandeau
                totalLikes.innerHTML--; // j'ajoute 1 a ce total
                ischecked = false;
            }
          
        });

        //event clavier
        e.addEventListener("keypress", function () {

            const nbreLike = e.parentElement.children[1];
            if (ischecked == false) {
                nbreLike.textContent++;
                let totalLikes = document.getElementById("total_likes");
                totalLikes.innerHTML++;
            } else {
                nbreLike.textContent--;// j'ajoute 1 au nbre de like
                let totalLikes = document.getElementById("total_likes");// je cible le total des likes dans le bandeau
                totalLikes.innerHTML--; // j'ajoute 1 a ce total
                ischecked = false;
            }
           
        });
    });
}


//  affichage
async function display() {
    const { photographers, media } = await getPhotographers();  //créat de la const qui doit récupérer les données json  via la f. fetch
    displayData(photographers);
    displayDataMedia(media);

    menuSelect.onchange = function () { displayDataMedia(media) };
}
display(); 