function PlayerScore({ 
    name, 
    score, 
    isActive, 
    stats, 
    lastScore, 
    onHistoryClick 
}) {
    try {
        return (
            <div 
                className={`player-score p-4 rounded-lg ${isActive ? 'active' : ''}`}
                data-name="player-score-card"
            >
                {isActive && (
                    <div className="text-center mb-2" data-name="turn-indicator">
                        <img 
                            src="https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/62b82d8d-219e-47d6-860d-ab8c5ba55d4a.svg"
                            alt="Turn Indicator"
                            className="h-6 w-6 mx-auto animate-bounce"
                        />
                    </div>
                )}
                
                <h3 className="text-lg font-semibold mb-2" data-name="player-name">{name}</h3>
                
                <div className="text-3xl font-bold text-primary mb-4" data-name="player-score">
                    {score}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4 text-sm" data-name="game-progress">
                    <div className="text-center p-2 bg-gray-700 rounded">
                        <div className="font-semibold">Sets</div>
                        <div>{stats.setsWon}</div>
                    </div>
                    <div className="text-center p-2 bg-gray-700 rounded">
                        <div className="font-semibold">Legs</div>
                        <div>{stats.legsWon}</div>
                    </div>
                </div>

                <div className="space-y-2 text-sm" data-name="player-stats">
                    <div className="flex justify-between p-2 bg-gray-700 rounded">
                        <span>Leg Avg:</span>
                        <span className="font-semibold">{stats.legAverage.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-gray-700 rounded">
                        <span>Game Avg:</span>
                        <span className="font-semibold">{stats.gameAverage.toFixed(1)}</span>
                    </div>
                </div>

                {lastScore && (
                    <button 
                        onClick={onHistoryClick}
                        className="w-full mt-3 p-2 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
                        data-name="last-score"
                    >
                        Last Score: {lastScore}
                        <i className="fas fa-history ml-2"></i>
                    </button>
                )}
            </div>
        );
    } catch (error) {
        console.error('PlayerScore component error:', error);
        reportError(error);
        return null;
    }
}
