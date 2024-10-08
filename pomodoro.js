let tempsBase = 1500; // 25 minutes par défaut
let tempsPauseBase = 300; // 5 minutes par défaut
let temps = tempsBase;
let intervalId = null; // Stocke l'identifiant de l'intervalle
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
const timerElement = document.getElementById("timer");
let position = document.getElementById("position");
const btnParametres = document.getElementById('openModalBtn'); // Bouton Paramètres
let cent = document.getElementById('cent');

//fonction affichant le temps 
function afficheTemps(){
    let afficheMinute = parseInt(temps / 60, 10);
    afficheMinute = afficheMinute < 10 ? "0" + afficheMinute : afficheMinute;
    let afficheSeconde = parseInt(temps % 60, 10);
    afficheSeconde = afficheSeconde < 10 ? "0" + afficheSeconde : afficheSeconde;
    timerElement.innerText = afficheMinute + " \n " + afficheSeconde;
}


// Afficher le temps initial au chargement de la page
window.onload = function() {
    const minutesTravail = localStorage.getItem('minutesTravail') || 25; // 25 par défaut
    const secondsTravail = localStorage.getItem('secondsTravail') || 0;  // 0 par défaut
    const minutesPause = localStorage.getItem('minutesPause') || 5;      // 5 par défaut
    const secondsPause = localStorage.getItem('secondsPause') || 0;      // 0 par défaut

    // Mettre à jour les champs du formulaire
    document.getElementById('minutesTravail').value = minutesTravail;
    document.getElementById('secondsTravail').value = secondsTravail;
    document.getElementById('minutesPause').value = minutesPause;
    document.getElementById('secondsPause').value = secondsPause;

    // Calculer le temps total pour le minuteur
    const totalSecondsTravail = (parseInt(minutesTravail) * 60) + parseInt(secondsTravail);
    const totalSecondsPause = (parseInt(minutesPause) * 60) + parseInt(secondsPause);

    // Mettre à jour les variables globales
    tempsBase = totalSecondsTravail;
    tempsPauseBase = totalSecondsPause;

    temps = tempsBase; // Initialiser avec le temps de travail

    // Afficher le temps de travail
    afficheTemps();
};

//fonction lancant le minuteur
function commencer() {
    // Empêche de lancer plusieurs minuteurs en même temps
    if (!intervalId) {
        intervalId = setInterval(diminuerTemps, 1000);
        btnParametres.disabled = true; // Désactiver le bouton "Paramètres"
        btnParametres.style.display='none';
    }
}

//fonction du minuteur enchenant les minuteurs de travails puis de pause 
function diminuerTemps() {
    pause.style.display = "none";
    reset.style.display = "contents";
    
    afficheTemps()

    if (temps === 0) {
        if (position.textContent === "pause") {
            position.textContent = "travail";
            temps = tempsBase;
        } else {
            position.textContent = "pause";
            temps = tempsPauseBase;
        }
    } else {
        temps--;
    }
}

//fonction permettant de remettre à zéro le minuteur 
function resetTimer() {
    // Arrêter le minuteur actuel
    clearInterval(intervalId);
    intervalId = null;

    // Réinitialiser à zéro et repasser en mode travail
    temps = tempsBase;
    position.textContent = "travail";

    // Réafficher le temps de travail
    afficheTemps();

    // Réafficher le bouton "play"
    pause.style.display = "contents";
    reset.style.display = "none";

    // Réactiver le bouton "Paramètres"
    btnParametres.style.display = "contents" ;
    btnParametres.disabled = false;
}

// Changement du temps via la modale
const modal = document.getElementById('myModal');
const btn = document.getElementById('openModalBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    cent.style.display = 'none'
    modal.style.display = 'contents';
}

// Fermer la modale quand on clique sur "X"
span.onclick = function() {
    modal.style.display = 'none';
    cent.style.display ='contents';
}

// Fermer la modale quand on clique à l'extérieur
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
        
    }
}

// Gestion du formulaire de temps
document.getElementById('timeForm').addEventListener('submit', function(event) {

    event.preventDefault();

    const minutesTravail = parseInt(document.getElementById('minutesTravail').value);
    const secondsTravail = parseInt(document.getElementById('secondsTravail').value);
    const minutesPause = parseInt(document.getElementById('minutesPause').value);
    const secondsPause = parseInt(document.getElementById('secondsPause').value);

    //Vérification que le temps ne soit pas égale à zéro
    if ((minutesTravail === 0 && secondsTravail === 0) || (minutesPause === 0 && secondsPause === 0)) {
        alert("Veuillez entrer un temps valide pour le travail ou la pause (pas 0 min et 0 sec).");
        return; // Empêche la soumission du formulaire si valeur incorrect
    }

    //Vérification que le timer soit inférieur à 1h
    if((minutesTravail ===60 && secondsTravail >0)||(minutesPause === 60 && secondsPause >0)){
        alert("Veuillez entre un temps valide pour le travail et la pause (impossible au dessus de 60 min)")
        return;
    }


    const totalSecondsTravail = (parseInt(minutesTravail) * 60) + parseInt(secondsTravail);
    const totalSecondsPause = (parseInt(minutesPause) * 60) + parseInt(secondsPause);

    // Sauvegarder les valeurs dans LocalStorage
    localStorage.setItem('minutesTravail', minutesTravail);
    localStorage.setItem('secondsTravail', secondsTravail);
    localStorage.setItem('minutesPause', minutesPause);
    localStorage.setItem('secondsPause', secondsPause);

    tempsBase = totalSecondsTravail;
    tempsPauseBase = totalSecondsPause;

    temps = tempsBase;

    // Afficher le nouveau temps formaté
    let minuteAffiche = minutesTravail < 10 ? "0" + minutesTravail : minutesTravail;
    let secondAffiche = secondsTravail < 10 ? "0" + secondsTravail : secondsTravail;

    timerElement.innerText = minuteAffiche + " \n " + secondAffiche;

    // Fermer la modale après soumission
    modal.style.display = 'none';
    cent.style.display = 'contents'

    // Arrêter le minuteur en cours et le réinitialiser
    clearInterval(intervalId);
    intervalId = null;

    // Réactiver le bouton "Paramètres"
    btnParametres.disabled = false;
});

modal.style.display='none';
reset.style.display='none' ;