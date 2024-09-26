// je veux envoyer du log
console.log("mon fichier fonctionne!");

// ma premiére boucle
for (var i = 0; i <= 15; i++) {
    console.log(" player " + i + " connecté ");

    // tester si nombre pair ou impair


    // ma première condition
    if (nombrePair(i)) {
        // conséquences
        console.log("player pair");
    } else {
        //sinon
        console.log("player impair");
    }

}

// ma première fonction
function nombrePair(nb) {
    return Number.isInteger(nb / 2);

}