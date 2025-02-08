const prompt = require('prompt-sync')();

// Function to get user selection
function getUserSelection() {
    let choice = prompt("Choose ROCK, PAPER, or SCISSORS: ").trim().toUpperCase();
    if (choice !== "ROCK" && choice !== "PAPER" && choice !== "SCISSORS") {
        console.log("Invalid choice. Please enter ROCK, PAPER, or SCISSORS.");
        return getUserSelection(); // Recursively ask until a valid input is given
    }
    return choice;
}
// Function to get computer selection
function getComputerSelection() {
    let randomValue = Math.random();
    if (randomValue < 0.34) {
        return "PAPER";
    } else if (randomValue < 0.67) {
        return "SCISSORS";
    } else {
        return "ROCK";
    }
}
// Function to determine winner
function determineWinner(userSelection, computerSelection) {
    if (userSelection === computerSelection) {
        return "It's a tie!";
    }
    if (
        (userSelection === "ROCK" && computerSelection === "SCISSORS") ||
        (userSelection === "PAPER" && computerSelection === "ROCK") ||
        (userSelection === "SCISSORS" && computerSelection === "PAPER")
    ) {
        return "User Wins!";
    }
    return "Computer Wins!";
}
// Main function to run the game
function playGame() {
    console.log("\nWelcome to Rock-Paper-Scissors Game!");
    let userSelection = getUserSelection();
    let computerSelection = getComputerSelection();

    console.log("User chose:", userSelection);
    console.log("Computer chose:", computerSelection);

    console.log(determineWinner(userSelection, computerSelection));
}

playGame();
