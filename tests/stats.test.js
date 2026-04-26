// Simple test for history tracking
const mockStats = {
    totalPlays: 0,
    switchedWins: 0,
    switchedLosses: 0,
    stayedWins: 0,
    stayedLosses: 0,
    history: []
};

function simulateOutcome(game, stats, finalChoice) {
    stats.totalPlays++;
    let outcome = {
        strategy: game.hasPlayerSwitched ? 'switched' : 'stayed',
        result: null
    };

    if (game.hasPlayerSwitched) {
        if (finalChoice === game.carDoor) {
            stats.switchedWins++;
            outcome.result = 'win';
        } else {
            stats.switchedLosses++;
            outcome.result = 'loss';
        }
    } else {
        if (finalChoice === game.carDoor) {
            stats.stayedWins++;
            outcome.result = 'win';
        } else {
            stats.stayedLosses++;
            outcome.result = 'loss';
        }
    }
    stats.history.push(outcome);
}

// Test cases
const game1 = { hasPlayerSwitched: true, carDoor: 'door-a' };
simulateOutcome(game1, mockStats, 'door-a');

const game2 = { hasPlayerSwitched: false, carDoor: 'door-b' };
simulateOutcome(game2, mockStats, 'door-c');

console.log('Mock Stats History:', JSON.stringify(mockStats.history));

if (mockStats.history.length === 2 && 
    mockStats.history[0].strategy === 'switched' && mockStats.history[0].result === 'win' &&
    mockStats.history[1].strategy === 'stayed' && mockStats.history[1].result === 'loss') {
    console.log('TEST PASSED: History recorded correctly.');
} else {
    console.error('TEST FAILED: History mismatch.');
    process.exit(1);
}
