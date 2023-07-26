
// Array contenente i colori dei bottoni possibili.
let buttonColours = ["red", "blue", "green", "yellow"];

// Dichiarazione di una variabile che conterrà il pattern del gioco.
let gamePattern = [];


// Dichiarazione di un array vuoto che conterrà i colori scelti dall'utente.
let userClickedPattern = [];

let level = 0;

$(document).keypress(function(){
  if (!started) {


$("#level-title").text("Level " + level);
nextSequence();
started = true;
  }
});

// Aggiungo un gestore di eventi al clic su tutti gli elementi con la classe ".btn".
$(".btn").click(function() {
  // Ottengo l'ID dell'elemento su cui è stato fatto clic e lo memorizza nella variabile "userChosenColour".
  let userChosenColour = $(this).attr("id");
  
  // Aggiungo il colore scelto dall'utente all'array "userClickedPattern".
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("sucess");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
    }, 1000);
  }
} else {
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}
}
// Funzione che genera il prossimo elemento del pattern di gioco.
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("level " + level);
  // Genera un numero casuale da 0 a 3.
  let randomNumber = Math.floor(Math.random() * 4);

  // Ottiene un colore casuale dal'array buttonColours utilizzando il numero casuale generato.
  let randomChosenColour = buttonColours[randomNumber];

  // Aggiunge il colore casuale al pattern di gioco.
  gamePattern.push(randomChosenColour);




// Effetto di fading-in e fading-out per il colore casuale selezionato.
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function playSound(name) {


// Creazione di un oggetto Audio per riprodurre il suono associato al colore casuale selezionato.
var audio = new Audio("sounds/" + name + ".mp3");

// Riproduzione del suono associato al colore casuale.
audio.play(); 
}

// function animatePress(currentColor){
//   $("#" + currentColor).addClass("pressed");
//   setTimeout(function () {
//     $("#" + currentColor).removeClass("pressed");
//   }, 100);
// }

function animatePress(currentColor) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColor).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  level = 0 
  gamePattern = [];
  started = false;
}
