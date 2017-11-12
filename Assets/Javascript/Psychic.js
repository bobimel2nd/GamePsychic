var Letter = 0;
var Guesses = 9;
var Wins = 0;
var Losses = 0;

function Initialize() {
	document.getElementById("Page").style.opacity = 1.0;
	document.getElementById("Guesses").innerHTML = Guesses.toString(); 
	document.getElementById("Wins").innerHTML = Wins.toString();
	document.getElementById("Losses").innerHTML = Losses.toString(); 
	Announce("I've picked my Letter<br>Do you want to Play Psychic?");
}

function PickLetter() {
	Letter = Math.floor(Math.random() * 26);
}

function CheckLetter() {
	var Choice = event.keyCode;
	if (Choice >= 97) Choice -= 32;
	if (document.getElementById("Guessed").innerHTML.indexOf(String.fromCharCode(Choice)) >= 0) {
		return;
	};
	document.getElementById("Guessed").innerHTML += String.fromCharCode(Choice);
	Choice -= 65;
	if (Choice === Letter) {
		Announce("You Guessed my Letter <q>" + String.fromCharCode(65 + Letter) + "</q><br>Want to play again?");
		Winner();
		document.getElementById("Guessed").innerHTML = "";
		document.getElementById("Guesses").innerHTML = Guesses;
		Guesses = 9;
	} else {
		Guesses--;
		document.getElementById("Guesses").innerHTML = Guesses;
	}
	if (Guesses === 0)  {
		Loser();
		Announce("Your out of Guesses - The Letter was <q>" + String.fromCharCode(65 + Letter) + "</q><br>Want to play again?");
		document.getElementById("Guessed").innerHTML = "";
		document.getElementById("Guesses").innerHTML = Guesses;
		Guesses = 9;
	}
}

function Announce(Text) {
	document.getElementById("Page").onkeypress = null;
    document.getElementById("Text").innerHTML=Text;
    document.getElementById("Announce").style.display = "block";
	PickLetter();
}

function Winner() {
	Wins++;	
	document.getElementById("Wins").innerHTML = Wins; 
}

function Loser() {
	Losses++;
	document.getElementById("Losses").innerHTML = Losses; 
}

function YesAnswer() {
	document.getElementById("Page").onkeypress = function() {CheckLetter()};
    document.getElementById("Announce").style.display = "none";
	document.getElementById("Guesses").innerHTML = Guesses;
}

function NoAnswer() {
    var element = document.getElementById("Page");

    element.style.opacity -= 0.1;
    if(element.style.opacity < 0.0) {
        element.style.opacity = 0.0;
    } else {
        setTimeout("NoAnswer()", 100);
    }
}
