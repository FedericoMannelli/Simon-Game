// Array contenente i colori dei bottoni possibili.
var buttonColours = ["red", "blue", "green", "yellow"];

// Variabile per contenere il pattern di gioco.
var gamePattern = [];

// Variabile per contenere i colori scelti dall'utente.
var userClickedPattern = [];

// Variabile per tenere traccia dello stato del gioco (iniziato o no).
var started = false;

// Variabile per tenere traccia del livello corrente del gioco.
var level = 0;

// Gestore dell'evento "click tap" per il bottone "Start".
$("#start-button").on("click tap", function() {
  if (!started) {
    startGame();
  }
});

// Funzione per avviare il gioco.
function startGame() {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}

// Gestore dell'evento "click tap" per i pulsanti colorati.
$(".btn").on("click tap", function() {
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  }
});

// Funzione per verificare la risposta dell'utente.
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Start to Play");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Funzione per generare il prossimo elemento del pattern di gioco.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// Funzione per riprodurre il suono associato al colore.
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Funzione per aggiungere l'effetto di pressione al pulsante.
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Funzione per riavviare il gioco.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
