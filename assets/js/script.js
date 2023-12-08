let playerScore = 0;
let computerScore = 0;
let drawScore = 0;
let isMuted = false; // Variable to track if the game is muted

function playerChoice(playerSelection) {
    const computerSelection = computerChoice();
    displayChoices(playerSelection, computerSelection);
    const result = determineWinner(playerSelection, computerSelection);
    updateScoreboard();
    document.getElementById('result').innerText = result;
    playSound(result);
    startBouncing();
}

function displayChoices(playerSelection, computerSelection) {
    const playerChoiceImage = document.getElementById('playerChoiceImage');
    const computerChoiceImage = document.getElementById('computerChoiceImage');

    playerChoiceImage.style.backgroundImage = `url('assets/images/${playerSelection}.png')`;
    computerChoiceImage.style.backgroundImage = `url('assets/images/${computerSelection}.png')`;
}

function updateScoreboard() {
    document.getElementById('playerScore').innerText = playerScore;
    document.getElementById('computerScore').innerText = computerScore;
    document.getElementById('drawScore').innerText = drawScore;
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
        drawScore++;
        return "It's a draw!";
    } else if (winningConditions[playerSelection].includes(computerSelection)) {
        playerScore++;
        return `You win! ${playerSelection} beats ${computerSelection}`;
    } else {
        computerScore++;
        return `You lose! ${computerSelection} beats ${playerSelection}`;
    }
}

function playSound(result) {
    if (isMuted) return; // Don't play sound if muted

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
    drawScore = 0;
    updateScoreboard();
    document.getElementById('result').innerText = '';
    document.getElementById('playerChoiceImage').style.backgroundImage = '';
    document.getElementById('computerChoiceImage').style.backgroundImage = '';
    resetAudio();
}

function startBouncing() {
    const playerChoiceImage = document.getElementById('playerChoiceImage');
    const computerChoiceImage = document.getElementById('computerChoiceImage');

    playerChoiceImage.style.animation = 'bounceRight 1s ease-in-out infinite';
    computerChoiceImage.style.animation = 'bounceLeft 1s ease-in-out infinite';

    // Stop the bouncing after 1 second for both images
    setTimeout(function () {
        stopBouncing(playerChoiceImage);
        stopBouncing(computerChoiceImage);
    }, 1000);
}

function stopBouncing(imageElement) {
    imageElement.style.animation = 'none';
}

function showRules() {
    const rulesPopup = document.getElementById('rulesPopup');
    rulesPopup.style.display = 'block';
}

function hideRules() {
    const rulesPopup = document.getElementById('rulesPopup');
    rulesPopup.style.display = 'none';
}

function toggleAudio() {
    const rulesNarration = document.getElementById('rulesNarration');
    if (rulesNarration.paused) {
        rulesNarration.play();
        document.getElementById('playPauseAudio').textContent = 'Pause Rules Narration';
    } else {
        rulesNarration.pause();
        document.getElementById('playPauseAudio').textContent = 'Play Rules Narration';
    }
}

function toggleMute() {
    isMuted = !isMuted;
    const muteButton = document.getElementById('muteButton');
    muteButton.textContent = isMuted ? 'Unmute Sounds' : 'Mute Sounds';

    // Mute or unmute all audio elements
    const audios = document.querySelectorAll('audio');
    audios.forEach(audio => {
        audio.muted = isMuted;
    });
}

function resetAudio() {
    const rulesNarration = document.getElementById('rulesNarration');
    if (!rulesNarration.paused) {
        rulesNarration.pause();
        rulesNarration.currentTime = 0; // Reset audio to start
        document.getElementById('playPauseAudio').textContent = 'Play Rules Narration';
    }
}
