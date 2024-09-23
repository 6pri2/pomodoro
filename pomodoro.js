let tempsBase = 1500; // 25 minutes par défaut
let tempsPauseBase = 300; // 5 minutes par défaut
let temps = tempsBase;
let intervalId = null; // Stocke l'identifiant de l'intervalle
let pause = document.getElementById("pause");
let reset = document.getElementById("reset");
const timerElement = document.getElementById("timer");
let position = document.getElementById("position");
const btnParametres = document.getElementById('openModalBtn'); // Bouton Paramètres

// Afficher le temps initial au chargement de la page
let afficheMinute = parseInt(temps / 60, 10);
afficheMinute = afficheMinute < 10 ? "0" + afficheMinute : afficheMinute;
let afficheSeconde = parseInt(temps % 60, 10);
afficheSeconde = afficheSeconde < 10 ? "0" + afficheSeconde : afficheSeconde;
timerElement.innerText = afficheMinute + " : " + afficheSeconde;

function commencer() {
    // Empêche de lancer plusieurs minuteurs en même temps
    if (!intervalId) {
        intervalId = setInterval(diminuerTemps, 1000);
        btnParametres.disabled = true; // Désactiver le bouton "Paramètres"
    }
}

function diminuerTemps() {
    pause.style.display = "none";
    reset.style.display = "block";
    
    let minutesTime = parseInt(temps / 60, 10);
    let secondesTime = parseInt(temps % 60, 10);

    minutesTime = minutesTime < 10 ? "0" + minutesTime : minutesTime;
    secondesTime = secondesTime < 10 ? "0" + secondesTime : secondesTime;

    timerElement.innerText = minutesTime + " : " + secondesTime;

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

function resetTimer() {
    // Arrêter le minuteur actuel
    clearInterval(intervalId);
    intervalId = null;

    // Réinitialiser à zéro et repasser en mode travail
    temps = tempsBase;
    position.textContent = "travail";

    // Réafficher le temps de travail
    let minutesTime = parseInt(temps / 60, 10);
    let secondesTime = parseInt(temps % 60, 10);

    minutesTime = minutesTime < 10 ? "0" + minutesTime : minutesTime;
    secondesTime = secondesTime < 10 ? "0" + secondesTime : secondesTime;

    timerElement.innerText = minutesTime + " : " + secondesTime;

    // Réafficher le bouton "play"
    pause.style.display = "block";
    reset.style.display = "none";

    // Réactiver le bouton "Paramètres"
    btnParametres.disabled = false;
}

// Changement du temps via la modale
const modal = document.getElementById('myModal');
const btn = document.getElementById('openModalBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = 'block';
}

// Fermer la modale quand on clique sur "X"
span.onclick = function() {
    modal.style.display = 'none';
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

    if ((minutesTravail === 0 && secondsTravail === 0) || (minutesPause === 0 && secondsPause === 0)) {
        alert("Veuillez entrer un temps valide pour le travail ou la pause (pas 0 min et 0 sec).");
        return; // Empêche la soumission du formulaire
    }


    const totalSecondsTravail = (parseInt(minutesTravail) * 60) + parseInt(secondsTravail);
    const totalSecondsPause = (parseInt(minutesPause) * 60) + parseInt(secondsPause);

    tempsBase = totalSecondsTravail;
    tempsPauseBase = totalSecondsPause;

    temps = tempsBase; // On commence par le temps de travail

    // Afficher le nouveau temps formaté
    let minuteAffiche = minutesTravail < 10 ? "0" + minutesTravail : minutesTravail;
    let secondAffiche = secondsTravail < 10 ? "0" + secondsTravail : secondsTravail;

    timerElement.innerText = minuteAffiche + " : " + secondAffiche;

    // Fermer la modale après soumission
    modal.style.display = 'none';

    // Arrêter le minuteur en cours et le réinitialiser
    clearInterval(intervalId);
    intervalId = null;

    // Réactiver le bouton "Paramètres"
    btnParametres.disabled = false;
});
