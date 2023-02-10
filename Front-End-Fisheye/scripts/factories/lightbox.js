//init dom lightbox

const lightbox = document.createElement("div");
lightbox.className = "lightbox";
document.body.appendChild(lightbox);


//init buttons

function createIconeLightboxDom() { 

    const iconePrecedent = document.createElement("i");
    iconePrecedent.className = "fas fa-chevron-left";
    iconePrecedent.id = "precedent";
    iconePrecedent.setAttribute("onclick", "mediaNav(-1)");
    iconePrecedent.setAttribute("aria-label", "image précédente");
    lightbox.appendChild(iconePrecedent);

    const iconeSuivant = document.createElement("i");
    iconeSuivant.className = "fas fa-chevron-right";
    iconeSuivant.setAttribute("onclick", "mediaNav(1)");
    iconeSuivant.id = "suivant";
    iconeSuivant.setAttribute("aria-label", "image suivante");
    lightbox.appendChild(iconeSuivant);

    const iconeClose = document.createElement("i");
    iconeClose.className = "fas fa-times";
    iconeClose.id = "close";
    iconeClose.setAttribute("aria-label", "fermer la lightbox");
    lightbox.appendChild(iconeClose);
    iconeClose.addEventListener("click", close);

}



//init img et titres

function createMediaLightboxDom(data) { 

    const mediaLightbox = document.createElement('div');
    mediaLightbox.className = "lightbox_media";
    const lien = document.createElement("a");

    const { title, image, video } = data

    if ("video" in data) {
        const photoVideo = document.createElement("video");
        const mp4 = `assets/photographers/${video}`;
        const source = document.createElement("source");

        photoVideo.setAttribute("controls", " ");
        lien.setAttribute("href", mp4);
        source.setAttribute("src", mp4);
        source.setAttribute("alt", title);
        source.setAttribute("type", "video/mp4");
        photoVideo.appendChild(source);
        lien.appendChild(photoVideo);
        mediaLightbox.appendChild(lien);
    }
    else {
        const img = document.createElement("img");
        const photo = `assets/photographers/${image}`;
        lien.setAttribute("href", photo);
        img.setAttribute("src", photo);
        img.setAttribute("alt", "photo" + " " + title);
        lien.appendChild(img);
        mediaLightbox.appendChild(lien);
    }

    const titrePhotoLightbox = document.createElement("h3");
    titrePhotoLightbox.className = "titreLightbox";
    titrePhotoLightbox.textContent = title;

    lightbox.appendChild(mediaLightbox);
    mediaLightbox.appendChild(titrePhotoLightbox);
}
