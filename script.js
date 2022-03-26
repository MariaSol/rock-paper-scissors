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
//Round of the game that determines if player win, lose or if it's a draw.
function playRound(playerSelection) {
    getRandomInt();
    let computerSelection = computerPlay();
    //Display images of the element (ex:rock) computer/player selected in the round
    let playerMove = document.querySelector(".player-selection").firstChild;
    let computerMove = document.querySelector(".computer-selection").firstChild;
    playerMove.alt = playerSelection;
    playerMove.src = `imgs/${playerSelection}.png`;
    computerMove.alt = computerSelection.name;
    computerMove.src = `imgs/${computerSelection.name}.png`
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
function game(round){
    //keep track of how many rounds player/computer won and display score in ui
    let userPoints = document.getElementById("user-points");
    let compuPoints = document.getElementById("compu-points");
    let finalResult = document.querySelector(".final-result");
    //Restart points after 5 rounds
    if (finalResult.textContent.includes("5")) {
        compuPoints.textContent = 0;
        userPoints.textContent = 0;
    }
    if (round.includes("win") == true){
        userPoints.textContent = parseInt(userPoints.textContent) + 1;
    } else if (round.includes("lose") == true) {
        compuPoints.textContent = parseInt(compuPoints.textContent) + 1;
    }
    //Announce winner when computer/user reach 5 points
    if(userPoints.textContent == 5) {
        finalResult.textContent = `You win!👑 You defeated the computer 5 times.`;
        return true;
    } else if (compuPoints.textContent == 5){
        finalResult.textContent = `Boo!🍅 You lost! The computer defeated you 5 times.`;
        return true;
    } else {
        finalResult.textContent = "";
        return false;
    }
}
//Adds an event listener to each selection button (rock, paper & scissors)
document.querySelectorAll(".selection").forEach(item => {
    item.addEventListener('click', e => {
        //Store alt value whether user clicks in the button or in the img
        let playerSelection = (e.target.alt || e.target.firstChild.alt);
        let round = playRound(playerSelection);
        document.querySelector(".result").textContent = round;
        game(round)
    });
});