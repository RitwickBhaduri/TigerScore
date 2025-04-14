function calculateRemainingScore(currentScore, throwScore) {
    const remaining = currentScore - throwScore;
    return remaining >= 0 ? remaining : currentScore;
}

function isWinningScore(score) {
    return score === 0;
}

function validateScore(score) {
    return score >= 0 && score <= 180;
}

function formatScore(score) {
    return score.toString().padStart(3, '0');
}
