import { checkout_routes } from '../utils/checkoutRoutes';

function PlayerScore({ 
    name, 
    score, 
    isActive, 
    stats, 
    lastScore, 
    onHistoryClick,
    currentTeamPlayer,
    isTeamMode
}) {
    try {
        // Get checkout advice for the current score
        const getCheckoutAdvice = (score) => {
            if (score <= 1 || score > 170) return null;
            const checkout = checkout_routes[score];
            if (!checkout || checkout === "No checkout possible") return null;
            return Array.isArray(checkout) ? checkout : null;
        };

        const checkoutAdvice = getCheckoutAdvice(score);

        return (
            <div 
                className={`player-score p-4 rounded-lg ${isActive ? 'active' : ''}`}
                data-name="player-score-card"
            >
                <div className="text-center mb-2" data-name="turn-indicator">
                    {isActive && (
                        <img 
                            src="https://app.trickle.so/storage/public/images/usr_0edcd6d6a0000001/62b82d8d-219e-47d6-860d-ab8c5ba55d4a.svg"
                            alt="Turn Indicator"
                            className="h-6 w-6 mx-auto animate-bounce"
                        />
                    )}
                </div>
                
                <h3 className="text-lg font-semibold mb-2" data-name="player-name">
                    {name}
                    {isTeamMode && currentTeamPlayer && (
                        <span className="block text-sm text-gray-400 mt-1">
                            Current: {currentTeamPlayer.replace(/Team \d+ Player /, 'Player ')}
                        </span>
                    )}
                </h3>
                
                <div className="text-4xl font-bold text-primary mb-2" data-name="player-score">
                    {score}
                </div>

                {checkoutAdvice && (
                    <div className="text-sm text-amber-400 mb-4 text-center" data-name="checkout-advice">
                        <div className="font-semibold mb-1">Checkout:</div>
                        <div>{checkoutAdvice.join(" → ")}</div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-2 mb-4 text-xs" data-name="game-progress">
                    <div className="text-center p-1 bg-gray-700 rounded">
                        <div className="font-semibold">Sets</div>
                        <div>{stats.setsWon}</div>
                    </div>
                    <div className="text-center p-1 bg-gray-700 rounded">
                        <div className="font-semibold">Legs</div>
                        <div>{stats.legsWon}</div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4" data-name="stats-and-history">
                    <div className="text-center p-2 bg-gray-700 rounded text-sm">
                        <div className="font-semibold">Leg Avg:</div>
                        <div>{typeof stats.legAverage === 'number' ? stats.legAverage.toFixed(1) : '0.0'}</div>
                    </div>
                    {lastScore !== undefined && lastScore !== null && (
                        <div className="text-center p-2 bg-gray-700 rounded text-sm">
                            <div className="font-semibold">Last:</div>
                            <div className="flex items-center justify-center">
                                {lastScore}
                                <i className="fas fa-history ml-1 cursor-pointer" onClick={onHistoryClick}></i>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('PlayerScore component error:', error);
        reportError(error);
        return null;
    }
}
