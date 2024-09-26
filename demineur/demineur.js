//////////// les variable du démineur////////////
var nb_ligne;
var nb_colonne;
var difficulty;
var audio;



// on cible l'objet Grille
// $ veut dire jQuery
var Grille = $("#grille");

// objet des boutons
var level1 = $("#level1");
var level2 = $("#level2");
var level3 = $("#level3");

/////////// Début de Partie////////////
// Appel de la fonction startGame
//startGame();
//////////////////fonctions//////////
// fonction pour les difficultés
level1.click(
    function() {
        nb_ligne = 5;
        nb_colonne = 9;
        difficulty = 0.2;
        // redémarer le jeux
        startGame();
        var timer;

        function startTimer() {
            var secondes = 0;
            if (typeof(timer != 'undefined')) {
                clearInterval(timer);
            }
            timer = window.setInterval(function() {
                $('#timer').text(secondes);
                secondes++;
            }, 1000);
        }
    }
);


level2.click(
    function() {
        nb_ligne = 10;
        nb_colonne = 10;
        difficulty = 0.3;
        // redémarer le jeux
        startGame();
        var timer;

        function startTimer() {
            var secondes = 0;
            if (typeof(timer != 'undefined')) {
                clearInterval(timer);
            }
            timer = window.setInterval(function() {
                $('#timer').text(secondes);
                secondes++;
            }, 1000);
        }
    }
);

level3.click(
    function() {
        nb_ligne = 11;
        nb_colonne = 11;
        difficulty = 0.4;
        // redémarer le jeux
        startGame();
        var timer;

        function startTimer() {
            var secondes = 0;
            if (typeof(timer != 'undefined')) {
                clearInterval(timer);
            }
            timer = window.setInterval(function() {
                $('#timer').text(secondes);
                secondes++;
            }, 1000);
        }
    }
);

function startGame() {
    // vider la grille
    Grille.empty();
    // chacher la grille
    Grille.hide();
    //dessiner
    dessinerGrille();
    // calcul des indésirables
    calculIndesirable();
    // effet spéciaux  en 2000ms = 2sec
    Grille.fadeIn(2000);
}

function dessinerGrille() {

    // boucle pour les lignes
    for (var i = 0; i < nb_ligne; i++) {
        // on créer un objet ligne
        var ligne = $("<tr></tr>");
        // boucle pour les colonnes
        for (var j = 0; j < nb_colonne; j++) {
            // on créer un objet cellule
            var cellule = $("<td></td>");

            // on ajoute des classe de coordonnées
            cellule.addClass("i" + i);
            cellule.addClass("j" + j);

            // en informatique pour dire et c'est &&
            // en informatique pour dire ou c'est ||



            // gestions des indésirables
            var tirageAuSort = Math.random();
            if (tirageAuSort < difficulty) {
                cellule.addClass("indesirable");

            }
            // on rajoute la peinture pour cacher les cases
            cellule.addClass("paint");
            // comportement du clic gauche
            // dévoiler la cellule
            cellule.click(
                function() {
                    //enlever la peinture
                    $(this).removeClass("paint");
                    // dévoiler les 0
                    if ($(this).text() == "0") {
                        // appel de la fonction
                        devoilerZeros($(this))

                    }

                    // condition de Game Over
                    if ($(this).hasClass("indesirable")) {
                        // on dévoile toute les cases
                        $("td").removeClass("paint");
                        var audio = new Audio("lose.mp3");
                        audio.play();
                        alert('GAME OVER');


                    }

                    //condtion de win
                    if ($(".paint").length == $(".indesirable").length) {
                        // on dévoile toute les cases
                        $("td").removeClass("paint");
                        var audio = new Audio("victory.mp3");
                        alert('YOU WIN');



                    }


                }

            );


            // le click droit qui pose le drapeau
            // contextmenu = click droit
            cellule.contextmenu(
                function(event) {
                    // enlever le comportement par défaut(menu)
                    event.preventDefault();
                    // poser un drapeau
                    if ($(".flag").length < $(".indesirable").length) {
                        $(this).toggleClass("flag");
                    } else if ($(this).hasClass("flag")) {
                        $(this).toggleClass("flag");

                    }

                }
            )


            // je rajoute la cellule dans la ligne
            ligne.append(cellule);


        }
        Grille.append(ligne);
    }
}

function calculIndesirable() {

    // boucle pour les lignes
    for (var i = 0; i < nb_ligne; i++) {
        // boucle pour les colonnes
        for (var j = 0; j < nb_colonne; j++) {
            // compteur d'indésirables
            // on ne regarde que les cases qui n'ont pas la classe indésirable
            // le contraire est la négation et s'écrit !
            // ! veut dire non ou son contraire
            if (!$(".i" + i + ".j" + j).hasClass("indesirable")) {
                var nbrIndesirable = 0;
                //calcul des autres autour
                // on doit faire le calcul des indesirable autour de (i,j)
                if ($('.i' + (i - 1) + '.j' + (j - 1)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }
                if ($('.i' + (i - 1) + '.j' + (j)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }
                if ($('.i' + (i - 1) + '.j' + (j + 1)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }
                if ($('.i' + (i) + '.j' + (j - 1)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }
                if ($('.i' + (i) + '.j' + (j + 1)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }
                if ($('.i' + (i + 1) + '.j' + (j - 1)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }
                if ($('.i' + (i + 1) + '.j' + (j)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }
                if ($('.i' + (i + 1) + '.j' + (j + 1)).hasClass('indesirable')) {
                    // on compte 1 indesirable
                    nbrIndesirable++;
                }



                // on met le résultat dans notre case
                $(".i" + i + ".j" + j).text(nbrIndesirable);


            }

        }
    }
}


// fonction qui permet de découvrir par récursivité toutes les cellules autour des "0"
function devoilerZeros(cell) {
    var col = parseInt(cell.attr('class').match(/\bj(\d+)\b/)[1]);
    var row = parseInt(cell.attr('class').match(/\bi(\d+)\b/)[1]);
    var selectors = [
        '.j' + (col - 1) + '.i' + (row - 1),
        '.j' + col + '.i' + (row - 1),
        '.j' + (col + 1) + '.i' + (row - 1),
        '.j' + (col - 1) + '.i' + row,
        '.j' + (col + 1) + '.i' + row,
        '.j' + (col - 1) + '.i' + (row + 1),
        '.j' + col + '.i' + (row + 1),
        '.j' + (col + 1) + '.i' + (row + 1)
    ];

    $.each(selectors, function(key) {
        var current_cell = $(selectors[key]);
        if (current_cell.text() == "0" && current_cell.hasClass('paint')) {
            current_cell.removeClass('paint');
            devoilerZeros(current_cell);
        } else {
            current_cell.removeClass('paint');
        }
    });
}