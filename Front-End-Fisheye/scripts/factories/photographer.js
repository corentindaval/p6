//function photographerFactory(data) {
  //  const { name, portrait } = data;

    //const picture = `assets/photographers/${portrait}`;

    //function getUserCardDOM() {
      //  const article = document.createElement( 'article' );
        //const img = document.createElement( 'img' );
        //img.setAttribute("src", picture)
        //const h2 = document.createElement( 'h2' );
        //h2.textContent = name;
        //article.appendChild(img);
        //article.appendChild(h2);
        //return (article);
    //}
    //return { name, picture, getUserCardDOM }
//}

//accueil
function photographerFactory(data) {                                 

    function getUserCardDOM() {                                     //recuperation des elements
        const { name, id, city, country, tagline, price, portrait} = data;
        const picture = `assets/photographers/${portrait}`;


        const article = document.createElement("article");
        article.setAttribute("title", "Détail du photographe");
        article.setAttribute("tabindex", "2");

        const img = document.createElement("img");
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");
        const p = document.createElement("p");



        // liaison entre index.html et photographer.html
        article.addEventListener("click", () => {
            window.location.href = `photographer.html?id=${id}`;
        })
       
        article.addEventListener("keypress", () => {
            window.location.href = `photographer.html?id=${id}`;
        })

        img.setAttribute("src", picture);
        img.setAttribute("alt", "photo" + " " + name);
        h2.textContent = name;
        h2.setAttribute("aria-label", name);
        h3.textContent = city + ", " + country;
        h4.textContent = tagline;
        p.textContent = price + "€/jour";

        article.appendChild(img)
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(p);
        return (article);
    }
    return { getUserCardDOM }
}


//photographer
function photographerFactoryInfo(data) {

    function getUserMediaCardDOM() {
        const { name, city, country, tagline,portrait } = data;

        const section = document.createElement("section");
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const h3 = document.createElement("h3");
        const h4 = document.createElement("h4");

        section.classList = "photographerHeader";
        div.classList = "infosPhotographe";
        h2.textContent = name;
        h2.setAttribute("tabindex", "1");
        h2.setAttribute("aria-label", name);
        h3.textContent = city + ", " + country;
        h4.textContent = tagline;

        div.appendChild(h2);
        div.appendChild(h3);
        div.appendChild(h4);

        const button = document.createElement("div");
        button.innerHTML = `<button class="contact_button" tabindex="2" aria-label = "contacter le photographe" onclick="displayModal()">Contactez-moi</button>`;

        const photoPhotographe = document.createElement("div");
        const picture = `assets/photographers/${portrait}`;
        const img = document.createElement("img");

        photoPhotographe.classList = ("photo");
        img.setAttribute("alt", "photo" + " " + name);
        img.setAttribute("src", picture);

        section.appendChild(div);
        section.appendChild(button);
        section.appendChild(img);

        document.getElementById("titre_modal").innerHTML = document.getElementById("titre_modal").innerHTML + "<br/>" + data.name; //recuperation du texte présent dans l'id  titre_modal et  ajout d'un retour a la ligne et du nom du photographe concerner

        return section;
    }
    return { getUserMediaCardDOM }
}
