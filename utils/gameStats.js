function calculatePlayerStats(scores, startingScore) {
    const totalThrows = scores.length;
    const pointsScored = scores.reduce((sum, score) => sum + score, 0);
    
    return {
        average: totalThrows > 0 ? pointsScored / totalThrows : 0,
        lastScore: scores[scores.length - 1] || null
    };
}

function calculateGameStats(gameHistory, currentLeg, startingScore, playerIndex) {
    // Get all completed legs from history for this player
    const completedLegsScores = gameHistory.reduce((scores, state) => {
        if (state.currentLegScores && state.currentLegScores[playerIndex]) {
            return [...scores, ...state.currentLegScores[playerIndex]];
        }
        return scores;
    }, []);

    // Current leg scores
    const currentLegScores = currentLeg || [];

    // Calculate leg average using only current leg
    const legStats = calculatePlayerStats(currentLegScores, startingScore);

    return {
        legAverage: legStats.average
    };
}

function calculateWins(gameHistory, playerIndex) {
    return {
        legsWon: gameHistory.filter(leg => leg.winner === playerIndex).length,
        setsWon: Math.floor(gameHistory.filter(leg => leg.winner === playerIndex).length / 3)
    };
}
