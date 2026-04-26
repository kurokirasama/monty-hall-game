// script.js - Monty Hall Game Logic

// 1. Initialize Variables
const doors = document.querySelectorAll('.door');
const newGameBtn = document.getElementById('new-game-btn');
const revealLosingBtn = document.getElementById('reveal-losing-btn');
const revealOutcomeBtn = document.getElementById('reveal-outcome-btn');
const statusMessage = document.getElementById('status-message');

// Statistics elements
const totalPlaysSpan = document.getElementById('total-plays');
const switchedWinsSpan = document.getElementById('switched-wins');
const switchedLossesSpan = document.getElementById('switched-losses');
const switchedWinPercentSpan = document.getElementById('switched-win-percent');
const stayedWinsSpan = document.getElementById('stayed-wins');
const stayedLossesSpan = document.getElementById('stayed-losses');
const stayedWinPercentSpan = document.getElementById('stayed-win-percent');
const overallWinPercentSpan = document.getElementById('overall-win-percent'); // New

let winSound;
let loseSound;

let game = {
    carDoor: null,
    playerInitialChoice: null,
    originalPlayerChoice: null, // New: Stores the very first door chosen by the player
    montyOpenedDoor: null,
    isPlayerChoiceMade: false,
    isLosingDoorRevealed: false,
    isGameEnded: false,
    hasPlayerSwitched: false
};

let stats = {
    totalPlays: 0,
    switchedWins: 0,
    switchedLosses: 0,
    stayedWins: 0,
    stayedLosses: 0,
    history: [] // Stores objects: { result: 'win'|'loss', strategy: 'switched'|'stayed' }
};

function initializeGame() {
    // Reset statistics to zero only on initial load/refresh
    stats = {
        totalPlays: 0,
        switchedWins: 0,
        switchedLosses: 0,
        stayedWins: 0,
        stayedLosses: 0,
        history: []
    };
    updateStatisticsDisplay(); // Update display with zeroed stats
    resetGameRound(); // Call a new function to reset game round state
}

// Function to reset game round state, but not statistics
function resetGameRound() {
    game.carDoor = null;
    game.playerInitialChoice = null;
    game.originalPlayerChoice = null; // Reset original choice
    game.montyOpenedDoor = null;
    game.isPlayerChoiceMade = false;
    game.isLosingDoorRevealed = false;
    game.isGameEnded = false;
    game.hasPlayerSwitched = false;

    doors.forEach(door => {
        door.classList.remove('selected', 'open');
        door.querySelector('.prize-image').classList.add('hidden');
        door.querySelector('.prize-image').src = 'images/goat.png'; // Reset all to goat
        door.style.pointerEvents = 'auto'; // Re-enable clicks
    });

    // Randomly assign car
    const carDoorIndex = Math.floor(Math.random() * 3);
    game.carDoor = doors[carDoorIndex].id;
    // For debugging, you can uncomment to see which door has the car
    // console.log('Car behind: ', game.carDoor);

    statusMessage.textContent = 'Selecciona una puerta.';
    revealLosingBtn.disabled = true;
    revealOutcomeBtn.disabled = true;
    newGameBtn.textContent = 'Nuevo Juego'; // Reset button text if it changed
}


function updateStatisticsDisplay() {
    totalPlaysSpan.textContent = stats.totalPlays;

    switchedWinsSpan.textContent = stats.switchedWins;
    switchedLossesSpan.textContent = stats.switchedLosses;
    const totalSwitched = stats.switchedWins + stats.switchedLosses;
    switchedWinPercentSpan.textContent = totalSwitched > 0 ? ((stats.switchedWins / totalSwitched) * 100).toFixed(2) + '%' : '0%';

    stayedWinsSpan.textContent = stats.stayedWins;
    stayedLossesSpan.textContent = stats.stayedLosses;
    const totalStayed = stats.stayedWins + stats.stayedLosses;
    stayedWinPercentSpan.textContent = totalStayed > 0 ? ((stats.stayedWins / totalStayed) * 100).toFixed(2) + '%' : '0%';

    // Calculate and update Overall Win %
    const totalWins = stats.switchedWins + stats.stayedWins;
    const overallWinPercent = stats.totalPlays > 0 ? ((totalWins / stats.totalPlays) * 100).toFixed(2) + '%' : '0%';
    overallWinPercentSpan.textContent = overallWinPercent;
}



function handleDoorSelection(selectedDoorElement) {
    // console.log('handleDoorSelection called.');
    if (game.isGameEnded) return; // No interaction after game ends

    if (!game.isPlayerChoiceMade) {
        // First choice
        game.originalPlayerChoice = selectedDoorElement.id;
        game.playerInitialChoice = selectedDoorElement.id;
        selectedDoorElement.classList.add('selected');
        game.isPlayerChoiceMade = true;

        doors.forEach(door => {
            if (door.id !== selectedDoorElement.id) {
                door.style.pointerEvents = 'none'; // Temporarily disable other doors
            }
        });
        statusMessage.textContent = 'Puerta ' + selectedDoorElement.querySelector('.door-label').textContent + ' seleccionada. Ahora, Revela una Puerta Perdedora.';
        revealLosingBtn.disabled = false;
    } else if (game.isLosingDoorRevealed && !game.isGameEnded) {
        // Second choice (switch or stay)
        const currentlySelectedDoor = document.querySelector('.door.selected');
        if (currentlySelectedDoor) {
            currentlySelectedDoor.classList.remove('selected');
        }
        selectedDoorElement.classList.add('selected');
        game.playerInitialChoice = selectedDoorElement.id; // Update current choice

        // Determine if player has switched
        game.hasPlayerSwitched = (game.playerInitialChoice !== game.originalPlayerChoice);

        statusMessage.textContent = '¡Decisión tomada! Revela el resultado.';
        revealOutcomeBtn.disabled = false; // Enable outcome button
        // The doors will be disabled when the game ends in revealOutcome()

    }
}

function revealLosingDoor() {
    // console.log('revealLosingDoor called.');
    let goatDoors = [];
    doors.forEach(door => {
        if (door.id !== game.carDoor && door.id !== game.playerInitialChoice) {
            goatDoors.push(door);
        }
    });

    // If player picked the car, Monty can open any of the other two goat doors
    if (goatDoors.length === 2) {
        const montyChoiceIndex = Math.floor(Math.random() * 2);
        game.montyOpenedDoor = goatDoors[montyChoiceIndex].id;
    } else if (goatDoors.length === 1) {
        // Player did not pick the car, Monty opens the only other goat door
        game.montyOpenedDoor = goatDoors[0].id;
    } else {
        // This case should ideally not happen in a correct Monty Hall scenario
        // unless player chose car and there are no other goat doors (impossible with 3 doors)
        console.error("Error: No se pudo encontrar una puerta para que Monty abriera.");
        return;
    }

    const montyDoorElement = document.getElementById(game.montyOpenedDoor);
    montyDoorElement.classList.add('open');
    montyDoorElement.querySelector('.prize-image').classList.remove('hidden');

    game.isLosingDoorRevealed = true;
    revealLosingBtn.disabled = true;
    revealOutcomeBtn.disabled = false;

    // Re-enable clicks on the remaining unselected, unopened door for switching
    // Also prepare the text for status message
    let otherClosedDoorElement = null;
    doors.forEach(d => {
        if (d.id !== game.playerInitialChoice && d.id !== game.montyOpenedDoor) {
            d.style.pointerEvents = 'auto';
            otherClosedDoorElement = d; // Capture the other closed door
        } else if (d.id === game.playerInitialChoice) {
            // Keep the initial choice clickable in case they want to 'stay' by re-clicking it
            d.style.pointerEvents = 'auto';
        } else {
            // The door Monty opened should remain unclickable, and any other disabled doors stay disabled
            d.style.pointerEvents = 'none';
        }
    });

    // Now update the status message with the correct door label
    if (otherClosedDoorElement) {
        statusMessage.textContent = 'Monty abrió la Puerta ' + montyDoorElement.querySelector('.door-label').textContent + '. ¿Quieres cambiar a la Puerta ' + otherClosedDoorElement.querySelector('.door-label').textContent + ' o Mantener?';
    } else {
        // Fallback or error handling if otherClosedDoorElement is not found (shouldn't happen in a 3-door game)
        statusMessage.textContent = 'Monty abrió la Puerta ' + montyDoorElement.querySelector('.door-label').textContent + '. ¿Quieres cambiar o Mantener?';
    }
}

function revealOutcome() {
    // console.log('revealOutcome called.');
    if (!game.isGameEnded) {
        game.isGameEnded = true;
        revealOutcomeBtn.disabled = true;
        revealLosingBtn.disabled = true; // Ensure this is disabled

        // Determine the player's final choice
        const finalChoiceElement = document.querySelector('.door.selected');
        const finalChoice = finalChoiceElement ? finalChoiceElement.id : game.playerInitialChoice; // Fallback if no selected class, implies stay
        // game.hasPlayerSwitched is already set in handleDoorSelection

        // Open all remaining closed doors
        doors.forEach(door => {
            door.classList.add('open');
            const prizeImage = door.querySelector('.prize-image');
            if (door.id === game.carDoor) {
                prizeImage.src = 'images/car.png';
            } else {
                prizeImage.src = 'images/goat.png';
            }
            prizeImage.classList.remove('hidden');
            door.style.pointerEvents = 'none'; // Disable further interaction
        });

        // Update stats
        // console.log('Updating stats...');
        stats.totalPlays++;
        let outcome = {
            strategy: game.hasPlayerSwitched ? 'switched' : 'stayed',
            result: null
        };

        if (game.hasPlayerSwitched) {
            if (finalChoice === game.carDoor) {
                stats.switchedWins++;
                outcome.result = 'win';
                statusMessage.textContent = '¡Cambiaste y GANASTE! ¡Felicidades!';
                winSound.play(); // Play win sound
            } else {
                stats.switchedLosses++;
                outcome.result = 'loss';
                statusMessage.textContent = 'Cambiaste y PERDISTE. ¡Mejor suerte la próxima vez!';
                loseSound.play(); // Play lose sound
            }
        } else { // Player stayed
            if (finalChoice === game.carDoor) {
                stats.stayedWins++;
                outcome.result = 'win';
                statusMessage.textContent = '¡Mantuviste tu elección y GANASTE! ¡Felicidades!';
                winSound.play(); // Play win sound
            } else {
                stats.stayedLosses++;
                outcome.result = 'loss';
                statusMessage.textContent = 'Mantuviste tu elección y PERDISTE. ¡Mejor suerte la próxima vez!';
                loseSound.play(); // Play lose sound
            }
        }
        stats.history.push(outcome);
        // saveStats(); // Removed call to saveStats()
        updateStatisticsDisplay();
        newGameBtn.textContent = 'Jugar de Nuevo'; // Change button text for convenience
    }
}


// 3. Event Listeners
doors.forEach(door => {
    door.addEventListener('click', () => handleDoorSelection(door));
});

newGameBtn.addEventListener('click', resetGameRound);
revealLosingBtn.addEventListener('click', revealLosingDoor);
revealOutcomeBtn.addEventListener('click', revealOutcome);

document.addEventListener('DOMContentLoaded', () => {
    winSound = document.getElementById('win-sound');
    loseSound = document.getElementById('lose-sound');
});

// Initial load
initializeGame();