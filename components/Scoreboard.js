function Scoreboard({ players, scores, currentPlayer, onScoreSubmit, gameState, onUndo, onRedo }) {
    try {
        const [currentScore, setCurrentScore] = React.useState('');
        const [showHistory, setShowHistory] = React.useState(null);
        
        const handleScoreSubmit = (score) => {
            const numScore = parseInt(score, 10);
            if (!isNaN(numScore) && numScore >= 0 && numScore <= 180) {
                onScoreSubmit(numScore);
                setCurrentScore('');
            }
        };

        const playerStats = players.map((_, index) => {
            const stats = calculateGameStats(
                gameState.history,
                gameState.currentLegScores[index],
                gameState.settings.startingScore,
                index
            );
            
            return {
                ...stats,
                sets: gameState.settings.sets,
                legsWon: gameState.legsWon[index],
                setsWon: gameState.setsWon[index],
                lastScore: gameState.currentLegScores[index][gameState.currentLegScores[index].length - 1]
            };
        });

        return (
            <div className="max-w-2xl mx-auto mt-8 px-4" data-name="scoreboard">
                <GameControls
                    onUndo={onUndo}
                    onRedo={onRedo}
                    canUndo={gameState.history.length > 0}
                    canRedo={gameState.future.length > 0}
                />
                
                <div className="grid grid-cols-2 gap-4" data-name="player-scores">
                    {players.map((player, index) => (
                        <PlayerScore
                            key={index}
                            name={player}
                            score={scores[index]}
                            isActive={currentPlayer === index}
                            stats={playerStats[index]}
                            lastScore={playerStats[index].lastScore}
                            onHistoryClick={() => setShowHistory(index)}
                        />
                    ))}
                </div>
                
                <NumberPad
                    value={currentScore}
                    onChange={setCurrentScore}
                    onSubmit={handleScoreSubmit}
                />

                {showHistory !== null && (
                    <ScoreHistory
                        isOpen={true}
                        onClose={() => setShowHistory(null)}
                        scores={gameState.currentLegScores[showHistory]}
                        playerName={players[showHistory]}
                    />
                )}
            </div>
        );
    } catch (error) {
        console.error('Scoreboard component error:', error);
        reportError(error);
        return null;
    }
}
