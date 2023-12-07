let playerScore = 0;
let computerScore = 0;

function playerChoice(playerSelection) {
    const computerSelection = computerChoice();
    displayChoices(playerSelection, computerSelection);
    const result = determineWinner(playerSelection, computerSelection);
    updateScoreboard();
    document.getElementById('result').innerText = result;
    playSound(result);
}

function displayChoices(playerSelection, computerSelection) {
    document.getElementById('playerChoiceImage').style.backgroundImage = `url('assets/images/${playerSelection}.png')`;
    document.getElementById('computerChoiceImage').style.backgroundImage = `url('assets/images/${computerSelection}.png')`;
}

function updateScoreboard() {
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
}

function computerChoice() {
    const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    return choices[Math.floor(Math.random() * choices.length)];
}

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
        playerScore++;
        return `You win! ${playerSelection} beats ${computerSelection}`;
    } else {
        computerScore++;
        return `You lose! ${computerSelection} beats ${playerSelection}`;
    }
}

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

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScoreboard();
    document.getElementById('result').innerText = '';
    document.getElementById('playerChoiceImage').style.backgroundImage = '';
    document.getElementById('computerChoiceImage').style.backgroundImage = '';
}

function showRules() {
    const popup = document.getElementById('rulesPopup');
    popup.style.display = 'flex'; // Use flex to align with CSS for centering
    document.getElementById('rulesNarration').play();
}

function hideRules() {
    const popup = document.getElementById('rulesPopup');
    popup.style.display = 'none';
    const rulesNarration = document.getElementById('rulesNarration');
    rulesNarration.pause();
    rulesNarration.currentTime = 0;
}
