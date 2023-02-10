const lightboxMedia = document.getElementsByClassName("lightbox_media");

//afficher la lightbox
function open() {
    lightbox.style.display = "block";
}
//cacher la lightbox
function close() {
    lightbox.style.display = "none";
}

let mediaIndex = 1;
//afficher/cacher l'image
function mediaVue(n) { 
    let i;

    if (n > lightboxMedia.length) {
        mediaIndex = 1;
    }
    if (n < 1) {
        mediaIndex = lightboxMedia.length;
    }
    for (i = 0; i < lightboxMedia.length; i++) {
        lightboxMedia[i].style.display = "none";
    }
    lightboxMedia[mediaIndex - 1].style.display = "block";

}

//naviguation entre les images
function mediaNav(n) {
    mediaVue(mediaIndex += n);
}

//localisation lors de la navigation entre images
function mediaLocal(n) { 
    mediaVue(mediaIndex = n);
}

//event clavier

document.onkeydown = lightboxNavClavier;

function lightboxNavClavier(e) {

    if (e.keyCode == '37') {    //precedent
        mediaNav(-1);
    }
    else if (e.keyCode == '39') {   //suivant
        mediaNav(1);
    }

    if (lightbox.style.display = "block" && e.code == "Escape") { //fermeture
        close();
    }
}
