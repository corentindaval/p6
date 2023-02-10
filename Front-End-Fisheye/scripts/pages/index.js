   /* async function getPhotographers() {
        // Ceci est un exemple de données pour avoir un affichage de photographes de test dès le démarrage du projet, 
        // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
        let photographers = [
            {
                "name": "Ma data test",
                "id": 1,
                "city": "Paris",
                "country": "France",
                "tagline": "Ceci est ma data test",
                "price": 400,
                "portrait": "account.png"
            },
            {
                "name": "Autre data test",
                "id": 2,
                "city": "Londres",
                "country": "UK",
                "tagline": "Ceci est ma data test 2",
                "price": 500,
                "portrait": "account.png"
            },
        ]
        // et bien retourner le tableau photographers seulement une fois récupéré
        return ({
            photographers: [...photographers, ...photographers, ...photographers]})
    }
    */
async function getPhotographers () {                                  //récupération du JSON
    const response = await fetch ("data/photographers.json");
    const photographers = await response.json();
    return photographers;
}

async function displayData(photographers) {                     // fonction qui cible l'endroit et fait apparaitre les nouveaux éléments
  const photographersSection = document.querySelector(".photographer_section"); 
          //cible l'endroit du DO

  photographers.forEach((photographer) => {                   //récupérer la réponse du JSON const photographer pour chaque photographe
    const photographerModel = photographerFactory (photographer);//création de la constante qui récupère la 1ère fonction
    const userCardDOM = photographerModel.getUserCardDOM();         // création de la constante qui récupère la 1ère et la 2ème fonction
    photographersSection.appendChild(userCardDOM);
                             //Mise en place des 2 fonctions en tant qu'enfant
  });
}

async function display(){                                              //Fonction mettre en display le résultat de toutes les fonctions
  const {photographers} = await getPhotographers();               //const photographers récupère le tableau du JSON
  displayData(photographers);
}
display (); 


    
