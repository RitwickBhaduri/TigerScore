function calculatePlayerStats(scores, startingScore) {
    const totalThrows = scores.length;
    const pointsScored = scores.reduce((sum, score) => sum + score, 0);
    
    return {
        average: totalThrows > 0 ? pointsScored / totalThrows : 0,
        lastScore: scores[scores.length - 1] || null
    };
}

function calculateGameStats(gameHistory, currentLeg, startingScore, playerIndex) {
    // Get all throws for this specific player from history
    const historyScores = gameHistory.reduce((scores, state) => {
        const playerScores = state.currentLegScores[playerIndex] || [];
        return [...scores, ...playerScores];
    }, []);
    
    // Combine with current leg scores
    const allThrows = [...historyScores, ...currentLeg];
    const totalThrows = allThrows.length;
    const totalPoints = allThrows.reduce((sum, score) => sum + score, 0);
    
    return {
        gameAverage: totalThrows > 0 ? totalPoints / totalThrows : 0,
        legAverage: calculatePlayerStats(currentLeg, startingScore).average
    };
}

function calculateWins(gameHistory, playerIndex) {
    return {
        legsWon: gameHistory.filter(leg => leg.winner === playerIndex).length,
        setsWon: Math.floor(gameHistory.filter(leg => leg.winner === playerIndex).length / 3)
    };
}
