//Objects that represent each element and which beats which in the game.
const rock = {
    name: "rock",
    beats : "scissors",
    vulnerable : "paper"
};
const paper = {
    name: "paper",
    beats : "rock",
    vulnerable : "scissors"
};
const scissors = {
    name: "scissors",
    beats : "paper",
    vulnerable : "rock"
};
// Returns a random full number between min (included) and max (excluded)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
//The computer will play selecting a random object of the array
function computerPlay(){
    let options = [rock, paper, scissors];
    return options[getRandomInt(0, 3)];
};
//Prompts the user for a valid input
function userSelection() {
    let userInput = null;
    //Repeats until user types rock paper or scissors
    do  {
        userInput = prompt("Rock, paper or scissors?");
        if (userInput == null) {
            alert("You must write rock, paper or scissors. Play or exit.");
        }
        else if (userInput.match(/^(rock|paper|scissors)$/)) {
            userInput = userInput.toLowerCase();
        }
        else {
            alert("You must type rock paper or scissors!");
            userInput = null;
        }
    }while (userInput == null);
    return userInput;
}
let playerSelection;
let computerSelection;
//Round of the game that determinates if player won, lost or if it's a draw.
function playRound(playerSelection, computerSelection) {
    getRandomInt();
    //Initialized here to prevent functions from executing outside game rounds
    playerSelection = userSelection();
    computerSelection = computerPlay();
    if (computerSelection.beats == playerSelection) {
        return `You lose! ${computerSelection.name} beats ${playerSelection}`;
    }
    else if (computerSelection.vulnerable == playerSelection) {
        return `You win! ${playerSelection} beats ${computerSelection.name}`;
    }
    else {
        return `It's a draw! Both players chose ${playerSelection}`;
    }
}
//Game with 5 rounds of rock paper and scissors
function game(){
    //keep track of how many times player won and coincided with the computer
    let userPoints = 0;
    let draw = 0;
    for(let i = 0; i < 5; i++){
        let round = playRound(playerSelection, computerSelection);
        console.log(round);
        if (round.includes("win") == true){
            userPoints = userPoints + 1;
        } else if (round.includes("draw") == true) {
            draw = draw + 1;
        }
        //After the last round return winner, loser or draw message
        if (i == 4) {
            if(userPoints >= 3 || (draw == 4 && userPoints == 1)
                    || (draw == 3 && userPoints == 2)) {
                return `You win! You defeated the computer ${userPoints} times.`;
            } else if (draw >= 3 || (userPoints == 2 && draw == 1)) {
                return `It's a draw... You coincided with the computer ${draw} times`;
            } else {
                return `Boo! You lost! The computer defeated you ${5 - userPoints - draw} times.`
            }
        }
        
    }  
}
console.log(game())
