let playerScore = 0;
let computerScore = 0;

// Function called when player makes a choice
function playerChoice(playerSelection) {
    const computerSelection = computerChoice();
    const result = determineWinner(playerSelection, computerSelection);
    updateScoreboard();
    document.getElementById('result').innerText = result;
    playSound(result); // Play sound based on the game result
}

// Function to update the scoreboard
function updateScoreboard() {
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
}

// Function to randomly generate computer's choice
function computerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    return choices[Math.floor(Math.random() * choices.length)];
}

// Function to determine the winner of the round
function determineWinner(playerSelection, computerSelection) {
    const winningConditions = {
        rock: ['scissors', 'lizard'],
        paper: ['rock', 'spock'],
        scissors: ['paper', 'lizard'],
        lizard: ['spock', 'paper'],
        spock: ['scissors', 'rock']
    };

    if (playerSelection === computerSelection) {
        return "It's a tie!";
    } else if (winningConditions[playerSelection].includes(computerSelection)) {
        playerScore++; // Increment player score
        return `You win! ${playerSelection} beats ${computerSelection}`;
    } else {
        computerScore++; // Increment computer score
        return `You lose! ${computerSelection} beats ${playerSelection}`;
    }
}

// Function to play sound based on the result
function playSound(result) {
    let sound;
    if (result.includes('win')) {
        sound = document.getElementById('winSound');
    } else if (result.includes('lose')) {
        sound = document.getElementById('loseSound');
    } else {
        sound = document.getElementById('tieSound');
    }
    sound.play();
}

// Function to reset the game scores and result display
function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreboard();
    document.getElementById('result').innerText = '';
}

// Function to show rules popup
function showRules() {
    const popup = document.getElementById('rulesPopup');
    popup.style.display = 'block';

    // Play rules narration audio
    const rulesNarration = document.getElementById('rulesNarration');
    rulesNarration.play();
}

// Function to hide rules popup
function hideRules() {
    const popup = document.getElementById('rulesPopup');
    popup.style.display = 'none';

    // Pause rules narration audio
    const rulesNarration = document.getElementById('rulesNarration');
    rulesNarration.pause();
    rulesNarration.currentTime = 0;
}
