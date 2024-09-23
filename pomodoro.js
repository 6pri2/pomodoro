//timer

let tempsBase = 1500
let tempsPauseBase = 300
let temps = tempsBase
let pause = document.getElementById("pause")
let reset = document.getElementById("reset")
const timerElement = document.getElementById("timer")
let position = document.getElementById("position")

let afficheMinute = parseInt(temps/60,10)
afficheMinute = afficheMinute < 10 ? "0" + afficheMinute : afficheMinute;
let afficheSeconde = parseInt (temps%60,10)
afficheSeconde = afficheSeconde < 10 ? "0" + afficheSeconde : afficheSeconde;
timerElement.innerText=afficheMinute + " : " + afficheSeconde

function commencer(){
    setInterval(diminuerTemps, 1000)
}


function diminuerTemps(){

    pause.style.display  = "none"
    reset.style.display = "block"
    btn.style.display = "none"
    let minutesTime = parseInt(temps /60, 10)
    let secondesTime = parseInt(temps %60,10)

    minutesTime = minutesTime <10 ? "0" + minutesTime : minutesTime
    secondesTime = secondesTime <10 ? "0" + secondesTime : secondesTime

    timerElement.innerText=minutesTime + " : " + secondesTime
    //fin du timer : 
    //temps = temps <= 0 ? 0 : temps - 1
    if(temps ===0){
        if(position.textContent == "pause"){
            position.textContent ="travail"
            temps = tempsBase
        }
        else{
            position.textContent = "pause"
            temps = tempsPauseBase
        }
    }
    else{
        temps--
        
    }
    
}


//Changement du temps

const modal = document.getElementById('myModal');
const btn = document.getElementById('openModalBtn');
const span = document.getElementsByClassName('close')[0];

btn.onclick = function() {
    modal.style.display = 'block';
}

// Fermer la modal quand on clique sur le "X"
span.onclick = function() {
    modal.style.display = 'none';
}

// Fermer la modal quand on clique à l'extérieur
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Gestion du formulaire de temps
document.getElementById('timeForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission de recharger la page

    // Récupérer les valeurs du formulaire
    const minutesTravail = document.getElementById('minutesTravail').value;
    const secondsTravail = document.getElementById('secondsTravail').value;
    const minutesPause = document.getElementById('minutesPause').value; 
    const secondsPause = document.getElementById('secondsPause').value;

    // Modification des variables
    const totalSecondsTravail = (parseInt(minutesTravail) * 60) + parseInt(secondsTravail);
    tempsBase = totalSecondsTravail
    temps= totalSecondsTravail
    tempsPauseBase = (parseInt(minutesPause) * 60) + parseInt(secondsPause);
    
    
    //Affichage du temps modifier
    let minuteAffiche = minutesTravail < 10 ? "0" + minutesTravail : minutesTravail;
    let secondAffiche = secondsTravail < 10 ? "0" + secondsTravail : secondsTravail;

    timerElement.innerText=minuteAffiche + " : " + secondAffiche
    //document.getElementById('result').textContent = `Temps total : ${minutes} minutes et ${seconds} secondes (${totalSeconds} secondes au total)`;

    // Fermer la modal après soumission
    modal.style.display = 'none';
});


