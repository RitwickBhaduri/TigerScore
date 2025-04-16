function calculateRemainingScore(currentScore, throwScore) {
    const remaining = currentScore - throwScore;
    
    // Check for burst (score below 0 or exactly 1)
    if (remaining < 0 || remaining === 1) {
        return {
            remaining: currentScore,
            isBurst: true
        };
    }
    
    return {
        remaining: remaining,
        isBurst: false
    };
}

function isWinningScore(score) {
    return score === 0;
}

function validateScore(score) {
    // Invalid dart scores that are impossible to achieve
    const invalidScores = [169, 173, 175, 176, 178, 179];
    
    // Check if score is within valid range and not in invalid scores list
    return score >= 0 && score <= 180 && !invalidScores.includes(score);
}

function formatScore(score) {
    return score.toString().padStart(3, '0');
}
